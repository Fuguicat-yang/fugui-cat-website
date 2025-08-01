import { useState } from 'react'

interface ImageUploadProps {
  onUploadSuccess: (imageUrl: string) => void
  onUploadError: (error: string) => void
}

export default function ImageUpload({ onUploadSuccess, onUploadError }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      onUploadError('请选择图片文件')
      return
    }

    // 检查文件大小（限制50MB，支持单反照片）
    if (file.size > 50 * 1024 * 1024) {
      onUploadError('图片大小不能超过50MB')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // 使用ImgBB API（免费）
      const formData = new FormData()
      formData.append('image', file)

      // 这里需要你的ImgBB API key，可以免费获取
      // 访问 https://api.imgbb.com/ 注册获取
      const apiKey = 'YOUR_IMGBB_API_KEY' // 需要替换为你的API key
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        onUploadSuccess(data.data.url)
        setUploadProgress(100)
      } else {
        onUploadError('上传失败，请重试')
      }
    } catch (error) {
      onUploadError('网络错误，请检查网络连接')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <div className="text-lg font-medium text-gray-700">
              {isUploading ? '上传中...' : '点击上传图片'}
            </div>
            <div className="text-sm text-gray-500">
              支持 JPG、PNG、GIF 格式，最大 50MB（支持单反照片）
            </div>
          </div>
        </label>
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">上传进度: {uploadProgress}%</div>
        </div>
      )}
    </div>
  )
} 