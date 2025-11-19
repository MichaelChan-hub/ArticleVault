import type { NextApiRequest, NextApiResponse } from 'next';
import { URLValidationResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<URLValidationResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      valid: false,
      accessible: false
    });
  }

  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        valid: false,
        accessible: false
      });
    }

    // Basic URL validation
    let urlObj: URL;
    try {
      urlObj = new URL(url);
    } catch {
      return res.status(400).json({
        valid: false,
        accessible: false
      });
    }

    // Check protocol
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return res.status(400).json({
        valid: false,
        accessible: false
      });
    }

    // TODO: Implement actual URL accessibility check
    // This would involve using Playwright or another method to check if the URL is accessible
    // For now, we'll return a mock response

    const mockMetadata = {
      title: 'Sample Article Title',
      description: 'Sample article description',
      siteName: urlObj.hostname
    };

    res.status(200).json({
      valid: true,
      accessible: true,
      metadata: mockMetadata
    });

  } catch (error) {
    console.error('URL validation error:', error);
    res.status(500).json({
      valid: false,
      accessible: false
    });
  }
}