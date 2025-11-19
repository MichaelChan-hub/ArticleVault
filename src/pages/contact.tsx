import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import SEOMeta from '@/components/seo/SEOMeta';

const Contact: NextPage = () => {
  return (
    <>
      <SEOMeta
        title="联系我们 - ArticleVault"
        description="联系 ArticleVault 团队，反馈问题或提出建议，我们重视每一位用户的反馈"
        keywords="联系我们,客服,技术支持,问题反馈,建议,ArticleVault"
      />

      <Layout>
        <Container>
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              联系我们
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  反馈与建议
                </h2>
                <p className="text-gray-600 mb-6">
                  我们重视每一位用户的反馈。如果您有任何建议或遇到问题，请随时联系我们。
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">邮箱</h3>
                    <p className="text-gray-600">support@articlevault.com</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">反馈时间</h3>
                    <p className="text-gray-600">我们会在24小时内回复您的邮件</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  技术支持
                </h2>
                <p className="text-gray-600 mb-6">
                  遇到技术问题或需要帮助？查看我们的常见问题或直接联系技术支持团队。
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">常见问题</h3>
                    <a href="/faq" className="text-primary-600 hover:text-primary-700">
                      查看FAQ →
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Bug报告</h3>
                    <p className="text-gray-600">请在邮件中详细描述问题和复现步骤</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="/"
                className="btn-primary inline-block"
              >
                返回首页
              </a>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Contact;