import { useState } from 'react'

interface GitHubUploadProps {
  onUploadSuccess: (imageUrl: string) => void
  onUploadError: (error: string) => void
}

export default function GitHubUpload({ onUploadSuccess, onUploadError }: GitHubUploadProps) {
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
      // 将文件转换为Base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string
        const base64Content = base64Data.split(',')[1]

        // 生成文件名
        const timestamp = Date.now()
        const fileName = `image_${timestamp}.${file.name.split('.').pop()}`

        // GitHub API 配置 - 使用私有仓库保护隐私
        const owner = 'Fuguicat-yang' // 你的GitHub用户名
        const repo = 'fugui-private-photos' // 建议创建私有仓库
        const path = `images/${fileName}` // 图片存储路径
        const token = 'YOUR_GITHUB_TOKEN' // 需要替换为你的GitHub token

        // 检查文件大小，决定是否使用LFS
        const useLFS = file.size > 50 * 1024 * 1024 // 50MB以上使用LFS

        if (useLFS) {
          // 使用Git LFS API（需要先在仓库中配置LFS）
          const lfsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
            method: 'POST',
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: base64Content,
              encoding: 'base64',
            }),
          })

          if (lfsResponse.ok) {
            const lfsData = await lfsResponse.json()
            // 这里需要额外的LFS配置步骤
            onUploadError('大文件上传需要配置Git LFS，请联系管理员')
            return
          }
        }

        // 普通文件上传
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add image: ${fileName}`,
            content: base64Content,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          // 构建原始图片URL
          const imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`
          onUploadSuccess(imageUrl)
          setUploadProgress(100)
        } else {
          onUploadError('上传失败，请检查GitHub配置')
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      onUploadError('网络错误，请检查网络连接')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
          id="github-upload"
        />
        <label htmlFor="github-upload" className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-4xl">🐙</div>
            <div className="text-lg font-medium text-gray-700">
              {isUploading ? '上传到GitHub...' : '上传到GitHub'}
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
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">上传进度: {uploadProgress}%</div>
        </div>
      )}
    </div>
  )
} 