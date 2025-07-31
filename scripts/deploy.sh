#!/bin/bash

# 部署脚本
echo "🚀 开始部署富贵猫咪网站到GitHub Pages..."

# 构建项目
echo "📦 构建项目..."
npm run build

# 创建.nojekyll文件
echo "📝 创建.nojekyll文件..."
touch out/.nojekyll

# 提交更改
echo "💾 提交更改..."
git add out/
git commit -m "Deploy to GitHub Pages"

# 推送到gh-pages分支
echo "🚀 推送到GitHub Pages..."
git subtree push --prefix out origin gh-pages

echo "✅ 部署完成！"
echo "🌐 网站地址: https://你的用户名.github.io/fugui-cat-website" 