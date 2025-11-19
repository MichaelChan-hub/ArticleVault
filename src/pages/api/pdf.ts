import type { NextApiRequest, NextApiResponse } from 'next';
import { PDFResponse } from '@/types';
import { pdfGenerator } from '@/lib/pdf-generator';
import { PDFOptionsValidator } from '@/lib/validators';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PDFResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { content, metadata, styles } = req.body;

    // Validate required fields
    if (!content || !metadata) {
      return res.status(400).json({
        success: false,
        error: 'Content and metadata are required'
      });
    }

    // Construct complete article content object
    const articleContent = {
      metadata,
      content,
      images: metadata.images || [],
      links: metadata.links || []
    };

    // Validate and get PDF options
    const pdfOptions = PDFOptionsValidator.validateOptions(styles || {});

    console.log(`Starting PDF generation for: ${metadata.title}`);

    // Generate PDF
    const pdfResult = await pdfGenerator.generatePDF(articleContent, pdfOptions);

    const downloadUrl = `/api/pdf/download/${pdfResult.pdfId}`;
    const fileSizeKB = Math.round(pdfResult.fileSize / 1024);

    console.log(`PDF generated successfully: ${pdfResult.pdfId} (${fileSizeKB}KB)`);

    // Schedule cleanup of old PDFs (run in background)
    setTimeout(() => {
      pdfGenerator.cleanupOldPDFs().catch(console.error);
    }, 0);

    res.status(200).json({
      success: true,
      pdfUrl: downloadUrl,
      // Optional: Include additional info
      metadata: {
        fileSizeKB,
        pdfId: pdfResult.pdfId
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);

    let errorMessage = 'Failed to generate PDF';

    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        errorMessage = 'File system error - cannot create PDF file';
      } else if (error.message.includes('EACCES')) {
        errorMessage = 'Permission denied - cannot create PDF file';
      } else if (error.message.includes('EMFILE')) {
        errorMessage = 'Too many files open - please try again later';
      } else if (error.message.includes('ENOSPC')) {
        errorMessage = 'Insufficient disk space to generate PDF';
      } else if (error.message.includes('html-pdf-node')) {
        errorMessage = 'PDF generation service error - please try again';
      } else {
        errorMessage = `PDF generation failed: ${error.message}`;
      }
    }

    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}