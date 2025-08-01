import Image from 'next/image'
import { useState } from 'react'

interface QQImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
}

export default function QQImage({ 
  src, 
  alt, 
  width = 300, 
  height = 320, 
  className = "",
  fallbackSrc = "/placeholder-image.jpg"
}: QQImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 检查是否是QQ相册链接
  const isQQImage = src.includes('qzone.qq.com') || src.includes('qlogo.cn')

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  const handleQQImageLoad = async () => {
    if (isQQImage && !isLoading) {
      setIsLoading(true)
      try {
        // 使用代理API
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(src)}`
        setImgSrc(proxyUrl)
      } catch (error) {
        console.error('Failed to load QQ image:', error)
        setImgSrc(fallbackSrc)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isQQImage) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">⏳</div>
              <div className="text-sm">加载中...</div>
            </div>
          </div>
        )}
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full"
          onError={handleError}
          onLoad={handleQQImageLoad}
          loading="lazy"
        />
        {hasError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">🖼️</div>
              <div className="text-sm">图片加载失败</div>
              <div className="text-xs mt-1">QQ相册图片可能无法访问</div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      onError={handleError}
      priority={false}
    />
  )
} 