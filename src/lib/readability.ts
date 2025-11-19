import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { ArticleContent, ArticleMetadata } from '@/types';

export class ContentExtractor {
  /**
   * Extract clean article content from HTML using Mozilla Readability
   */
  extractContent(html: string, url: string): ArticleContent {
    try {
      // Create a virtual DOM
      const dom = new JSDOM(html, { url });

      // Extract metadata first
      const metadata = this.extractMetadataFromDOM(dom, url);

      // Use Readability to extract the main content
      const reader = new Readability(dom.window.document, {
        debug: false,
        maxElemsToParse: 0, // Parse all elements
        nbTopCandidates: 5,
        charThreshold: 500, // Minimum characters to consider content
        classesToPreserve: ['caption', 'figure', 'img', 'figcaption'],
        keepClasses: true
      });

      const article = reader.parse();

      if (!article) {
        throw new Error('Failed to parse article content');
      }

      // Process images in the extracted content
      const images = this.processImagesInContent(article.content, url);

      // Process links in the extracted content
      const links = this.processLinksInContent(article.content, url);

      // Update word count based on extracted content
      const textContent = dom.window.document.createElement('div');
      textContent.innerHTML = article.content;
      const plainText = textContent.textContent || '';
      const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;

      // Update metadata with extracted information
      const finalMetadata: ArticleMetadata = {
        title: article.title || metadata.title,
        author: article.byline || metadata.author,
        publishDate: article.publishedTime || metadata.publishDate,
        description: article.excerpt || metadata.description,
        siteName: metadata.siteName,
        originalUrl: url,
        wordCount,
        readingTime: Math.ceil(wordCount / 200) // Assuming 200 words per minute
      };

      return {
        metadata: finalMetadata,
        content: article.content,
        images,
        links
      };

    } catch (error) {
      console.error('Failed to extract content:', error);
      throw new Error(`Content extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract metadata from DOM before Readability processing
   */
  private extractMetadataFromDOM(dom: JSDOM, url: string): ArticleMetadata {
    const document = dom.window.document;

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

    // Extract title with fallbacks
    let title = getMetaContent('title') ||
               getMetaContent('og:title') ||
               document.title ||
               getTextContent('h1') ||
               getTextContent('[data-testid="headline"]') ||
               'Untitled';

    // Clean up title
    title = title.replace(/\s*[-|]\s.*$/, '').trim(); // Remove site name suffixes

    // Extract author
    const author = getMetaContent('author') ||
                  getMetaContent('article:author') ||
                  getMetaContent('og:article:author') ||
                  getTextContent('[rel="author"]') ||
                  getTextContent('.author') ||
                  getTextContent('.byline') ||
                  getTextContent('.post-author') ||
                  undefined;

    // Extract publish date with multiple formats
    let publishDate: string | undefined;
    const dateSelectors = [
      'meta[property="article:published_time"]',
      'meta[property="article:published"]',
      'meta[name="date"]',
      'meta[name="publication_date"]',
      'meta[name="DC.date"]',
      'time[datetime]',
      '.publish-date',
      '.date',
      '.post-date',
      '.entry-date',
      'time'
    ];

    for (const selector of dateSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const dateContent = element.getAttribute('content') ||
                           element.getAttribute('datetime') ||
                           element.textContent;
        if (dateContent) {
          publishDate = this.normalizeDate(dateContent.trim());
          if (publishDate) break;
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
                    new URL(url).hostname;

    return {
      title,
      author,
      publishDate,
      description,
      siteName,
      originalUrl: url,
      wordCount: 0, // Will be calculated later
      readingTime: 0 // Will be calculated later
    };
  }

  /**
   * Process images in extracted content
   */
  private processImagesInContent(content: string, baseUrl: string): any[] {
    const dom = new JSDOM(content);
    const images = Array.from(dom.window.document.querySelectorAll('img'));

    return images
      .map((img) => {
        const src = img.getAttribute('src');
        if (!src) return null;

        // Convert relative URLs to absolute
        let absoluteSrc = src;
        try {
          if (src.startsWith('//')) {
            absoluteSrc = `https:${src}`;
          } else if (src.startsWith('/')) {
            absoluteSrc = `${new URL(baseUrl).origin}${src}`;
          } else if (!src.startsWith('http')) {
            absoluteSrc = new URL(src, new URL(baseUrl).origin).href;
          }
        } catch {
          // If URL parsing fails, use original src
          absoluteSrc = src;
        }

        return {
          src: absoluteSrc,
          alt: img.getAttribute('alt') || undefined,
          width: parseInt(img.getAttribute('width') || '0') || undefined,
          height: parseInt(img.getAttribute('height') || '0') || undefined,
          caption: img.getAttribute('title') ||
                   img.closest('figure')?.querySelector('figcaption')?.textContent || undefined
        };
      })
      .filter(Boolean)
      .slice(0, 20); // Limit to 20 images
  }

  /**
   * Process links in extracted content
   */
  private processLinksInContent(content: string, baseUrl: string): any[] {
    const dom = new JSDOM(content);
    const links = Array.from(dom.window.document.querySelectorAll('a[href]'));

    return links
      .map((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) {
          return null;
        }

        // Convert relative URLs to absolute
        let absoluteHref = href;
        try {
          if (href.startsWith('/')) {
            absoluteHref = `${new URL(baseUrl).origin}${href}`;
          } else if (!href.startsWith('http')) {
            absoluteHref = new URL(href, new URL(baseUrl).origin).href;
          }
        } catch {
          // If URL parsing fails, use original href
          absoluteHref = href;
        }

        return {
          href: absoluteHref,
          text: link.textContent?.trim() || '',
          title: link.getAttribute('title') || undefined
        };
      })
      .filter(Boolean)
      .slice(0, 50); // Limit to 50 links
  }

  /**
   * Normalize and validate date string
   */
  private normalizeDate(dateString: string): string | undefined {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return undefined;
      }
      return date.toISOString();
    } catch {
      return undefined;
    }
  }

  /**
   * Clean and sanitize HTML content
   */
  sanitizeHTML(html: string): string {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Remove potentially harmful elements
    const dangerousTags = ['script', 'style', 'iframe', 'object', 'embed'];
    dangerousTags.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(el => el.remove());
    });

    // Remove event handlers
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const attributes = element.attributes;
      for (let i = attributes.length - 1; i >= 0; i--) {
        const attribute = attributes[i];
        if (attribute.name.startsWith('on') || attribute.name === 'href' && attribute.value?.startsWith('javascript:')) {
          element.removeAttribute(attribute.name);
        }
      }
    });

    return document.body.innerHTML;
  }
}

// Singleton instance
export const contentExtractor = new ContentExtractor();