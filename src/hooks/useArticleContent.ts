import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useEditorActions, useEditorLoading, useEditorError } from '@/store/editor';
import { ArticleContent } from '@/types';

interface UseArticleContentOptions {
  autoFetch?: boolean;
  onError?: (error: string) => void;
  onSuccess?: (content: ArticleContent) => void;
}

export const useArticleContent = (options: UseArticleContentOptions = {}) => {
  const { autoFetch = true, onError, onSuccess } = options;
  const router = useRouter();
  const { setArticleContent, setLoading, setError } = useEditorActions();
  const { isLoading } = useEditorLoading();
  const error = useEditorError();

  const fetchArticleContent = useCallback(async (url: string) => {
    setLoading(true, '正在获取文章内容...');

    try {
      const response = await fetch('/api/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch article content');
      }

      const articleContent: ArticleContent = result.data;
      setArticleContent(articleContent);
      onSuccess?.(articleContent);

      return articleContent;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setArticleContent, setLoading, setError, onError, onSuccess]);

  // Auto-fetch content when URL is in query parameters
  useEffect(() => {
    if (autoFetch && router.isReady) {
      const { url } = router.query;

      if (url && typeof url === 'string') {
        fetchArticleContent(url);
      }
    }
  }, [autoFetch, router.isReady, router.query, fetchArticleContent]);

  return {
    fetchArticleContent,
    isLoading,
    error
  };
};