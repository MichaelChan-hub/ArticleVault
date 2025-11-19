import { ArticleMetadata, PDFGenerationOptions } from '@/types';

/**
 * URL validation utilities
 */
export const URLUtils = {
  isValid(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },

  normalize(url: string): string {
    try {
      const urlObj = new URL(url.trim());
      return urlObj.toString();
    } catch {
      throw new Error('Invalid URL format');
    }
  },

  getDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return '';
    }
  }
};

/**
 * Article metadata validation
 */
export const ArticleMetadataValidator = {
  validate(metadata: Partial<ArticleMetadata>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!metadata.title || typeof metadata.title !== 'string' || metadata.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }

    if (metadata.originalUrl && !URLUtils.isValid(metadata.originalUrl)) {
      errors.push('Original URL must be a valid URL');
    }

    if (metadata.publishDate) {
      const publishDate = new Date(metadata.publishDate);
      if (isNaN(publishDate.getTime())) {
        errors.push('Publish date must be a valid date');
      }
    }

    if (metadata.wordCount !== undefined && (typeof metadata.wordCount !== 'number' || metadata.wordCount < 0)) {
      errors.push('Word count must be a non-negative number');
    }

    if (metadata.readingTime !== undefined && (typeof metadata.readingTime !== 'number' || metadata.readingTime < 0)) {
      errors.push('Reading time must be a non-negative number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  sanitize(metadata: Partial<ArticleMetadata>): ArticleMetadata {
    return {
      title: metadata.title?.trim() || 'Untitled Article',
      author: metadata.author?.trim() || undefined,
      publishDate: metadata.publishDate || undefined,
      description: metadata.description?.trim() || undefined,
      siteName: metadata.siteName?.trim() || undefined,
      originalUrl: metadata.originalUrl || '',
      wordCount: metadata.wordCount || 0,
      readingTime: metadata.readingTime || 0
    };
  }
};

/**
 * PDF generation options validation
 */
export const PDFOptionsValidator = {
  validate(options: Partial<PDFGenerationOptions>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (options.fontSize !== undefined && (typeof options.fontSize !== 'number' || options.fontSize < 6 || options.fontSize > 72)) {
      errors.push('Font size must be between 6 and 72 points');
    }

    if (options.fontFamily && typeof options.fontFamily !== 'string') {
      errors.push('Font family must be a string');
    }

    if (options.lineHeight !== undefined && (typeof options.lineHeight !== 'number' || options.lineHeight < 1 || options.lineHeight > 3)) {
      errors.push('Line height must be between 1 and 3');
    }

    if (options.margins) {
      const { top, right, bottom, left } = options.margins;

      if (top !== undefined && (typeof top !== 'number' || top < 0)) {
        errors.push('Top margin must be a non-negative number');
      }
      if (right !== undefined && (typeof right !== 'number' || right < 0)) {
        errors.push('Right margin must be a non-negative number');
      }
      if (bottom !== undefined && (typeof bottom !== 'number' || bottom < 0)) {
        errors.push('Bottom margin must be a non-negative number');
      }
      if (left !== undefined && (typeof left !== 'number' || left < 0)) {
        errors.push('Left margin must be a non-negative number');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  getDefaultOptions(): PDFGenerationOptions {
    return {
      fontSize: 12,
      fontFamily: 'Inter',
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
  }
};

/**
 * Content validation utilities
 */
export const ContentValidator = {
  validateHTML(html: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!html || typeof html !== 'string') {
      errors.push('Content is required and must be a string');
      return { isValid: false, errors };
    }

    // Basic HTML validation - check for balanced tags
    const tagRegex = /<[^>]+>/g;
    const tags = html.match(tagRegex) || [];
    const openTags = tags.filter(tag => !tag.startsWith('</')).length;
    const closeTags = tags.filter(tag => tag.startsWith('</')).length;

    if (openTags !== closeTags) {
      errors.push('HTML tags are not properly balanced');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  sanitizeHTML(html: string): string {
    // Basic HTML sanitization - in a real app, you'd use a library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  estimateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
};