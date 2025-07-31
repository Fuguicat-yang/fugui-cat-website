/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // GitHub Pages 配置
  basePath: process.env.NODE_ENV === 'production' ? '/fugui-cat-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/fugui-cat-website' : '',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 