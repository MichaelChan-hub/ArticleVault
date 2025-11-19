import type { NextApiRequest, NextApiResponse } from 'next';
import { pdfGenerator } from '@/lib/pdf-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        error: 'PDF ID is required'
      });
    }

    console.log(`PDF download request for: ${id}`);

    // Get PDF file
    const pdfData = pdfGenerator.getPDFFile(id);

    if (!pdfData) {
      return res.status(404).json({
        error: 'PDF not found or has expired'
      });
    }

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfData.buffer.length);
    res.setHeader('Cache-Control', 'private, max-age=3600'); // Cache for 1 hour
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="article-vault-${id}.pdf"`
    );

    console.log(`Serving PDF: ${id} (${Math.round(pdfData.buffer.length / 1024)}KB)`);

    // Send the PDF buffer
    res.status(200).send(pdfData.buffer);

  } catch (error) {
    console.error('PDF download error:', error);

    let errorMessage = 'Failed to download PDF';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        errorMessage = 'PDF file not found';
        statusCode = 404;
      } else if (error.message.includes('EACCES')) {
        errorMessage = 'Permission denied accessing PDF file';
        statusCode = 403;
      } else {
        errorMessage = `PDF download failed: ${error.message}`;
      }
    }

    res.status(statusCode).json({
      error: errorMessage
    });
  }
}