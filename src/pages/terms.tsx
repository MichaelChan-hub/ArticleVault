import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import SEOMeta from '@/components/seo/SEOMeta';

const Terms: NextPage = () => {
  return (
    <>
      <SEOMeta
        title="服务条款 - ArticleVault"
        description="ArticleVault 的服务条款，使用我们免费网页转PDF服务的规则和条件，确保合规使用"
        keywords="服务条款,使用条款,服务规则,法律责任,合规使用"
      />

      <Layout>
        <Container>
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              服务条款
            </h1>

            <div className="prose prose-lg max-w-none space-y-6">
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  服务说明
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  ArticleVault 是一个免费的网页文章转PDF工具。通过使用我们的服务，
                  您同意遵守以下条款和条件。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  使用限制
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  您同意：
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>仅将服务用于合法目的</li>
                  <li>不违反任何适用的法律法规</li>
                  <li>不尝试绕过我们的安全措施</li>
                  <li>不滥用或过度使用服务</li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  内容和版权
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  您对转换的内容拥有完整的版权和所有权。我们不会对您的内容提出任何所有权主张。
                  请确保您有权利转换和使用相关内容。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  免责声明
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  服务按"现状"提供，我们不对服务的准确性、可靠性或可用性做出任何保证。
                  在法律允许的范围内，我们不对任何因使用服务造成的损失承担责任。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  服务变更
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  我们保留随时修改或终止服务的权利，恕不另行通知。
                  重大变更将通过网站公告或其他适当方式通知用户。
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  联系信息
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  如对服务条款有疑问，请联系我们：support@articlevault.com
                </p>
                <p className="text-gray-600 mt-2">
                  最后更新：{new Date().toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Terms;