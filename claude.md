# ArticleVault - 网页文章转 PDF 工具站

## 项目概述

**项目名称**: ArticleVault
**项目类型**: 在线工具网站
**核心功能**: 将网页文章转换为高质量 PDF 文档

### 项目目标

- 提供简单易用的网页文章转 PDF 服务
- 支持可视化编辑和自定义 PDF 样式
- 自动提取和保留文章元信息（标题、作者、发布时间等）
- 在生成的 PDF 中自动添加原文链接和来源信息
- 提供响应式设计，支持移动端使用
- 实现高性能的页面抓取和内容提取

## 技术栈

### 前端技术
- **Next.js 14**: React 框架，支持 SSR/SSG
- **TypeScript**: 类型安全的 JavaScript
- **TailwindCSS**: 原子化 CSS 框架
- **React Hook Form**: 表单管理
- **Zustand**: 轻量级状态管理
- **React PDF**: PDF 预览和编辑

### 后端技术
- **Next.js API Routes**: 服务端 API
- **Playwright**: 浏览器自动化和页面抓取
- **Mozilla Readability**: 内容提取算法
- **Puppeteer**: PDF 生成（备选方案）

### 部署和工具
- **Vercel**: 主要部署平台
- **Docker**: 容器化部署选项
- **Redis**: 缓存服务
- **Cloudflare**: CDN 和安全防护

## 功能模块

### 1. URL 输入模块
- URL 验证和格式化
- 网站预览和基本信息提取
- 历史记录功能

### 2. 内容抓取模块
- 使用 Playwright 抓取网页内容
- 支持动态渲染页面
- 处理反爬虫机制
- 错误重试机制

### 3. 内容提取模块
- 基于 Readability 算法提取正文
- 提取文章元信息（标题、作者、发布时间、描述）
- 图片和链接处理
- 内容清理和格式化

### 4. 可视化编辑器
- 富文本编辑功能
- 样式自定义（字体、字号、颜色、间距）
- 图片调整和删除
- 页面布局预览
- 添加水印和页眉页脚

### 5. PDF 生成模块
- 高质量 PDF 导出
- 自动添加来源信息
- 自定义页面尺寸和方向
- 批量处理支持

### 6. 用户界面模块
- 响应式设计
- 拖拽上传支持
- 进度指示器
- 错误提示和反馈

## 页面结构

### 主要页面
1. **Home (/)** - 首页和主要工具界面
2. **FAQ (/faq)** - 常见问题解答
3. **About (/about)** - 关于我们
4. **Privacy (/privacy)** - 隐私政策
5. **Terms (/terms)** - 服务条款
6. **Contact (/contact)** - 联系方式

### Home 页面布局
```
Header (导航栏)
├── Logo
├── 导航链接 (FAQ, About, Contact)
└── CTA 按钮

Hero Section
├── 标题和描述
├── URL 输入框
└── 转换按钮

工具界面
├── URL 输入区域
├── 内容预览区域
├── 编辑器面板
└── PDF 生成选项

Features Section (功能特点)
├── 快速转换
├── 高质量输出
├── 自定义编辑
└── 免费使用

Footer
├── 链接集合
├── 社交媒体
└── 版权信息
```

## SEO 要求

### 技术优化
- Next.js SSG/SSR 优化首屏加载
- 图片懒加载和 WebP 格式
- 最小化 JavaScript 包大小
- 实施代码分割

### 内容优化
- 语义化 HTML 结构
- 合理的标题层级 (H1-H6)
- 丰富的 Meta 标签
- 结构化数据 (JSON-LD)

### 性能指标
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Core Web Vitals 评分 > 90

## API 设计

### 1. 内容抓取 API
```
POST /api/fetch
Body: { url: string }
Response: {
  success: boolean
  data?: {
    title: string
    author: string
    publishDate: string
    content: string
    images: string[]
    originalUrl: string
  }
  error?: string
}
```

### 2. PDF 生成 API
```
POST /api/generate-pdf
Body: {
  content: string
  metadata: ArticleMetadata
  styles: PDFOptions
}
Response: {
  success: boolean
  pdfUrl?: string
  error?: string
}
```

### 3. URL 验证 API
```
POST /api/validate-url
Body: { url: string }
Response: {
  valid: boolean
  accessible: boolean
  metadata?: BasicPageInfo
}
```

### 4. 统计分析 API
```
POST /api/analytics
Body: {
  action: string
  metadata: object
}
```

## 数据流说明

### 转换流程
```
1. 用户输入 URL
   ↓
2. 前端验证 URL 格式
   ↓
3. 调用 /api/validate-url 检查可访问性
   ↓
4. 调用 /api/fetch 抓取和提取内容
   ↓
5. 前端渲染内容预览
   ↓
6. 用户在编辑器中调整内容
   ↓
7. 调用 /api/generate-pdf 生成 PDF
   ↓
8. 返回 PDF 下载链接
```

### 错误处理
- 网络超时重试机制
- 内容提取失败回退方案
- 用户友好的错误提示
- 详细的服务端错误日志

## 文件结构建议

```
article-vault/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── (pages)/           # 路由组
│   │   │   ├── page.tsx       # Home
│   │   │   ├── faq/
│   │   │   ├── about/
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   └── contact/
│   │   └── api/               # API 路由
│   │       ├── fetch/
│   │       ├── generate-pdf/
│   │       ├── validate-url/
│   │       └── analytics/
│   ├── components/            # React 组件
│   │   ├── ui/               # 基础 UI 组件
│   │   ├── editor/           # 编辑器组件
│   │   ├── preview/          # 预览组件
│   │   └── layout/           # 布局组件
│   ├── lib/                  # 工具函数
│   │   ├── readability.ts    # 内容提取
│   │   ├── playwright.ts     # 页面抓取
│   │   ├── pdf-generator.ts  # PDF 生成
│   │   └── validators.ts     # 验证函数
│   ├── hooks/                # React Hooks
│   ├── stores/               # Zustand 状态
│   ├── types/                # TypeScript 类型
│   └── styles/               # 样式文件
├── public/                   # 静态资源
├── docs/                     # 项目文档
├── tests/                    # 测试文件
├── .env.local               # 环境变量
├── next.config.js           # Next.js 配置
├── tailwind.config.js       # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
├── package.json            # 依赖管理
└── README.md               # 项目说明
```

## 部署方式

### 主要部署 (Vercel)
1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动部署和 CI/CD
4. 自定义域名配置

### 环境变量配置
```env
# Playwright 浏览器配置
PLAYWRIGHT_BROWSERS_PATH=0

# Redis 缓存 (可选)
REDIS_URL=redis://localhost:6379

# 分析服务
ANALYTICS_ID=your_analytics_id

# 安全密钥
NEXTAUTH_SECRET=your_secret_key

# 限制设置
MAX_FILE_SIZE=10MB
RATE_LIMIT_MAX=100
```

### Docker 部署 (可选)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 性能优化
- CDN 静态资源分发
- 图片自动优化
- Gzip/Brotli 压缩
- 缓存策略配置
- 数据库查询优化

## 开发计划

### Phase 1: 核心功能 (2-3周)
- [ ] 基础项目搭建
- [ ] URL 输入和验证
- [ ] 页面抓取功能
- [ ] 内容提取实现
- [ ] 基础 PDF 生成

### Phase 2: 编辑器功能 (2-3周)
- [ ] 可视化编辑器
- [ ] 样式自定义
- [ ] 实时预览
- [ ] 响应式优化

### Phase 3: 优化和部署 (1-2周)
- [ ] 性能优化
- [ ] SEO 实施
- [ ] 测试和 Bug 修复
- [ ] 生产环境部署

---

*此文档将作为项目开发的指导蓝图，随着开发进展持续更新和完善。*