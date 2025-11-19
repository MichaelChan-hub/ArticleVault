import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import SEOMeta from '@/components/seo/SEOMeta';
import TipTapEditor from '@/components/editor/TipTapEditor';
import {
  useEditorContent,
  useEditorMetadata,
  usePdfOptions,
  useEditorActions,
  useEditorLoading,
  useEditorError,
  useEditorStats
} from '@/store/editor';
import { useArticleContent } from '@/hooks/useArticleContent';
import { PDFGenerationOptions } from '@/types';
import { formatFileSize } from '@/lib/utils';

const Editor: NextPage = () => {
  const { isLoading, message } = useEditorLoading();
  const error = useEditorError();
  const content = useEditorContent();
  const metadata = useEditorMetadata();
  const pdfOptions = usePdfOptions();
  const { wordCount, estimatedFileSizeKB } = useEditorStats();
  const {
    updateContent,
    updatePdfOptions,
    reset,
    setError
  } = useEditorActions();

  // Custom hook for fetching article content
  const { fetchArticleContent } = useArticleContent({
    onError: (errorMessage) => {
      setError(errorMessage);
    }
  });

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Handle PDF generation
  const handleGeneratePDF = async () => {
    if (!metadata.title) {
      setError('请确保文章有标题');
      return;
    }

    setIsGeneratingPDF(true);
    setError(null);

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.content,
          metadata: content.metadata,
          styles: pdfOptions
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'PDF generation failed');
      }

      // Download the PDF
      const pdfUrl = result.pdfUrl;
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${metadata.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'PDF生成失败';
      setError(errorMessage);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Handle preview
  const handlePreview = async () => {
    // Generate PDF and open in new tab instead of downloading
    if (!metadata.title) {
      setError('请确保文章有标题');
      return;
    }

    setIsGeneratingPDF(true);
    setError(null);

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.content,
          metadata: content.metadata,
          styles: pdfOptions
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'PDF preview failed');
      }

      // Open PDF in new tab
      window.open(result.pdfUrl, '_blank');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'PDF预览失败';
      setError(errorMessage);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <SEOMeta
        title={`编辑: ${metadata.title || '无标题'} - ArticleVault`}
        description={`正在编辑文章: ${metadata.description || metadata.title || '无标题'}`}
      />

      <Layout>
        <Container>
          <div className="max-w-6xl mx-auto py-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                PDF编辑器
              </h1>
              <p className="text-gray-600">
                自定义您的文章内容和PDF样式
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-gray-600">{message || '加载中...'}</p>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">错误</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            {!isLoading && metadata.title && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Editor Panel */}
                <div className="lg:col-span-2">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      文章内容
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>字数: {wordCount}</span>
                      <span>阅读时间: {Math.ceil(wordCount / 200)} 分钟</span>
                      <span>预计文件大小: {formatFileSize(estimatedFileSizeKB * 1024)}</span>
                    </div>
                  </div>
                  <TipTapEditor
                    content={content}
                    pdfOptions={pdfOptions}
                    onContentChange={updateContent}
                    editable={!isGeneratingPDF}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Article Info */}
                  <div className="card">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      文章信息
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="font-medium text-gray-700">标题:</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded">
                          {metadata.title}
                        </div>
                      </div>
                      {metadata.author && (
                        <div>
                          <label className="font-medium text-gray-700">作者:</label>
                          <div className="mt-1 p-2 bg-gray-50 rounded">
                            {metadata.author}
                          </div>
                        </div>
                      )}
                      {metadata.siteName && (
                        <div>
                          <label className="font-medium text-gray-700">来源:</label>
                          <div className="mt-1 p-2 bg-gray-50 rounded">
                            {metadata.siteName}
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="font-medium text-gray-700">原文链接:</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded break-all">
                          <a
                            href={metadata.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            {metadata.originalUrl}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PDF Options */}
                  <div className="card">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      PDF设置
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          字体大小
                        </label>
                        <select
                          className="input-field"
                          value={pdfOptions.fontSize}
                          onChange={(e) => updatePdfOptions({ fontSize: Number(e.target.value) })}
                          disabled={isGeneratingPDF}
                        >
                          <option value={10}>10pt</option>
                          <option value={12}>12pt</option>
                          <option value={14}>14pt</option>
                          <option value={16}>16pt</option>
                          <option value={18}>18pt</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          字体
                        </label>
                        <select
                          className="input-field"
                          value={pdfOptions.fontFamily}
                          onChange={(e) => updatePdfOptions({ fontFamily: e.target.value })}
                          disabled={isGeneratingPDF}
                        >
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Arial">Arial</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Inter">Inter</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          行间距
                        </label>
                        <select
                          className="input-field"
                          value={pdfOptions.lineHeight}
                          onChange={(e) => updatePdfOptions({ lineHeight: Number(e.target.value) })}
                          disabled={isGeneratingPDF}
                        >
                          <option value={1.2}>紧密 (1.2)</option>
                          <option value={1.4}>正常 (1.4)</option>
                          <option value={1.6}>宽松 (1.6)</option>
                          <option value={1.8}>很宽松 (1.8)</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={pdfOptions.includeSourceUrl}
                            onChange={(e) => updatePdfOptions({ includeSourceUrl: e.target.checked })}
                            disabled={isGeneratingPDF}
                          />
                          <span className="text-sm text-gray-700">包含原文链接</span>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={pdfOptions.includeAuthor}
                            onChange={(e) => updatePdfOptions({ includeAuthor: e.target.checked })}
                            disabled={isGeneratingPDF}
                          />
                          <span className="text-sm text-gray-700">包含作者信息</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="card">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      操作
                    </h3>
                    <div className="space-y-3">
                      <button
                        className="btn-primary w-full flex items-center justify-center"
                        onClick={handlePreview}
                        disabled={isGeneratingPDF || !metadata.title}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            生成中...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            预览PDF
                          </>
                        )}
                      </button>
                      <button
                        className="btn-secondary w-full flex items-center justify-center"
                        onClick={handleGeneratePDF}
                        disabled={isGeneratingPDF || !metadata.title}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                            生成中...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            下载PDF
                          </>
                        )}
                      </button>
                      <button
                        className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => window.location.href = '/'}
                        disabled={isGeneratingPDF}
                      >
                        返回首页
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !metadata.title && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到文章</h3>
                <p className="mt-1 text-sm text-gray-500">请从首页输入URL来获取文章内容</p>
                <div className="mt-6">
                  <a
                    href="/"
                    className="btn-primary inline-flex items-center"
                  >
                    返回首页
                  </a>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Editor;