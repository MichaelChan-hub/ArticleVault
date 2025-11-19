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