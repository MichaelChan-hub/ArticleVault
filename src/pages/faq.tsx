import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import SEOMeta from '@/components/seo/SEOMeta';

const FAQ: NextPage = () => {
  const faqs = [
    {
      question: "ArticleVault 是免费的吗？",
      answer: "是的，ArticleVault 完全免费使用。您可以无限制地转换文章为PDF格式。"
    },
    {
      question: "支持哪些类型的网页？",
      answer: "我们支持大多数包含文章内容的网页，包括新闻网站、博客、学术文章等。系统会自动提取主要内容。"
    },
    {
      question: "转换后的PDF质量如何？",
      answer: "我们使用高质量的PDF生成引擎，确保输出的PDF文档清晰、格式美观，并保留原文的排版结构。"
    },
    {
      question: "可以自定义PDF样式吗？",
      answer: "是的，在编辑器中您可以自定义字体、字号、行距、页边距等样式设置。"
    },
    {
      question: "转换后的PDF会包含原文链接吗？",
      answer: "是的，我们会在PDF中自动添加原文链接和作者信息，方便您追溯原始来源。"
    }
  ];

  return (
    <>
      <SEOMeta
        title="常见问题 - ArticleVault"
        description="查看 ArticleVault 网页转PDF工具的常见问题解答，了解如何使用我们的免费文章转PDF服务"
        keywords="常见问题,FAQ,网页转PDF,文章转PDF,使用帮助"
      />

      <Layout>
        <Container>
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              常见问题
            </h1>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                还有其他问题？
              </p>
              <a
                href="/contact"
                className="btn-primary inline-block"
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

export default FAQ;