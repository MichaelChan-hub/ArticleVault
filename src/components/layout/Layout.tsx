import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title ? `${title} - ArticleVault` : 'ArticleVault - 网页文章转PDF工具'}</title>
        <meta name="description" content={description || '免费在线工具，将网页文章转换为高质量PDF文档'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;