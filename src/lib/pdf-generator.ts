import { ArticleContent, PDFGenerationOptions } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import htmlPdf from 'html-pdf-node';

export class PDFGenerator {
  private pdfStoragePath: string;

  constructor() {
    // Store PDFs in a temporary directory
    this.pdfStoragePath = path.join(process.cwd(), 'temp', 'pdfs');
    this.ensureStorageDirectory();
  }

  /**
   * Generate PDF from article content using html-pdf-node
   */
  async generatePDF(
    content: ArticleContent,
    options: PDFGenerationOptions
  ): Promise<{ pdfId: string; pdfBuffer: Buffer; fileSize: number }> {
    try {
      const pdfId = uuidv4();

      // Generate HTML template
      const htmlTemplate = this.generateHTMLTemplate(content, options);

      // PDF generation options
      const pdfOptions = {
        format: 'A4' as const,
        margin: {
          top: `${options.margins.top}mm`,
          right: `${options.margins.right}mm`,
          bottom: `${options.margins.bottom}mm`,
          left: `${options.margins.left}mm`
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: this.generateHeaderTemplate(content, options),
        footerTemplate: this.generateFooterTemplate(content, options),
        preferCSSPageSize: true
      };

      // Generate PDF buffer
      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        const file = { content: htmlTemplate };

        htmlPdf.create(file, pdfOptions)
          .toBuffer((err, buffer) => {
            if (err) {
              reject(err);
            } else {
              resolve(buffer!);
            }
          });
      });

      // Save PDF to temporary storage
      const filePath = path.join(this.pdfStoragePath, `${pdfId}.pdf`);
      fs.writeFileSync(filePath, pdfBuffer);

      console.log(`PDF generated successfully: ${pdfId}`);

      return {
        pdfId,
        pdfBuffer,
        fileSize: pdfBuffer.length
      };

    } catch (error) {
      console.error('Failed to generate PDF:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get PDF file by ID
   */
  getPDFFile(pdfId: string): { filePath: string; buffer: Buffer } | null {
    try {
      const filePath = path.join(this.pdfStoragePath, `${pdfId}.pdf`);

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const buffer = fs.readFileSync(filePath);
      return { filePath, buffer };
    } catch (error) {
      console.error('Failed to get PDF file:', error);
      return null;
    }
  }

  /**
   * Delete PDF file by ID
   */
  deletePDFFile(pdfId: string): boolean {
    try {
      const filePath = path.join(this.pdfStoragePath, `${pdfId}.pdf`);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`PDF deleted: ${pdfId}`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to delete PDF file:', error);
      return false;
    }
  }

  /**
   * Clean up old PDF files (older than 24 hours)
   */
  async cleanupOldPDFs(): Promise<void> {
    try {
      const files = fs.readdirSync(this.pdfStoragePath);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      for (const file of files) {
        const filePath = path.join(this.pdfStoragePath, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtime.getTime() > twentyFourHours) {
          fs.unlinkSync(filePath);
          console.log(`Cleaned up old PDF: ${file}`);
        }
      }
    } catch (error) {
      console.error('Failed to cleanup old PDFs:', error);
    }
  }

  /**
   * Ensure storage directory exists
   */
  private ensureStorageDirectory(): void {
    if (!fs.existsSync(this.pdfStoragePath)) {
      fs.mkdirSync(this.pdfStoragePath, { recursive: true });
    }
  }

  /**
   * Generate header template for PDF
   */
  private generateHeaderTemplate(
    content: ArticleContent,
    options: PDFGenerationOptions
  ): string {
    const { metadata } = content;
    const { fontSize } = options;

    return `
      <div style="font-size: ${fontSize * 0.8}pt; color: #666; text-align: center; width: 100%;">
        <div style="font-weight: bold; margin-bottom: 2mm;">${metadata.title}</div>
        ${metadata.siteName ? `<div>${metadata.siteName}</div>` : ''}
      </div>
    `;
  }

  /**
   * Generate footer template for PDF
   */
  private generateFooterTemplate(
    content: ArticleContent,
    options: PDFGenerationOptions
  ): string {
    const { metadata } = content;
    const { fontSize, includeSourceUrl } = options;

    return `
      <div style="font-size: ${fontSize * 0.7}pt; color: #666; text-align: center; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            ${includeSourceUrl ? `原文: ${new URL(metadata.originalUrl).hostname}` : ''}
          </div>
          <div>
            第 <span class="pageNumber"></span> 页，共 <span class="totalPages"></span> 页
          </div>
          <div>
            由 ArticleVault 生成
          </div>
        </div>
        ${metadata.author && options.includeAuthor ? `<div style="margin-top: 1mm;">作者: ${metadata.author}</div>` : ''}
        ${metadata.publishDate ? `<div>发布: ${new Date(metadata.publishDate).toLocaleDateString('zh-CN')}</div>` : ''}
      </div>
    `;
  }

  /**
   * Generate HTML template for PDF
   */
  private generateHTMLTemplate(
    content: ArticleContent,
    options: PDFGenerationOptions
  ): string {
    const { metadata } = content;
    const { fontSize, fontFamily, margins, includeSourceUrl, includeAuthor, watermark } = options;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${metadata.title}</title>
        <style>
          body {
            font-family: '${fontFamily}', serif;
            font-size: ${fontSize}pt;
            line-height: ${options.lineHeight};
            color: #333;
            margin: 0;
            padding: ${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm;
          }

          .article-header {
            border-bottom: 2px solid #ccc;
            padding-bottom: 15mm;
            margin-bottom: 25mm;
            text-align: center;
          }

          .article-title {
            font-size: ${fontSize * 1.8}pt;
            font-weight: bold;
            margin-bottom: 8mm;
            line-height: 1.2;
            color: #000;
          }

          .article-metadata {
            font-size: ${fontSize * 0.9}pt;
            color: #666;
            margin-bottom: 4mm;
            line-height: 1.4;
          }

          .article-content {
            text-align: justify;
            orphans: 3;
            widows: 3;
            line-height: ${options.lineHeight};
          }

          .article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6 {
            page-break-after: avoid;
            margin-top: 15mm;
            margin-bottom: 8mm;
            font-weight: bold;
            line-height: 1.3;
          }

          .article-content h1 { font-size: ${fontSize * 1.4}pt; }
          .article-content h2 { font-size: ${fontSize * 1.3}pt; }
          .article-content h3 { font-size: ${fontSize * 1.2}pt; }
          .article-content h4 { font-size: ${fontSize * 1.1}pt; }
          .article-content h5 { font-size: ${fontSize * 1.05}pt; }
          .article-content h6 { font-size: ${fontSize}pt; }

          .article-content p {
            margin-bottom: ${fontSize * 0.8}pt;
            text-indent: ${fontSize * 2}pt;
          }

          .article-content p:first-of-type {
            text-indent: 0;
          }

          .article-content blockquote {
            margin: ${fontSize * 1.5}pt 0;
            padding: ${fontSize * 0.8}pt ${fontSize * 1.5}pt;
            border-left: 4px solid #ccc;
            background-color: #f9f9f9;
            font-style: italic;
          }

          .article-content img {
            max-width: 100%;
            height: auto;
            page-break-inside: avoid;
            margin: ${fontSize * 1.5}pt 0;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .article-content figure {
            margin: ${fontSize * 1.5}pt 0;
            page-break-inside: avoid;
            text-align: center;
          }

          .article-content figcaption {
            font-size: ${fontSize * 0.8}pt;
            color: #666;
            margin-top: ${fontSize * 0.5}pt;
            font-style: italic;
          }

          .article-content table {
            page-break-inside: avoid;
            margin: ${fontSize * 1.5}pt 0;
            border-collapse: collapse;
            width: 100%;
          }

          .article-content th, .article-content td {
            border: 1px solid #ddd;
            padding: ${fontSize * 0.5}pt;
            text-align: left;
          }

          .article-content th {
            background-color: #f5f5f5;
            font-weight: bold;
          }

          .article-content ul, .article-content ol {
            margin: ${fontSize * 0.8}pt 0;
            padding-left: ${fontSize * 3}pt;
          }

          .article-content li {
            margin-bottom: ${fontSize * 0.4}pt;
          }

          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: ${fontSize * 2.5}pt;
            color: rgba(0, 0, 0, 0.08);
            z-index: -1;
            white-space: nowrap;
            pointer-events: none;
          }

          .article-footer {
            margin-top: 30mm;
            padding-top: 15mm;
            border-top: 1px solid #ccc;
            font-size: ${fontSize * 0.8}pt;
            color: #666;
            line-height: 1.4;
          }

          .source-link {
            word-break: break-all;
            color: #0066cc;
          }

          @media print {
            .watermark {
              position: absolute;
            }
          }
        </style>
      </head>
      <body>
        ${watermark ? `<div class="watermark">${watermark}</div>` : ''}

        <div class="article-header">
          <h1 class="article-title">${metadata.title}</h1>
          <div class="article-metadata">
            ${metadata.author && includeAuthor ? `<div><strong>作者:</strong> ${metadata.author}</div>` : ''}
            ${metadata.publishDate ? `<div><strong>发布日期:</strong> ${new Date(metadata.publishDate).toLocaleDateString('zh-CN')}</div>` : ''}
            ${metadata.siteName ? `<div><strong>来源:</strong> ${metadata.siteName}</div>` : ''}
            ${metadata.wordCount ? `<div><strong>字数:</strong> ${metadata.wordCount} 字</div>` : ''}
            ${metadata.readingTime ? `<div><strong>阅读时间:</strong> ${metadata.readingTime} 分钟</div>` : ''}
          </div>
        </div>

        <div class="article-content">
          ${content.content}
        </div>

        <div class="article-footer">
          ${includeSourceUrl ? `
            <div style="margin-bottom: 8pt;">
              <strong>原文链接:</strong>
              <a href="${metadata.originalUrl}" class="source-link">${metadata.originalUrl}</a>
            </div>
          ` : ''}
          <div>
            <strong>PDF生成时间:</strong> ${new Date().toLocaleString('zh-CN')}
          </div>
          <div style="margin-top: 8pt; font-size: ${fontSize * 0.7}pt; color: #999;">
            由 ArticleVault (https://articlevault.com) 生成
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate unique PDF ID
   */
  private generatePDFId(): string {
    return `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Simulate PDF generation time
   */
  private async simulateGeneration(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  }

  /**
   * Estimate PDF file size based on content
   */
  estimateFileSize(content: ArticleContent, options: PDFGenerationOptions): number {
    // Rough estimation: 1KB per 100 characters
    const contentLength = content.content.length + JSON.stringify(content.metadata).length;
    const baseSize = contentLength / 100;

    // Add overhead for images (rough estimation)
    const imageOverhead = content.images.length * 50; // 50KB per image estimate

    // Add overhead for styling
    const styleOverhead = options.fontSize * 10 + options.lineHeight * 5;

    return Math.round(baseSize + imageOverhead + styleOverhead);
  }

  /**
   * Validate PDF generation options
   */
  validateOptions(options: Partial<PDFGenerationOptions>): PDFGenerationOptions {
    const defaultOptions: PDFGenerationOptions = {
      fontSize: 12,
      fontFamily: 'Times New Roman',
      lineHeight: 1.6,
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      },
      includeSourceUrl: true,
      includeAuthor: true,
      watermark: undefined
    };

    return {
      fontSize: Math.max(8, Math.min(24, options.fontSize || defaultOptions.fontSize)),
      fontFamily: options.fontFamily || defaultOptions.fontFamily,
      lineHeight: Math.max(1.0, Math.min(3.0, options.lineHeight || defaultOptions.lineHeight)),
      margins: {
        top: Math.max(10, Math.min(50, options.margins?.top || defaultOptions.margins.top)),
        right: Math.max(10, Math.min(50, options.margins?.right || defaultOptions.margins.right)),
        bottom: Math.max(10, Math.min(50, options.margins?.bottom || defaultOptions.margins.bottom)),
        left: Math.max(10, Math.min(50, options.margins?.left || defaultOptions.margins.left))
      },
      includeSourceUrl: options.includeSourceUrl !== undefined ? options.includeSourceUrl : defaultOptions.includeSourceUrl,
      includeAuthor: options.includeAuthor !== undefined ? options.includeAuthor : defaultOptions.includeAuthor,
      watermark: options.watermark || defaultOptions.watermark
    };
  }

  /**
   * Get available fonts
   */
  getAvailableFonts(): string[] {
    return [
      'Times New Roman',
      'Arial',
      'Helvetica',
      'Georgia',
      'Verdana',
      'Courier New',
      'Inter',
      'Roboto'
    ];
  }

  /**
   * Get default font sizes
   */
  getDefaultFontSizes(): number[] {
    return [8, 10, 12, 14, 16, 18, 20, 24];
  }

  /**
   * Get default margin presets
   */
  getMarginPresets(): { name: string; margins: PDFGenerationOptions['margins'] }[] {
    return [
      {
        name: '窄边距',
        margins: { top: 15, right: 15, bottom: 15, left: 15 }
      },
      {
        name: '标准',
        margins: { top: 20, right: 20, bottom: 20, left: 20 }
      },
      {
        name: '宽边距',
        margins: { top: 25, right: 25, bottom: 25, left: 25 }
      },
      {
        name: '超宽边距',
        margins: { top: 30, right: 30, bottom: 30, left: 30 }
      }
    ];
  }
}

// Singleton instance
export const pdfGenerator = new PDFGenerator();