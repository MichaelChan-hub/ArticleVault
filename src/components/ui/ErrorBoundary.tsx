import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          应用程序错误
        </h2>
        <p className="text-center text-gray-600 mb-6">
          抱歉，应用程序遇到了意外错误。请刷新页面重试。
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded text-sm">
            <summary className="cursor-pointer font-medium text-gray-700 mb-2">
              错误详情
            </summary>
            <pre className="whitespace-pre-wrap text-gray-600">
              {error.message}
              {error.stack && '\n' + error.stack}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <button
            onClick={resetErrorBoundary}
            className="btn-primary flex-1"
          >
            重试
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary flex-1"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  onError
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
        onError?.(error, errorInfo);

        // In production, you might want to send this to an error reporting service
        if (process.env.NODE_ENV === 'production') {
          // Example: sendErrorToService(error, errorInfo);
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

