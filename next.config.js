/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // GitHub Pages 配置
  basePath: process.env.NODE_ENV === 'production' ? '/fugui-cat-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/fugui-cat-website' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'i.ibb.co',        // ImgBB
      'i.imgur.com',     // Imgur
      's2.loli.net',     // SM.MS
      'cdn.jsdelivr.net', // 其他CDN
      'user-images.githubusercontent.com' // GitHub
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
}

module.exports = nextConfig 