import { chromium, Browser, Page } from 'playwright';
import { ArticleContent, ArticleMetadata } from '@/types';

export class WebScraper {
  private browser: Browser | null = null;

  async initialize(): Promise<void> {
    if (this.browser) return;

    try {
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      });
    } catch (error) {
      console.error('Failed to initialize browser:', error);
      throw new Error('Browser initialization failed');
    }
  }

  async scrapeWebpage(url: string): Promise<ArticleContent> {
    if (!this.browser) {
      await this.initialize();
    }

    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    let page: Page | null = null;

    try {
      page = await this.browser.newPage();

      // Set user agent and viewport
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      await page.setViewportSize({
        width: 1920,
        height: 1080
      });

      // Set timeout and navigate to page
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for content to load
      await page.waitForTimeout(2000);

      // Extract metadata from the page
      const metadata = await this.extractMetadata(page, url);

      // Extract HTML content
      const html = await page.content();

      // Extract images
      const images = await this.extractImages(page, url);

      // Extract links
      const links = await this.extractLinks(page, url);

      return {
        metadata,
        content: html,
        images,
        links
      };

    } catch (error) {
      console.error(`Failed to scrape webpage ${url}:`, error);
      throw new Error(`Failed to scrape webpage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  private async extractMetadata(page: Page, url: string): Promise<ArticleMetadata> {
    try {
      const metadata = await page.evaluate(() => {
        // Helper function to get meta content
        const getMetaContent = (name: string): string => {
          const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"], meta[property="og:${name}"]`);
          return meta?.getAttribute('content') || '';
        };

        // Helper function to get text content
        const getTextContent = (selector: string): string => {
          const element = document.querySelector(selector);
          return element?.textContent?.trim() || '';
        };

        // Extract title
        let title = getMetaContent('title') ||
                   document.title ||
                   getTextContent('h1') ||
                   getTextContent('[data-testid="headline"]') ||
                   'Untitled';

        // Extract author
        const author = getMetaContent('author') ||
                      getMetaContent('article:author') ||
                      getTextContent('[rel="author"]') ||
                      getTextContent('.author') ||
                      getTextContent('.byline') ||
                      undefined;

        // Extract publish date
        let publishDate: string | undefined;
        const dateSelectors = [
          'meta[property="article:published_time"]',
          'meta[name="date"]',
          'meta[name="publication_date"]',
          '[datetime]',
          '.publish-date',
          '.date',
          'time'
        ];

        for (const selector of dateSelectors) {
          const element = document.querySelector(selector);
          if (element) {
            const dateContent = element.getAttribute('content') ||
                               element.getAttribute('datetime') ||
                               element.textContent;
            if (dateContent) {
              publishDate = dateContent.trim();
              break;
            }
          }
        }

        // Extract description
        const description = getMetaContent('description') ||
                          getMetaContent('og:description') ||
                          getTextContent('meta[name="description"]') ||
                          '';

        // Extract site name
        const siteName = getMetaContent('site_name') ||
                        getMetaContent('og:site_name') ||
                        window.location.hostname;

        // Estimate word count (rough estimate)
        const textContent = document.body.textContent || '';
        const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;

        return {
          title,
          author,
          publishDate,
          description,
          siteName,
          originalUrl: window.location.href,
          wordCount,
          readingTime: Math.ceil(wordCount / 200) // Assuming 200 words per minute
        };
      });

      return metadata;
    } catch (error) {
      console.error('Failed to extract metadata:', error);
      // Return basic metadata as fallback
      return {
        title: new URL(url).hostname,
        originalUrl: url,
        wordCount: 0,
        readingTime: 0
      };
    }
  }

  private async extractImages(page: Page, baseUrl: string): Promise<any[]> {
    try {
      return await page.evaluate((base) => {
        const images = Array.from(document.querySelectorAll('img'));
        return images
          .map((img) => {
            const src = img.getAttribute('src');
            if (!src) return null;

            // Convert relative URLs to absolute
            let absoluteSrc = src;
            if (src.startsWith('//')) {
              absoluteSrc = `https:${src}`;
            } else if (src.startsWith('/')) {
              absoluteSrc = `${new URL(base).origin}${src}`;
            } else if (!src.startsWith('http')) {
              absoluteSrc = new URL(src, new URL(base).origin).href;
            }

            return {
              src: absoluteSrc,
              alt: img.getAttribute('alt') || undefined,
              width: img.naturalWidth || undefined,
              height: img.naturalHeight || undefined,
              caption: img.getAttribute('title') ||
                       img.closest('figure')?.querySelector('figcaption')?.textContent || undefined
            };
          })
          .filter(Boolean)
          .slice(0, 20); // Limit to 20 images
      }, baseUrl);
    } catch (error) {
      console.error('Failed to extract images:', error);
      return [];
    }
  }

  private async extractLinks(page: Page, baseUrl: string): Promise<any[]> {
    try {
      return await page.evaluate((base) => {
        const links = Array.from(document.querySelectorAll('a[href]'));
        return links
          .map((link) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) return null;

            // Convert relative URLs to absolute
            let absoluteHref = href;
            if (href.startsWith('/')) {
              absoluteHref = `${new URL(base).origin}${href}`;
            } else if (!href.startsWith('http')) {
              absoluteHref = new URL(href, new URL(base).origin).href;
            }

            return {
              href: absoluteHref,
              text: link.textContent?.trim() || '',
              title: link.getAttribute('title') || undefined
            };
          })
          .filter(Boolean)
          .slice(0, 50); // Limit to 50 links
      }, baseUrl);
    } catch (error) {
      console.error('Failed to extract links:', error);
      return [];
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// Singleton instance
export const webScraper = new WebScraper();

// Cleanup on process exit
process.on('SIGINT', async () => {
  await webScraper.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await webScraper.close();
  process.exit(0);
});