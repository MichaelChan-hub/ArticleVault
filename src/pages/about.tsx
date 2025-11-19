import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import SEOMeta from '@/components/seo/SEOMeta';

const About: NextPage = () => {
  return (
    <>
      <SEOMeta
        title="关于我们 - ArticleVault"
        description="了解 ArticleVault 的使命和团队，我们致力于提供最好用的免费网页文章转PDF服务，让知识保存变得简单高效"
        keywords="关于我们,ArticleVault,团队使命,网页转PDF,知识保存,免费工具"
      />

      <Layout>
        <Container>
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              关于 ArticleVault
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="card mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  我们的使命
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ArticleVault 致力于为用户提供最简单、最高质量的网页文章转PDF服务。
                  我们相信知识的价值，希望通过我们的工具帮助用户更好地保存、分享和管理网络内容。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  无论您是学生、研究人员、内容创作者还是普通用户，ArticleVault 都能满足您将网络文章转换为PDF格式的需求。
                </p>
              </div>

              <div className="card mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  核心功能
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>智能内容提取</strong> - 自动识别和提取文章正文内容</li>
                  <li>• <strong>可视化编辑</strong> - 直观的编辑界面，支持内容调整和样式自定义</li>
                  <li>• <strong>高质量输出</strong> - 生成格式优美、清晰的PDF文档</li>
                  <li>• <strong>来源追踪</strong> - 自动在PDF中添加原文链接和作者信息</li>
                  <li>• <strong>完全免费</strong> - 无限制使用，无需注册</li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  技术栈
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ArticleVault 基于现代Web技术构建，采用 Next.js、Playwright、Mozilla Readability 等先进技术，
                  确服务的性能和可靠性。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  我们持续优化和改进产品，为用户提供更好的使用体验。
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="/"
                className="btn-primary inline-block mr-4"
              >
                开始使用
              </a>
              <a
                href="/contact"
                className="btn-secondary inline-block"
              >
                联系我们
              </a>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default About;