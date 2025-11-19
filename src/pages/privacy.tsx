import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import SEOMeta from '@/components/seo/SEOMeta';

const Privacy: NextPage = () => {
  return (
    <>
      <SEOMeta
        title="隐私政策 - ArticleVault"
        description="ArticleVault 的隐私政策，了解我们如何收集、使用和保护您的个人信息及数据"
        keywords="隐私政策,数据保护,个人信息,用户隐私,安全"
      />

      <Layout>
        <Container>
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              隐私政策
            </h1>

            <div className="prose prose-lg max-w-none space-y-6">
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  信息收集
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  ArticleVault 尊重并保护您的隐私。我们仅在必要时收集信息，以提供更好的服务体验。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  数据使用
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  我们使用收集的信息来：
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>提供和维护我们的服务</li>
                  <li>改进和优化用户体验</li>
                  <li>分析服务使用情况</li>
                  <li>防止滥用和确保服务安全</li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  数据安全
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  我们采用行业标准的安全措施保护您的信息。所有数据传输都使用加密协议，
                  我们不会将您的个人信息出售或分享给第三方。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Cookie政策
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  我们使用Cookie来改善用户体验和分析网站使用情况。您可以通过浏览器设置管理Cookie偏好。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  联系我们
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  如果您对隐私政策有任何疑问，请通过 support@articlevault.com 联系我们。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Privacy;