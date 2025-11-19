import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchResponse } from '@/types';
import { webScraper } from '@/lib/playwright';
import { contentExtractor } from '@/lib/readability';
import { URLUtils } from '@/lib/validators';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL provided'
      });
    }

    // Validate and normalize URL
    let normalizedUrl: string;
    try {
      normalizedUrl = URLUtils.normalize(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    // Set a timeout for the entire operation
    const timeout = setTimeout(() => {
      res.status(408).json({
        success: false,
        error: 'Request timeout - the webpage took too long to load'
      });
    }, 60000); // 60 seconds timeout

    try {
      console.log(`Starting to scrape URL: ${normalizedUrl}`);

      // Step 1: Scrape the webpage using Playwright
      const scrapedContent = await webScraper.scrapeWebpage(normalizedUrl);
      console.log('Webpage scraped successfully');

      // Step 2: Extract clean content using Readability
      const extractedContent = contentExtractor.extractContent(
        scrapedContent.content,
        normalizedUrl
      );
      console.log('Content extracted successfully');

      // Step 3: Merge scraped metadata with extracted content
      const finalContent = {
        metadata: {
          ...scrapedContent.metadata,
          ...extractedContent.metadata,
          // Prefer extracted title if available
          title: extractedContent.metadata.title || scrapedContent.metadata.title,
          // Prefer extracted description
          description: extractedContent.metadata.description || scrapedContent.metadata.description
        },
        content: extractedContent.content,
        images: extractedContent.images,
        links: extractedContent.links
      };

      clearTimeout(timeout);

      console.log(`Successfully processed article: ${finalContent.metadata.title}`);

      res.status(200).json({
        success: true,
        data: finalContent
      });

    } catch (scrapeError) {
      clearTimeout(timeout);

      console.error('Scraping/Extraction error:', scrapeError);

      // Provide more specific error messages
      let errorMessage = 'Failed to fetch content from the provided URL';

      if (scrapeError instanceof Error) {
        if (scrapeError.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
          errorMessage = 'Could not resolve the domain name. Please check the URL and try again.';
        } else if (scrapeError.message.includes('net::ERR_CONNECTION_REFUSED')) {
          errorMessage = 'Could not connect to the website. The server may be down or blocking our requests.';
        } else if (scrapeError.message.includes('timeout')) {
          errorMessage = 'The webpage took too long to load. Please try again with a different URL.';
        } else if (scrapeError.message.includes('403')) {
          errorMessage = 'Access to this website is forbidden. The site may be blocking automated requests.';
        } else if (scrapeError.message.includes('404')) {
          errorMessage = 'The requested page was not found (404 error).';
        } else if (scrapeError.message.includes('Failed to parse article content')) {
          errorMessage = 'Could not extract article content from this page. It may not contain readable article content.';
        } else {
          errorMessage = `Failed to process the webpage: ${scrapeError.message}`;
        }
      }

      res.status(400).json({
        success: false,
        error: errorMessage
      });

    }

  } catch (error) {
    console.error('Unexpected error in fetch API:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request'
    });
  }
}