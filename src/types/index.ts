// Article related types
export interface ArticleMetadata {
  title: string;
  author?: string;
  publishDate?: string;
  description?: string;
  siteName?: string;
  originalUrl: string;
  wordCount?: number;
  readingTime?: number;
}

export interface ArticleContent {
  metadata: ArticleMetadata;
  content: string;
  images: ArticleImage[];
  links: ArticleLink[];
}

export interface ArticleImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ArticleLink {
  href: string;
  text: string;
  title?: string;
}

// API related types
export interface FetchResponse {
  success: boolean;
  data?: ArticleContent;
  error?: string;
}

export interface PDFGenerationOptions {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  includeSourceUrl: boolean;
  includeAuthor: boolean;
  watermark?: string;
}

export interface PDFResponse {
  success: boolean;
  pdfUrl?: string;
  error?: string;
}

export interface URLValidationResponse {
  valid: boolean;
  accessible: boolean;
  metadata?: {
    title?: string;
    description?: string;
    siteName?: string;
  };
}

// UI related types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
}

// Editor related types
export interface EditorState {
  content: string;
  metadata: ArticleMetadata;
  pdfOptions: PDFGenerationOptions;
  isDirty: boolean;
}

export interface EditorAction {
  type: 'UPDATE_CONTENT' | 'UPDATE_METADATA' | 'UPDATE_PDF_OPTIONS' | 'RESET';
  payload: any;
}