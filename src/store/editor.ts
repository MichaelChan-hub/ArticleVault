import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ArticleContent, EditorState, PDFGenerationOptions, EditorAction } from '@/types';
import { PDFOptionsValidator } from '@/lib/validators';

interface EditorStore extends EditorState {
  // Actions
  setArticleContent: (content: ArticleContent) => void;
  updateContent: (content: string) => void;
  updateMetadata: (metadata: Partial<ArticleContent['metadata']>) => void;
  updatePdfOptions: (options: Partial<PDFGenerationOptions>) => void;
  setIsDirty: (isDirty: boolean) => void;
  reset: () => void;
  setLoading: (isLoading: boolean, message?: string) => void;
  setError: (error: string | null) => void;

  // Computed states
  wordCount: number;
  estimatedFileSizeKB: number;
}

const initialState: EditorState = {
  content: {
    metadata: {
      title: '',
      author: '',
      publishDate: '',
      description: '',
      siteName: '',
      originalUrl: '',
      wordCount: 0,
      readingTime: 0
    },
    content: '',
    images: [],
    links: []
  },
  pdfOptions: PDFOptionsValidator.getDefaultOptions(),
  isDirty: false,
  isLoading: false,
  loadingMessage: '',
  error: null
};

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Basic state
      ...initialState,

      // Computed states
      get wordCount(): number {
        const { content } = get();
        const textContent = content.content.replace(/<[^>]*>/g, '').trim();
        return textContent.split(/\s+/).filter(word => word.length > 0).length;
      },

      get estimatedFileSizeKB(): number {
        const { content, pdfOptions } = get();
        const contentLength = content.content.length + JSON.stringify(content.metadata).length;
        const baseSize = contentLength / 100;
        const imageOverhead = content.images.length * 50;
        const styleOverhead = pdfOptions.fontSize * 10 + pdfOptions.lineHeight * 5;
        return Math.round(baseSize + imageOverhead + styleOverhead);
      },

      // Actions
      setArticleContent: (articleContent: ArticleContent) => {
        set((state) => ({
          content: articleContent,
          isDirty: false,
          error: null
        }));
      },

      updateContent: (newContent: string) => {
        set((state) => ({
          content: {
            ...state.content,
            content: newContent
          },
          isDirty: true,
          error: null
        }));
      },

      updateMetadata: (metadataUpdates) => {
        set((state) => ({
          content: {
            ...state.content,
            metadata: {
              ...state.content.metadata,
              ...metadataUpdates
            }
          },
          isDirty: true,
          error: null
        }));
      },

      updatePdfOptions: (optionsUpdates) => {
        set((state) => {
          const updatedOptions = PDFOptionsValidator.validateOptions({
            ...state.pdfOptions,
            ...optionsUpdates
          });

          return {
            pdfOptions: updatedOptions,
            isDirty: true,
            error: null
          };
        });
      },

      setIsDirty: (isDirty: boolean) => {
        set({ isDirty });
      },

      reset: () => {
        set(initialState);
      },

      setLoading: (isLoading: boolean, message?: string) => {
        set({
          isLoading,
          loadingMessage: message || '',
          error: isLoading ? null : get().error
        });
      },

      setError: (error: string | null) => {
        set({
          error,
          isLoading: false,
          loadingMessage: ''
        });
      }
    }),
    {
      name: 'editor-store'
    }
  )
);

// Selectors for common use cases
export const useEditorContent = () => useEditorStore((state) => state.content);
export const useEditorMetadata = () => useEditorStore((state) => state.content.metadata);
export const usePdfOptions = () => useEditorStore((state) => state.pdfOptions);
export const useEditorIsDirty = () => useEditorStore((state) => state.isDirty);
export const useEditorLoading = () => useEditorStore((state) => ({
  isLoading: state.isLoading,
  message: state.loadingMessage
}));
export const useEditorError = () => useEditorStore((state) => state.error);
export const useEditorStats = () => useEditorStore((state) => ({
  wordCount: state.wordCount,
  estimatedFileSizeKB: state.estimatedFileSizeKB
}));

// Actions hooks
export const useEditorActions = () => useEditorStore((state) => ({
  setArticleContent: state.setArticleContent,
  updateContent: state.updateContent,
  updateMetadata: state.updateMetadata,
  updatePdfOptions: state.updatePdfOptions,
  setIsDirty: state.setIsDirty,
  reset: state.reset,
  setLoading: state.setLoading,
  setError: state.setError
}));