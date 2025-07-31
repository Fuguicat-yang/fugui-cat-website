import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '富贵的成长记录',
  description: '记录富贵猫咪的成长点滴',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gradient-to-br from-cat-50 to-cat-100 min-h-screen">
        {children}
      </body>
    </html>
  )
} 