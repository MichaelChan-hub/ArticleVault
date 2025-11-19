import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface URLInputProps {
  onProcessStart?: () => void;
}

interface URLFormData {
  url: string;
}

const URLInput: React.FC<URLInputProps> = ({ onProcessStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<URLFormData>();

  const watchedUrl = watch('url');

  const validateURL = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const onSubmit = async (data: URLFormData) => {
    setError(null);

    if (!validateURL(data.url)) {
      setError('请输入有效的网页链接');
      return;
    }

    setIsLoading(true);
    onProcessStart?.();

    try {
      // First validate the URL
      const validateResponse = await fetch('/api/validate-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: data.url }),
      });

      const validateResult = await validateResponse.json();

      if (!validateResult.valid) {
        setError('请输入有效的网页链接');
        return;
      }

      // Redirect to editor with URL
      window.location.href = `/editor?url=${encodeURIComponent(data.url)}`;

    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteExample = (url: string) => {
    setValue('url', url);
  };

  const handleClearInput = () => {
    setValue('url', '');
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input
                type="url"
                placeholder="粘贴或输入网页链接，例如: https://example.com/article"
                className={`input-field pr-12 ${errors.url ? 'border-red-500' : ''}`}
                {...register('url', {
                  required: '请输入网页链接',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: '请输入有效的网页链接（以 http:// 或 https:// 开头）'
                  }
                })}
                disabled={isLoading}
              />
              {watchedUrl && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !watchedUrl}
              className="btn-primary px-8 py-2 min-w-[120px] flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>处理中</span>
                </div>
              ) : (
                '转换文章'
              )}
            </button>
          </div>

          {errors.url && (
            <p className="mt-1 text-sm text-red-600">
              {errors.url.message}
            </p>
          )}

          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </form>

      {/* Example URLs */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">试试这些示例链接：</p>
        <div className="flex flex-wrap gap-2">
          {[
            'https://www.example.com/news/article',
            'https://blog.example.com/tech-post',
            'https://medium.com/example-article'
          ].map((exampleUrl, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePasteExample(exampleUrl)}
              className="text-sm text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-md transition-colors duration-200"
            >
              示例 {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default URLInput;