import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import URLInput from '@/components/ui/URLInput';
import FeatureSection from '@/components/ui/FeatureSection';
import SEOMeta from '@/components/seo/SEOMeta';

const Home: NextPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <>
      <SEOMeta
        title="ArticleVault - 网页文章转PDF工具"
        description="免费在线工具，将网页文章转换为高质量PDF文档，支持可视化编辑和自定义样式"
        keywords="网页转PDF,文章转PDF,在线PDF工具,文章下载"
      />

      <Layout>
        <Container>
          {/* Hero Section */}
          <section className="text-center py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                网页文章转
                <span className="text-primary-600">PDF</span>
                工具
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                输入网页链接，一键将文章转换为精美PDF文档。支持内容编辑、样式自定义，自动保留原文信息。
              </p>

              {/* URL Input Component */}
              <URLInput onProcessStart={() => setIsProcessing(true)} />

              {isProcessing && (
                <div className="mt-8">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-gray-600">正在处理您的请求...</p>
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <FeatureSection />

          {/* How it works */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                如何使用
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">输入网页链接</h3>
                  <p className="text-gray-600">粘贴或输入您想要转换的文章网址</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">编辑和自定义</h3>
                  <p className="text-gray-600">使用可视化编辑器调整内容和样式</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">下载PDF</h3>
                  <p className="text-gray-600">生成高质量PDF并下载到本地</p>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
};

export default Home;