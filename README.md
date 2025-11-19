# ArticleVault

一个专业的网页文章转PDF在线工具，支持智能内容提取、可视化编辑和自定义样式。

## ✨ 功能特点

- 🚀 **快速转换** - 输入网址，一键转换，几秒钟内获得高质量PDF
- 🧠 **智能提取** - 使用Mozilla Readability算法自动识别和提取正文内容
- ✏️ **可视化编辑** - 使用TipTap富文本编辑器，支持内容调整和样式自定义
- 📄 **高质量输出** - 使用html-pdf-node生成格式优美、内容清晰的PDF文档
- 🔗 **来源追踪** - 自动在PDF中添加原文链接和作者信息
- 📱 **响应式设计** - 支持桌面端和移动端使用
- 💰 **完全免费** - 无限制使用，无需注册
- 🛡️ **安全可靠** - 完整的错误处理和数据验证

## 🛠 技术栈

- **前端框架**: Next.js 14 + TypeScript + TailwindCSS
- **状态管理**: Zustand
- **富文本编辑器**: TipTap
- **后端服务**: Next.js API Routes
- **网页抓取**: Playwright
- **内容提取**: Mozilla Readability + JSDOM
- **PDF生成**: html-pdf-node
- **错误处理**: React Error Boundary
- **部署**: Vercel (推荐), Docker

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境配置

复制 `.env.local` 文件并根据需要修改配置：

```bash
cp .env.local.example .env.local
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                    # App Router (Next.js 13+)
├── components/             # React 组件
│   ├── layout/            # 布局组件
│   ├── ui/                # UI 组件
│   ├── seo/               # SEO 组件
│   └── editor/            # 编辑器组件
├── lib/                   # 工具函数
│   ├── playwright.ts      # 网页抓取
│   ├── readability.ts     # 内容提取
│   ├── pdf-generator.ts   # PDF 生成
│   └── utils.ts           # 通用工具
├── pages/                 # Pages Router
│   ├── api/               # API 路由
│   └── *.tsx              # 页面组件
├── types/                 # TypeScript 类型
├── styles/                # 样式文件
└── hooks/                 # React Hooks
```

## API 文档

### 验证URL
```http
POST /api/validate-url
Content-Type: application/json

{
  "url": "https://example.com/article"
}
```

### 获取文章内容
```http
POST /api/fetch
Content-Type: application/json

{
  "url": "https://example.com/article"
}
```

### 生成PDF
```http
POST /api/pdf
Content-Type: application/json

{
  "content": "...",
  "metadata": {...},
  "styles": {...}
}
```

## 开发指南

### 添加新功能

1. 在相应的目录中创建组件或工具函数
2. 更新 TypeScript 类型定义
3. 添加 API 路由（如需要）
4. 更新文档

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 组件使用函数式组件和 Hooks
- API 路由包含适当的错误处理

### 测试

```bash
npm run test
```

## 部署

### Vercel (推荐)

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### Docker

```bash
docker build -t article-vault .
docker run -p 3000:3000 article-vault
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系我们

- 邮箱: support@articlevault.com
- 网站: https://articlevault.com

---

## 项目架构深度分析

### 技术栈选择与优势

#### 前端技术栈

**Next.js 14 + TypeScript**
- 选择理由：提供完整的 SSR/SSG 支持，优秀的性能优化
- 核心优势：
  - 自动代码分割和懒加载
  - 内置图片优化和字体优化
  - 支持多种渲染模式（SSR、SSG、ISR、CSR）
  - 强大的开发工具和调试支持
  - 完善的 TypeScript 集成

**TailwindCSS**
- 原子化 CSS 框架，提供高度可定制的样式系统
- 生产环境自动移除未使用的 CSS，优化包大小
- 响应式设计的优秀支持
- 丰富的组件生态系统

**Zustand 状态管理**
- 轻量级状态管理解决方案（2.9kb）
- 简洁的 API 设计，学习成本低
- TypeScript 友好，完整的类型推导
- 支持 DevTools 集成，便于调试

**TipTap 富文本编辑器**
- 基于 ProseMirror 的现代编辑器框架
- 模块化设计，按需引入功能
- 优秀的 TypeScript 支持
- 丰富的扩展生态系统

#### 后端技术栈

**Playwright 浏览器自动化**
- 强大的页面抓取能力，支持现代 JavaScript 渲染
- 跨浏览器支持（Chromium、Firefox、WebKit）
- 内置网络拦截和模拟功能
- 优秀的错误处理和调试支持

**Mozilla Readability**
- 经过验证的内容提取算法
- 智能识别正文内容，过滤广告和导航元素
- 提取结构化的元数据（标题、作者、发布时间等）
- 开源项目，持续维护更新

**html-pdf-node**
- 基于 Phantom.js 的 PDF 生成引擎
- 支持 CSS 样式和现代 Web 标准
- 高质量的渲染效果
- 灵活的配置选项

### 项目文件结构详解

```
article-vault/
├── src/
│   ├── components/              # React 组件库
│   │   ├── editor/             # 编辑器相关组件
│   │   │   └── TipTapEditor.tsx    # TipTap 富文本编辑器封装
│   │   ├── layout/             # 布局组件
│   │   │   ├── Layout.tsx          # 主布局组件
│   │   │   ├── Header.tsx          # 网站头部导航
│   │   │   └── Footer.tsx          # 网站底部信息
│   │   ├── seo/                # SEO 优化组件
│   │   │   └── SEOMeta.tsx         # Meta 标签和结构化数据
│   │   └── ui/                 # 基础 UI 组件
│   │       ├── Container.tsx       # 页面容器组件
│   │       ├── URLInput.tsx        # URL 输入框组件
│   │       ├── FeatureSection.tsx  # 功能特性展示
│   │       ├── LoadingSpinner.tsx  # 加载动画组件
│   │       └── ErrorBoundary.tsx   # 错误边界组件
│   ├── pages/                   # Next.js 页面路由
│   │   ├── _app.tsx                # 应用程序入口
│   │   ├── _document.tsx           # 文档结构定制
│   │   ├── index.tsx               # 首页 - 主要工具界面
│   │   ├── editor.tsx              # 编辑器页面
│   │   ├── about.tsx               # 关于页面
│   │   ├── faq.tsx                 # 常见问题页面
│   │   ├── contact.tsx             # 联系页面
│   │   ├── privacy.tsx             # 隐私政策页面
│   │   ├── terms.tsx               # 服务条款页面
│   │   └── api/                    # API 路由
│   │       ├── fetch.ts                # 内容抓取 API
│   │       ├── validate-url.ts         # URL 验证 API
│   │       ├── pdf.ts                  # PDF 生成 API
│   │       └── pdf/
│   │           └── download/
│   │               └── [id].ts           # PDF 下载 API
│   ├── lib/                     # 核心业务逻辑库
│   │   ├── playwright.ts            # 页面抓取实现
│   │   ├── readability.ts           # 内容提取实现
│   │   ├── pdf-generator.ts         # PDF 生成实现
│   │   ├── validators.ts            # 验证函数集合
│   │   └── utils.ts                 # 通用工具函数
│   ├── hooks/                   # 自定义 React Hooks
│   │   └── useArticleContent.ts     # 文章内容状态管理 Hook
│   ├── store/                   # Zustand 状态管理
│   │   └── editor.ts                # 编辑器状态管理
│   ├── types/                   # TypeScript 类型定义
│   │   └── index.ts                 # 核心类型定义
│   └── styles/                  # 样式文件
│       └── globals.css               # 全局样式
├── public/                      # 静态资源目录
│   ├── icons/                   # 图标文件
│   ├── images/                  # 图片资源
│   └── favicon.ico              # 网站图标
├── docs/                        # 项目文档
├── next.config.js               # Next.js 配置文件
├── tailwind.config.js           # TailwindCSS 配置
├── tsconfig.json               # TypeScript 编译配置
├── package.json                # 项目依赖和脚本
└── README.md                   # 项目说明文档
```

### 核心模块实现分析

#### 1. 内容抓取模块 (src/lib/playwright.ts)

**架构设计**
```typescript
class WebScraper {
  private browser: Browser | null = null;
  private options: ScrapingOptions;

  constructor(options: ScrapingOptions = {}) {
    this.options = {
      timeout: 30000,
      waitUntil: 'networkidle',
      userAgent: 'Mozilla/5.0...',
      ...options
    };
  }
}
```

**核心功能实现**

1. **浏览器初始化与资源管理**
   - 无头浏览器模式，减少资源占用
   - 自动浏览器生命周期管理
   - 优雅的错误处理和资源清理

2. **页面导航与等待策略**
   ```typescript
   async navigateToPage(url: string): Promise<Page> {
     if (!this.browser) {
       await this.initialize();
     }

     const page = await this.browser!.newPage();
     await page.setUserAgent(this.options.userAgent);

     // 设置页面拦截策略，优化加载速度
     await page.setRequestInterception(true);
     page.on('request', (req) => {
       if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
         req.abort(); // 跳过非必要资源
       } else {
         req.continue();
       }
     });

     await page.goto(url, {
       waitUntil: this.options.waitUntil,
       timeout: this.options.timeout
     });

     return page;
   }
   ```

3. **元数据提取算法**
   ```typescript
   async extractMetadata(page: Page, url: string): Promise<ArticleMetadata> {
     return await page.evaluate(() => {
       const getMetaContent = (selector: string): string => {
         const element = document.querySelector(selector);
         return element?.getAttribute('content') || '';
       };

       return {
         title: document.title || getMetaContent('meta[property="og:title"]'),
         author: getMetaContent('meta[name="author"]'),
         publishDate: getMetaContent('meta[property="article:published_time"]') ||
                     getMetaContent('meta[name="date"]'),
         description: getMetaContent('meta[name="description"]') ||
                    getMetaContent('meta[property="og:description"]'),
         siteName: getMetaContent('meta[property="og:site_name"]'),
         url: window.location.href
       };
     });
   }
   ```

4. **图片处理策略**
   ```typescript
   async extractImages(page: Page, baseUrl: string): Promise<ArticleImage[]> {
     return await page.evaluate((base) => {
       const images: ArticleImage[] = [];
       const imgElements = document.querySelectorAll('img');

       imgElements.forEach((img, index) => {
         const src = img.src || img.getAttribute('data-src');
         if (src && !src.startsWith('data:')) {
           const absoluteUrl = new URL(src, base).href;
           images.push({
             src: absoluteUrl,
             alt: img.alt || `Image ${index + 1}`,
             width: img.naturalWidth || img.width,
             height: img.naturalHeight || img.height
           });
         }
       });

       return images;
     }, baseUrl);
   }
   ```

**性能优化特性**
- 请求拦截：跳过图片、CSS、字体等非关键资源
- 并行处理：多个页面同时抓取
- 缓存机制：避免重复抓取相同页面
- 超时控制：防止页面加载时间过长

#### 2. 内容提取模块 (src/lib/readability.ts)

**Mozilla Readability 集成**
```typescript
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

class ContentExtractor {
  extractContent(html: string, url: string): ArticleContent | null {
    try {
      // 创建虚拟 DOM 环境
      const dom = new JSDOM(html, {
        url,
        contentType: 'text/html',
        includeNodeLocations: false,
        storageQuota: 1000000
      });

      // 应用 Readability 算法
      const reader = new Readability(dom.window.document, {
        charThreshold: 100,  // 最小字符数阈值
        classesToPreserve: ['caption', 'img'], // 保留的 CSS 类
        keepClasses: false
      });

      const article = reader.parse();

      if (!article) {
        throw new Error('Readability 无法解析文章内容');
      }

      return this.processExtractedContent(article, url);
    } catch (error) {
      console.error('内容提取失败:', error);
      return null;
    }
  }
}
```

**内容处理与清理**
```typescript
private processExtractedContent(article: any, url: string): ArticleContent {
  // 处理图片链接
  const processedContent = this.processImagesInContent(article.content, url);

  // 处理相对链接
  const processedWithLinks = this.processLinksInContent(processedContent, url);

  // HTML 安全化处理
  const sanitizedContent = this.sanitizeHTML(processedWithLinks);

  // 提取文章摘要
  const excerpt = this.generateExcerpt(article.content);

  return {
    title: article.title || '无标题',
    content: sanitizedContent,
    excerpt: excerpt,
    author: article.byline || '未知作者',
    publishDate: article.published_time || null,
    siteName: article.siteName || this.extractSiteName(url),
    originalUrl: url,
    wordCount: this.calculateWordCount(article.content),
    readingTime: this.estimateReadingTime(article.content),
    images: this.extractImagesFromContent(sanitizedContent),
    links: this.extractLinksFromContent(sanitizedContent),
    language: this.detectLanguage(article.content)
  };
}
```

**智能内容处理**
1. **图片路径规范化**
   ```typescript
   private processImagesInContent(content: string, baseUrl: string): string {
     return content.replace(/<img[^>]+>/g, (imgTag) => {
       const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
       if (srcMatch && !srcMatch[1].startsWith('http') && !srcMatch[1].startsWith('data:')) {
         const absoluteUrl = new URL(srcMatch[1], baseUrl).href;
         return imgTag.replace(/src=["'][^"']+["']/, `src="${absoluteUrl}"`);
       }
       return imgTag;
     });
   }
   ```

2. **链接处理与安全化**
   ```typescript
   private processLinksInContent(content: string, baseUrl: string): string {
     return content.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>/g, (linkTag, href) => {
       if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
         return linkTag; // 保留锚点和邮件链接
       }

       const absoluteUrl = href.startsWith('http') ? href : new URL(href, baseUrl).href;
       return linkTag.replace(/href=["'][^"']+["']/, `href="${absoluteUrl}" target="_blank" rel="noopener noreferrer"`);
     });
   }
   ```

3. **HTML 内容安全化**
   ```typescript
   private sanitizeHTML(content: string): string {
     const allowedTags = [
       'p', 'br', 'strong', 'em', 'u', 'strike',
       'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
       'ul', 'ol', 'li', 'blockquote',
       'img', 'a', 'code', 'pre'
     ];

     const allowedAttributes = {
       'a': ['href', 'title', 'target', 'rel'],
       'img': ['src', 'alt', 'title', 'width', 'height'],
       '*': ['class']
     };

     // 使用 DOMPurify 或自定义清理逻辑
     return this.cleanHTML(content, allowedTags, allowedAttributes);
   }
   ```

#### 3. PDF 生成模块 (src/lib/pdf-generator.ts)

**PDF 生成架构**
```typescript
class PDFGenerator {
  private templateEngine: TemplateEngine;
  private cache: Map<string, PDFCache>;

  constructor() {
    this.templateEngine = new TemplateEngine();
    this.cache = new Map();
  }

  async generatePDF(
    content: ArticleContent,
    options: PDFGenerationOptions = {}
  ): Promise<PDFResult> {
    try {
      // 生成缓存键
      const cacheKey = this.generateCacheKey(content, options);

      // 检查缓存
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      // 生成 HTML 模板
      const htmlTemplate = await this.generateHTMLTemplate(content, options);

      // 配置 PDF 选项
      const pdfOptions = this.configurePDFOptions(options);

      // 生成 PDF
      const pdfBuffer = await this.renderPDF(htmlTemplate, pdfOptions);

      // 保存到缓存
      const result: PDFResult = {
        buffer: pdfBuffer,
        filename: this.generateFilename(content.title),
        size: pdfBuffer.length,
        pages: await this.countPages(pdfBuffer)
      };

      this.cache.set(cacheKey, result);

      return result;
    } catch (error) {
      throw new Error(`PDF 生成失败: ${error.message}`);
    }
  }
}
```

**HTML 模板系统**
```typescript
private async generateHTMLTemplate(
  content: ArticleContent,
  options: PDFGenerationOptions
): Promise<string> {
  const templateData = {
    title: content.title,
    author: content.author,
    publishDate: content.publishDate ?
      new Date(content.publishDate).toLocaleDateString('zh-CN') :
      '未知日期',
    siteName: content.siteName,
    originalUrl: content.originalUrl,
    content: content.content,
    generatedDate: new Date().toLocaleDateString('zh-CN'),
    ...options.customTemplate
  };

  // 使用 Handlebars 或自定义模板引擎
  const template = await this.loadTemplate('article-template.hbs');
  return this.templateEngine.render(template, templateData);
}
```

**PDF 配置优化**
```typescript
private configurePDFOptions(options: PDFGenerationOptions): PDFOptions {
  return {
    format: options.format || 'A4',
    orientation: options.orientation || 'portrait',
    border: {
      top: options.margins?.top || '20mm',
      right: options.margins?.right || '20mm',
      bottom: options.margins?.bottom || '20mm',
      left: options.margins?.left || '20mm'
    },
    displayHeaderFooter: true,
    headerTemplate: this.generateHeaderTemplate(options),
    footerTemplate: this.generateFooterTemplate(options),
    printBackground: true,
    preferCSSPageSize: false,
    // 自定义样式
    type: 'pdf',
    timeout: 60000,
    scale: options.scale || 1.0,
    dpi: options.dpi || 96
  };
}
```

**页眉页脚模板**
```typescript
private generateHeaderTemplate(options: PDFGenerationOptions): string {
  return `
    <div style="font-size: 10px; padding: 5px 20px; border-bottom: 1px solid #ccc; color: #666;">
      <div style="display: flex; justify-content: space-between;">
        <span>ArticleVault - ${options.title || '网页文章转PDF'}</span>
        <span class="pageNumber"></span>
      </div>
    </div>
  `;
}

private generateFooterTemplate(options: PDFGenerationOptions): string {
  return `
    <div style="font-size: 9px; padding: 5px 20px; border-top: 1px solid #ccc; color: #999;">
      <div style="display: flex; justify-content: space-between;">
        <span>生成时间: ${new Date().toLocaleString('zh-CN')}</span>
        <span>第 <span class="pageNumber"></span> 页，共 <span class="totalPages"></span> 页</span>
      </div>
    </div>
  `;
}
```

#### 4. 富文本编辑器模块 (src/components/editor/TipTapEditor.tsx)

**编辑器配置与初始化**
```typescript
const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  pdfOptions,
  onContentChange,
  editable = true
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
          loading: 'lazy'
        },
        allowBase64: false
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'editor-link'
        }
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle']
      }),
      // 自定义扩展
      CustomPlaceholder.configure({
        placeholder: '开始编辑文章内容...'
      })
    ],
    content: content.content,
    editable,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onContentChange?.(newContent);

      // 自动保存
      debouncedSave(newContent);
    },
    onCreate: ({ editor }) => {
      // 编辑器初始化完成
      setupEditorCommands(editor);
    }
  });
```

**工具栏组件**
```typescript
const EditorToolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const tools = [
    {
      name: 'heading',
      icon: 'H1',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 })
    },
    {
      name: 'bold',
      icon: 'B',
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold')
    },
    {
      name: 'italic',
      icon: 'I',
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic')
    },
    // ... 更多工具
  ];

  return (
    <div className="editor-toolbar flex items-center space-x-2 p-2 border-b">
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={tool.command}
          className={`toolbar-btn ${tool.isActive() ? 'active' : ''}`}
          title={tool.name}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};
```

**实时预览功能**
```typescript
const EditorPreview: React.FC<{ content: string; pdfOptions: PDFGenerationOptions }> = ({
  content,
  pdfOptions
}) => {
  const [previewHTML, setPreviewHTML] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      try {
        const html = await generatePreviewTemplate(content, pdfOptions);
        setPreviewHTML(html);
      } catch (error) {
        console.error('预览生成失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedGenerate = debounce(generatePreview, 500);
    debouncedGenerate();
  }, [content, pdfOptions]);

  if (isLoading) {
    return <div className="preview-loading">生成预览中...</div>;
  }

  return (
    <div
      className="editor-preview"
      dangerouslySetInnerHTML={{ __html: previewHTML }}
    />
  );
};
```

### API 设计与数据流分析

#### RESTful API 设计原则

**1. URL 验证 API (/api/validate-url)**
- **功能**: 验证 URL 格式和页面可访问性
- **设计模式**: 快速验证，轻量级响应
- **错误处理**: 详细的错误分类和状态码

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<URLValidationResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: '仅支持 POST 请求'
    });
  }

  try {
    const { url } = req.body;

    // URL 格式验证
    if (!isValidURL(url)) {
      return res.status(400).json({
        success: false,
        error: 'URL 格式无效',
        details: '请提供完整的 http/https URL'
      });
    }

    // 基础可访问性检查
    const accessibility = await checkURLAccessibility(url);

    return res.status(200).json({
      success: true,
      data: {
        valid: true,
        accessible: accessibility.accessible,
        metadata: accessibility.metadata,
        estimatedSize: accessibility.estimatedSize,
        contentType: accessibility.contentType
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'URL 验证失败',
      details: error.message
    });
  }
}
```

**2. 内容抓取 API (/api/fetch)**
- **功能**: 完整的页面内容抓取和提取
- **设计模式**: 异步处理，状态跟踪
- **优化策略**: 缓存机制，超时控制

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchResponse>
) {
  const startTime = Date.now();

  try {
    const { url, options = {} } = req.body;

    // 生成请求 ID 用于跟踪
    const requestId = generateRequestId();

    // 初始化抓取器
    const scraper = new WebScraper({
      timeout: options.timeout || 30000,
      userAgent: options.userAgent
    });

    // 执行页面抓取
    const pageData = await scraper.scrapeWebpage(url);

    // 内容提取
    const extractor = new ContentExtractor();
    const articleContent = extractor.extractContent(
      pageData.html,
      url
    );

    if (!articleContent) {
      return res.status(422).json({
        success: false,
        error: '内容提取失败',
        requestId,
        processingTime: Date.now() - startTime
      });
    }

    // 缓存结果
    await cacheArticleContent(requestId, articleContent);

    return res.status(200).json({
      success: true,
      data: articleContent,
      requestId,
      processingTime: Date.now() - startTime,
      cached: false
    });

  } catch (error) {
    console.error('内容抓取失败:', error);
    return res.status(500).json({
      success: false,
      error: '服务端错误',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
```

**3. PDF 生成 API (/api/pdf)**
- **功能**: 生成 PDF 文档并返回下载链接
- **设计模式**: 异步任务处理，状态轮询
- **文件管理**: 临时文件，自动清理

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PDFResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: '仅支持 POST 请求'
    });
  }

  try {
    const { content, metadata, pdfOptions = {} } = req.body;

    // 生成唯一的文件 ID
    const fileId = generateFileId();
    const filename = generatePDFFilename(metadata.title);

    // PDF 生成
    const pdfGenerator = new PDFGenerator();
    const pdfResult = await pdfGenerator.generatePDF(
      { ...content, ...metadata },
      pdfOptions
    );

    // 保存到临时存储
    const filePath = await savePDFTemp(fileId, pdfResult.buffer);

    // 设置文件过期时间（1小时）
    await setFileExpiration(fileId, Date.now() + 3600000);

    return res.status(200).json({
      success: true,
      data: {
        fileId,
        filename,
        downloadUrl: `/api/pdf/download/${fileId}`,
        size: pdfResult.size,
        pages: pdfResult.pages,
        expiresAt: Date.now() + 3600000
      }
    });

  } catch (error) {
    console.error('PDF 生成失败:', error);
    return res.status(500).json({
      success: false,
      error: 'PDF 生成失败',
      details: error.message
    });
  }
}
```

#### 状态管理架构 (Zustand)

**编辑器状态设计**
```typescript
interface EditorState {
  // 基础状态
  content: ArticleContent | null;
  originalContent: ArticleContent | null;
  pdfOptions: PDFGenerationOptions;

  // UI 状态
  isLoading: boolean;
  isDirty: boolean;
  error: string | null;

  // 计算属性
  wordCount: number;
  readingTime: number;
  estimatedFileSize: number;

  // 操作历史
  history: {
    past: ArticleContent[];
    present: ArticleContent | null;
    future: ArticleContent[];
  };
}

interface EditorStore extends EditorState {
  // 状态更新方法
  setArticleContent: (content: ArticleContent) => void;
  updateContent: (content: string) => void;
  updatePdfOptions: (options: Partial<PDFGenerationOptions>) => void;

  // 历史管理
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;

  // 异步操作
  fetchArticle: (url: string) => Promise<void>;
  generatePDF: () => Promise<PDFResult>;

  // UI 控制
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
```

**状态管理实现**
```typescript
export const useEditorStore = create<EditorStore>(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        content: null,
        originalContent: null,
        pdfOptions: getDefaultPDFOptions(),
        isLoading: false,
        isDirty: false,
        error: null,
        history: { past: [], present: null, future: [] },

        // 计算属性
        get wordCount() {
          return calculateWordCount(get().content?.content || '');
        },

        get readingTime() {
          return calculateReadingTime(get().content?.content || '');
        },

        get estimatedFileSize() {
          return estimatePDFSize(get().content?.content || '');
        },

        // 状态更新方法
        setArticleContent: (content) => set((state) => ({
          content,
          originalContent: content,
          isDirty: false,
          error: null,
          history: {
            past: [],
            present: content,
            future: []
          }
        })),

        updateContent: (newContent) => set((state) => {
          if (!state.content) return state;

          const updatedContent = { ...state.content, content: newContent };

          return {
            content: updatedContent,
            isDirty: true,
            history: {
              past: [...state.history.past, state.content],
              present: updatedContent,
              future: []
            }
          };
        }),

        // 异步操作
        fetchArticle: async (url) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch('/api/fetch', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url })
            });

            const result = await response.json();

            if (!result.success) {
              throw new Error(result.error);
            }

            get().setArticleContent(result.data);
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },

        generatePDF: async () => {
          const { content, pdfOptions } = get();

          if (!content) {
            throw new Error('没有可生成的内容');
          }

          set({ isLoading: true, error: null });

          try {
            const response = await fetch('/api/pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content, metadata: content, pdfOptions })
            });

            const result = await response.json();

            if (!result.success) {
              throw new Error(result.error);
            }

            return result.data;
          } finally {
            set({ isLoading: false });
          }
        }
      }),
      {
        name: 'editor-store',
        partialize: (state) => ({
          content: state.content,
          pdfOptions: state.pdfOptions
        })
      }
    )
  )
);
```

### 数据流与错误处理

#### 完整的数据流程

```
用户输入 URL
    ↓
URL 格式验证 (前端)
    ↓
请求 /api/validate-url
    ↓
基础可访问性检查 (后端)
    ↓
请求 /api/fetch
    ↓
Playwright 页面抓取
    ↓
Mozilla Readability 内容提取
    ↓
内容处理和清理
    ↓
返回结构化数据
    ↓
前端状态更新 (Zustand)
    ↓
编辑器渲染
    ↓
用户编辑内容
    ↓
实时保存和预览更新
    ↓
请求 /api/pdf 生成
    ↓
PDF 文档生成
    ↓
文件存储和下载链接返回
    ↓
用户下载 PDF
```

#### 错误处理策略

**1. 分层错误处理**
```typescript
// 全局错误边界
class GlobalErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('全局错误:', error, errorInfo);

    // 发送错误报告到监控服务
    this.reportError(error, errorInfo);

    // 显示用户友好的错误页面
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackPage onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

// API 错误处理中间件
const handleAPIError = (error: Error, context: string) => {
  const errorReport = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // 记录到监控系统
  reportAPIError(errorReport);

  // 返回用户友好的错误信息
  return {
    success: false,
    error: getLocalizedErrorMessage(error),
    errorId: generateErrorId()
  };
};
```

**2. 重试机制**
```typescript
class RetryableOperation {
  async execute<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (attempt === maxRetries) {
          throw new Error(`操作失败，已重试 ${maxRetries} 次: ${error.message}`);
        }

        // 指数退避策略
        const backoffDelay = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }

    throw lastError;
  }
}
```

**3. 降级策略**
```typescript
const fetchArticleWithFallback = async (url: string): Promise<ArticleContent> => {
  try {
    // 主要方法：Playwright + Readability
    return await fetchWithPlaywright(url);
  } catch (primaryError) {
    console.warn('主要抓取方法失败，尝试备用方案:', primaryError);

    try {
      // 备用方法：简化抓取
      return await fetchWithSimplifiedMethod(url);
    } catch (fallbackError) {
      // 最后的降级：手动内容输入
      return {
        title: new URL(url).hostname,
        content: '<p>无法自动提取内容，请手动粘贴文章内容。</p>',
        originalUrl: url,
        // ... 默认元数据
      };
    }
  }
};
```

### 性能优化与部署策略

#### 前端性能优化

**1. 代码分割和懒加载**
```typescript
// 路由级别的代码分割
const EditorPage = dynamic(() => import('../pages/editor'), {
  loading: () => <LoadingSpinner />,
  ssr: false // 客户端渲染，减少服务器负载
});

// 组件级别的懒加载
const TipTapEditor = lazy(() => import('../components/editor/TipTapEditor'));
const PDFPreview = lazy(() => import('../components/preview/PDFPreview'));

// 条件加载
const loadEditorIfContent = () => {
  return content ? (
    <Suspense fallback={<LoadingSpinner />}>
      <TipTapEditor content={content} />
    </Suspense>
  ) : null;
};
```

**2. 图片优化**
```typescript
// Next.js Image 组件使用
const OptimizedImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

// 响应式图片处理
const processArticleImages = (content: string): string => {
  return content.replace(/<img[^>]+>/g, (imgTag) => {
    const src = imgTag.match(/src=["']([^"']+)["']/)?.[1];
    if (!src) return imgTag;

    // 生成不同尺寸的图片 URL
    const smallSrc = `${src}?w=400&q=80`;
    const mediumSrc = `${src}?w=800&q=85`;
    const largeSrc = `${src}?w=1200&q=90`;

    return `
      <picture>
        <source media="(max-width: 768px)" srcset="${smallSrc}">
        <source media="(max-width: 1200px)" srcset="${mediumSrc}">
        <img src="${largeSrc}" alt="${alt}" loading="lazy">
      </picture>
    `;
  });
};
```

**3. 缓存策略**
```typescript
// 浏览器缓存
const cacheArticleContent = async (url: string, content: ArticleContent) => {
  const cacheKey = `article_${hash(url)}`;
  const cacheData = {
    content,
    timestamp: Date.now(),
    url
  };

  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};

// 请求缓存
const getCachedArticle = (url: string): ArticleContent | null => {
  const cacheKey = `article_${hash(url)}`;
  const cached = localStorage.getItem(cacheKey);

  if (!cached) return null;

  const { content, timestamp } = JSON.parse(cached);

  // 缓存有效期 1 小时
  if (Date.now() - timestamp > 3600000) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  return content;
};
```

#### 后端性能优化

**1. Playwright 优化**
```typescript
class OptimizedWebScraper {
  private browserPool: Browser[] = [];
  private maxPoolSize = 3;

  async getBrowser(): Promise<Browser> {
    // 从池中获取可用的浏览器实例
    const availableBrowser = this.browserPool.find(b => b.isConnected());

    if (availableBrowser) {
      return availableBrowser;
    }

    // 创建新的浏览器实例
    if (this.browserPool.length < this.maxPoolSize) {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      });

      this.browserPool.push(browser);
      return browser;
    }

    // 等待可用实例
    return this.waitForAvailableBrowser();
  }

  async scrapeWithOptimization(url: string): Promise<PageData> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    try {
      // 优化页面加载
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const resourceType = req.resourceType();
        const allowedTypes = ['document', 'script', 'xhr', 'fetch'];

        if (allowedTypes.includes(resourceType)) {
          req.continue();
        } else {
          req.abort();
        }
      });

      // 等待关键内容加载
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      // 等待动态内容
      await page.waitForTimeout(2000);

      return await this.extractPageData(page, url);
    } finally {
      await page.close();
    }
  }
}
```

**2. PDF 生成优化**
```typescript
class OptimizedPDFGenerator {
  private templateCache = new Map<string, string>();

  async generatePDFFast(
    content: ArticleContent,
    options: PDFGenerationOptions
  ): Promise<PDFResult> {
    // 生成模板缓存键
    const templateKey = `${options.template}_${options.format}`;

    // 检查模板缓存
    let htmlTemplate = this.templateCache.get(templateKey);
    if (!htmlTemplate) {
      htmlTemplate = await this.compileTemplate(options.template);
      this.templateCache.set(templateKey, htmlTemplate);
    }

    // 优化 HTML 生成
    const optimizedHTML = this.optimizeHTMLForPDF(content, htmlTemplate);

    // 并行处理多个小文档
    if (content.wordCount < 1000) {
      return this.generatePDFInParallel(optimizedHTML, options);
    }

    // 大文档分块处理
    return this.generatePDFInChunks(optimizedHTML, options);
  }

  private optimizeHTMLForPDF(content: ArticleContent, template: string): string {
    // 移除不必要的 CSS
    const optimizedContent = content.content
      .replace(/<script[^>]*>.*?<\/script>/gs, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/style="[^"]*\bbackground-image:[^"]*"/g, '');

    // 压缩 CSS
    const optimizedCSS = this.compressCSS(template);

    return template
      .replace('{{content}}', optimizedContent)
      .replace('{{styles}}', optimizedCSS);
  }
}
```

### 部署配置与监控

#### Vercel 部署优化

**1. next.config.js 配置**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用实验性功能
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['playwright']
  },

  // 图片优化配置
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // 构建优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true
  },

  // 压缩配置
  compress: true,

  // 重定向配置
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ];
  },

  // 头部配置
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=86400' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

**2. 环境变量配置**
```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://articlevault.vercel.app
NEXT_PUBLIC_API_URL=https://articlevault.vercel.app/api

# Playwright 配置
PLAYWRIGHT_BROWSERS_PATH=0
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true

# PDF 生成配置
PDF_CACHE_TTL=3600
PDF_MAX_FILE_SIZE=50MB

# 监控和分析
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
SENTRY_DSN=your_sentry_dsn

# 性能配置
API_TIMEOUT=30000
MAX_CONCURRENT_REQUESTS=10
```

**3. Vercel 配置文件**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "functions": {
    "src/pages/api/*.ts": {
      "maxDuration": 30
    }
  },
  "routes": [
    {
      "src": "/api/pdf/download/(.*)",
      "dest": "/api/pdf/download/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app-url",
    "PLAYWRIGHT_BROWSERS_PATH": "0"
  }
}
```

#### 监控和日志

**1. 错误监控 (Sentry)**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,

  // 性能监控
  beforeSend(event) {
    // 过滤敏感信息
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.value?.includes('password')) {
        return null;
      }
    }
    return event;
  }
});

// 自定义错误报告
const reportCustomError = (error: Error, context: Record<string, any>) => {
  Sentry.withScope((scope) => {
    scope.setContext('custom_context', context);
    Sentry.captureException(error);
  });
};
```

**2. 性能监控**
```typescript
// API 性能监控
const withPerformanceMonitoring = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const startTime = Date.now();
    const requestId = generateRequestId();

    // 记录请求开始
    console.log(`[${requestId}] ${req.method} ${req.url} - 开始处理`);

    try {
      const result = await handler(req, res);

      const processingTime = Date.now() - startTime;
      console.log(`[${requestId}] 处理完成 - 耗时: ${processingTime}ms`);

      // 发送性能数据到监控服务
      sendPerformanceMetrics({
        requestId,
        endpoint: req.url,
        method: req.method,
        processingTime,
        status: res.statusCode
      });

      return result;
    } catch (error) {
      const processingTime = Date.now() - startTime;
      console.error(`[${requestId}] 处理失败 - 耗时: ${processingTime}ms`, error);

      // 发送错误指标
      sendErrorMetrics({
        requestId,
        endpoint: req.url,
        method: req.method,
        error: error.message,
        processingTime
      });

      throw error;
    }
  };
};
```

### 总结

ArticleVault 项目展现了现代 Web 应用的完整技术栈和最佳实践：

#### 技术亮点
1. **全栈 TypeScript**: 类型安全贯穿前后端
2. **现代框架组合**: Next.js + React + TailwindCSS
3. **智能内容处理**: Playwright + Readability 的强大组合
4. **高质量文档生成**: 专业的 PDF 生成方案
5. **优秀的用户体验**: 富文本编辑器 + 实时预览

#### 架构优势
1. **模块化设计**: 清晰的职责分离和组件复用
2. **类型驱动开发**: 完整的 TypeScript 类型系统
3. **错误处理**: 多层次的错误处理和降级策略
4. **性能优化**: 前后端全面的性能优化策略
5. **可维护性**: 良好的代码组织和文档

#### 业务价值
1. **功能完整性**: 从内容抓取到 PDF 生成的一站式解决方案
2. **用户友好**: 直观的操作界面和丰富的自定义选项
3. **技术先进性**: 采用最新的技术栈和最佳实践
4. **扩展性**: 模块化架构便于功能扩展和维护
5. **生产就绪**: 完整的部署配置和监控体系

这个项目不仅是一个实用的工具，更是现代全栈 Web 开发的优秀示例，展现了从需求分析到技术实现、从性能优化到部署运维的完整开发流程。



