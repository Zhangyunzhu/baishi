# 🎨 白石后人艺术馆 | Qi Baishi Art Gallery

<div align="center">

一个展示齐白石大师真实作品的现代化数字艺术馆

*A modern digital art gallery showcasing authentic works by Master Qi Baishi*

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-0055FF?style=flat&logo=framer)](https://www.framer.com/motion/)

</div>

## ✨ 项目特色

### 🖼️ 真实作品展示
- **8幅藏品**: 群虾戏水图、虾蟹图、喇叭花图、富翁梅花图等齐白石经典作品
- **3幅轮播**: 渔村晚归、威风凛凛、梅花傲雪等代表作品
- **高清图片**: 所有图片均为高质量原作扫描

### 📚 文化内容丰富
- **8个人生故事**: 从木匠到画家的传奇、衰年变法的勇气等正能量故事
- **详细作品介绍**: 每幅作品都有专业的艺术解读和历史背景
- **文化传承**: 数字化保存和传播齐白石艺术瑰宝

### 💻 现代化技术
- **响应式设计**: 完美适配桌面、平板、手机等各种设备
- **流畅动画**: 使用Framer Motion实现优雅的过渡效果
- **自定义光标**: 独特的毛笔光标设计，增强艺术氛围
- **性能优化**: 图片懒加载、代码分割等优化技术

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/YOUR_USERNAME/baishi.git
   cd baishi
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问网站**
   打开浏览器访问 `http://localhost:3000`

## 📁 项目结构

```
├── public/
│   └── images/           # 齐白石作品图片
│       ├── artworks/     # 藏品图片 (8张)
│       ├── hero/         # 轮播图片 (3张)
│       └── stories/      # 故事配图 (8张)
├── src/
│   ├── components/       # React组件
│   │   ├── SectionHero.tsx      # 首页轮播
│   │   ├── SectionGallery.tsx   # 藏品画廊
│   │   ├── SectionStories.tsx   # 故事板块
│   │   ├── SectionAbout.tsx     # 关于艺术馆
│   │   ├── Navigation.tsx       # 导航栏
│   │   └── CustomCursor.tsx     # 自定义光标
│   ├── types/           # TypeScript类型定义
│   └── config/          # 配置文件
├── scripts/             # 工具脚本
│   ├── replace-images.js        # 图片替换脚本
│   ├── simple-download.js       # 图片下载脚本
│   └── fill-missing-images.js   # 图片填补脚本
└── docs/               # 文档文件
```

## 🛠️ 可用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build           # 构建生产版本
npm run preview         # 预览构建结果

# 图片管理
npm run download-images  # 下载示例图片
npm run replace-images   # 替换自定义图片
npm run fill-images     # 填补缺失图片
npm run setup-images    # 完整图片设置
```

## 🎨 自定义图片

如果您有齐白石的其他作品图片需要替换：

1. 将图片放入项目根目录的 `图片/` 文件夹
2. 运行替换命令：`npm run replace-images`
3. 脚本会自动重命名并分类图片到正确位置

## 🌐 部署

### Vercel 部署（推荐）
```bash
npm install -g vercel
vercel
```

### Netlify 部署
```bash
npm run build
# 将 dist 文件夹拖拽到 Netlify
```

### 传统服务器
```bash
npm run build
# 将 dist 文件夹内容上传到服务器
```

## 🎯 技术栈

- **前端框架**: React 18+ with TypeScript
- **构建工具**: Vite 5+
- **样式方案**: Tailwind CSS
- **动画库**: Framer Motion
- **图标库**: Lucide React
- **字体**: 自定义中文书法字体

## 📄 许可证

本项目采用 Apache-2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/baishi/issues)

---

<div align="center">

**传承艺术瑰宝，弘扬文化精神**

*Preserving artistic treasures, promoting cultural spirit*

Made with ❤️ for art and culture

</div>
