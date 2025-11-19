import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url,
  noIndex = false,
  type = 'website'
}) => {
  const router = useRouter();
  const siteName = 'ArticleVault';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articlevault.com';
  const currentUrl = url || `${baseUrl}${router.asPath}`;

  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  const fullDescription = description || '免费在线工具，将网页文章转换为高质量PDF文档，支持可视化编辑和自定义样式';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Theme Color */}
      <meta name="theme-color" content="#3b82f6" />

      {/* Author */}
      <meta name="author" content="ArticleVault Team" />

      {/* Generator */}
      <meta name="generator" content="Next.js" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'WebApplication' : 'WebSite',
            name: fullTitle,
            description: fullDescription,
            url: currentUrl,
            image: `${baseUrl}${image}`,
            publisher: {
              '@type': 'Organization',
              name: siteName,
              url: baseUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
              }
            },
            mainEntity: type === 'article' ? {
              '@type': 'Article',
              headline: title,
              description: fullDescription
            } : undefined
          })
        }}
      />
    </Head>
  );
};

export default SEOMeta;