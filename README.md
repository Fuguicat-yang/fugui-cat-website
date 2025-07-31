# 富贵的猫咪成长记录网站

一个专门为富贵猫咪设计的成长记录网站，记录富贵的每一个美好瞬间。

## 🌟 功能特点

- **自动年龄计算** - 基于生日自动计算富贵的当前年龄
- **设计感照片展示** - 4张照片的拼贴式展示，展示成长历程
- **疫苗记录本** - 记录富贵的疫苗接种历程
- **爱的相册** - 珍藏富贵的每一个美好瞬间
- **响应式设计** - 支持手机、平板、电脑等多种设备

## 🛠️ 技术栈

- **Next.js 12** - React框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 部署到GitHub Pages

1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/fugui-cat-website.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入GitHub仓库设置
   - 找到"Pages"选项
   - 选择"GitHub Actions"作为部署源

3. **自动部署**
   - 每次推送到main分支时，GitHub Actions会自动构建并部署
   - 网站将部署到：`https://你的用户名.github.io/fugui-cat-website`

## 📁 项目结构

```
fugui-cat-website/
├── pages/                 # 页面文件
│   ├── index.tsx         # 主页
│   ├── vaccine-record.tsx # 疫苗记录页
│   └── photo-album.tsx   # 相册页
├── public/               # 静态资源
│   ├── fugui-photo-1.jpg
│   ├── fugui-photo-2.jpeg
│   ├── fugui-photo-3.jpeg
│   └── fugui-photo-4.jpeg
├── components/           # 组件文件
├── styles/              # 样式文件
└── .github/workflows/   # GitHub Actions配置
```

## 🎨 自定义

### 修改富贵信息
- 生日：在 `pages/index.tsx` 中修改 `birthday` 变量
- 照片：替换 `public/` 目录中的照片文件

### 修改样式
- 主题色：在 `tailwind.config.js` 中修改颜色配置
- 布局：在对应的页面文件中修改JSX结构

## 📸 照片要求

- 建议尺寸：300x320像素
- 格式：JPG或JPEG
- 文件大小：建议小于500KB

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

---

**富贵** - 在爱中长大的小猫咪 🐱✨ 