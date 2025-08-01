import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface Photo {
  id: number
  title: string
  date: string
  description: string
  likes: number
  image: string
  source?: 'aliyun' | 'qq' | 'local'
}

export default function PhotoAlbum() {
  // 计算富贵的年龄
  const calculateAge = () => {
    const birthday = new Date('2021-11-01')
    const today = new Date()
    
    let years = today.getFullYear() - birthday.getFullYear()
    let months = today.getMonth() - birthday.getMonth()
    
    if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
      years--
      months += 12
    }
    
    if (months < 0) {
      months += 12
    }
    
    if (years === 0) {
      return `${months}个月`
    } else if (months === 0) {
      return `${years}岁`
    } else {
      return `${years}岁${months}个月`
    }
  }

  const age = calculateAge()

  // 从localStorage加载照片数据
  const [photos, setPhotos] = useState<Photo[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSource, setFilterSource] = useState<string>('all')

  // 初始化数据
  useEffect(() => {
    const savedPhotos = localStorage.getItem('fugui-photos')
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos))
    } else {
      // 默认照片数据
      const defaultPhotos: Photo[] = [
        {
          id: 1,
          title: '富贵的第一天',
          date: '2021-11-01',
          description: '刚出生的小富贵，还很小很小',
          likes: 15,
          image: 'fugui-photo-1.jpg',
          source: 'local'
        },
        {
          id: 2,
          title: '第一次睁开眼睛',
          date: '2021-12-01',
          description: '好奇地打量着这个世界',
          likes: 23,
          image: 'fugui-photo-2.jpeg',
          source: 'local'
        },
        {
          id: 3,
          title: '晒太阳的富贵',
          date: '2022-03-15',
          description: '在窗台上享受阳光',
          likes: 31,
          image: 'fugui-photo-3.jpeg',
          source: 'local'
        },
        {
          id: 4,
          title: '六个月生日',
          date: '2022-05-01',
          description: '已经长成了一只漂亮的小猫咪',
          likes: 28,
          image: 'fugui-photo-4.jpeg',
          source: 'local'
        }
      ]
      setPhotos(defaultPhotos)
      localStorage.setItem('fugui-photos', JSON.stringify(defaultPhotos))
    }
  }, [])

  // 保存数据到localStorage
  const savePhotos = (newPhotos: Photo[]) => {
    setPhotos(newPhotos)
    localStorage.setItem('fugui-photos', JSON.stringify(newPhotos))
  }

  // 添加照片
  const handleAddPhoto = () => {
    if (!editingPhoto?.title || !editingPhoto?.image || !editingPhoto?.date) {
      alert('请填写完整信息')
      return
    }

    const newPhoto: Photo = {
      ...editingPhoto,
      id: Date.now(),
      likes: 0
    }

    savePhotos([...photos, newPhoto])
    setEditingPhoto(null)
    setShowModal(false)
  }

  // 编辑照片
  const handleEditPhoto = (photo: Photo) => {
    setEditingPhoto(photo)
    setShowModal(true)
  }

  // 更新照片
  const handleUpdatePhoto = () => {
    if (!editingPhoto?.title || !editingPhoto?.image || !editingPhoto?.date) {
      alert('请填写完整信息')
      return
    }

    const updatedPhotos = photos.map(p => 
      p.id === editingPhoto.id ? editingPhoto : p
    )
    savePhotos(updatedPhotos)
    setEditingPhoto(null)
    setShowModal(false)
  }

  // 删除照片
  const handleDeletePhoto = (id: number) => {
    if (confirm('确定要删除这张照片吗？')) {
      const updatedPhotos = photos.filter(p => p.id !== id)
      savePhotos(updatedPhotos)
    }
  }

  // 点赞功能
  const handleLike = (id: number) => {
    const updatedPhotos = photos.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    )
    savePhotos(updatedPhotos)
  }

  // 筛选照片
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = filterSource === 'all' || photo.source === filterSource
    return matchesSearch && matchesSource
  })

  // 导出数据
  const handleExport = () => {
    const dataStr = JSON.stringify(photos, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `fugui-photos-${format(new Date(), 'yyyy-MM-dd')}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Head>
        <title>爱的相册 - 富贵的成长记录</title>
        <meta name="description" content="珍藏富贵猫咪的每一个美好瞬间" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        {/* 头部 */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-3">
                <Link href="/" className="text-pink-600 hover:text-pink-800">
                  <span className="text-2xl">←</span>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-pink-800">爱的相册</h1>
                  <p className="text-pink-600">珍藏富贵的每一个美好瞬间</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📸</span>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-pink-500">{photos.length}</div>
              <div className="text-gray-700">总照片数</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-pink-500">
                {photos.reduce((sum, photo) => sum + photo.likes, 0)}
              </div>
              <div className="text-gray-700">总点赞数</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-pink-500">{age}</div>
              <div className="text-gray-700">当前年龄</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-pink-500">3年</div>
              <div className="text-gray-700">记录时长</div>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="搜索照片标题或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">全部来源</option>
                  <option value="aliyun">阿里云</option>
                  <option value="qq">QQ空间</option>
                  <option value="local">本地</option>
                </select>
                <button
                  onClick={() => {
                    setEditingPhoto({
                      id: 0,
                      title: '',
                      date: format(new Date(), 'yyyy-MM-dd'),
                      description: '',
                      likes: 0,
                      image: '',
                      source: 'aliyun'
                    })
                    setShowModal(true)
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>📸</span>
                  <span>添加照片</span>
                </button>
                <button
                  onClick={handleExport}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  📥 导出
                </button>
              </div>
            </div>
          </div>

          {/* 照片网格 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-pink-800">富贵的照片相册</h2>
              <div className="text-sm text-gray-500">
                共 {filteredPhotos.length} 张照片
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
                  <div className="relative aspect-square sm:aspect-w-3 sm:aspect-h-2 bg-pink-100">
                    <Image 
                      src={photo.image}
                      alt={photo.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                      priority
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        photo.source === 'aliyun' ? 'bg-blue-100 text-blue-800' :
                        photo.source === 'qq' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {photo.source === 'aliyun' ? '阿里云' : 
                         photo.source === 'qq' ? 'QQ空间' : '本地'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-pink-800">{photo.title}</h3>
                      <div className="flex items-center space-x-1 text-pink-500">
                        <button 
                          onClick={() => handleLike(photo.id)}
                          className="hover:text-pink-700 transition-colors"
                        >
                          ❤️ {photo.likes}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-pink-600">📅 {photo.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{photo.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPhoto(photo)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        ✏️ 编辑
                      </button>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ 删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <p className="text-gray-500">没有找到照片</p>
                <button
                  onClick={() => {
                    setEditingPhoto({
                      id: 0,
                      title: '',
                      date: format(new Date(), 'yyyy-MM-dd'),
                      description: '',
                      likes: 0,
                      image: '',
                      source: 'aliyun'
                    })
                    setShowModal(true)
                  }}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  添加第一张照片
                </button>
              </div>
            )}
          </div>

          {/* 时间线 */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-pink-800 mb-4">成长时间线</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <div className="font-medium text-pink-800">出生</div>
                  <div className="text-sm text-pink-600">2021-11-01 - 富贵来到了这个世界</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <div className="font-medium text-pink-800">第一次睁开眼睛</div>
                  <div className="text-sm text-pink-600">2021-12-01 - 好奇地打量着这个世界</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <div className="font-medium text-pink-800">开始吃猫粮</div>
                  <div className="text-sm text-pink-600">2022-01-15 - 从母乳转向猫粮</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <div className="font-medium text-pink-800">一岁生日</div>
                  <div className="text-sm text-pink-600">2022-11-01 - 已经是一只成年猫咪了</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 添加/编辑照片模态框 */}
        {showModal && editingPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-pink-800 mb-4">
                {editingPhoto.id === 0 ? '添加照片' : '编辑照片'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">照片标题</label>
                  <input
                    type="text"
                    value={editingPhoto.title}
                    onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
                    placeholder="例如：富贵的第一天"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">拍摄日期</label>
                  <input
                    type="date"
                    value={editingPhoto.date}
                    onChange={(e) => setEditingPhoto({...editingPhoto, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">照片来源</label>
                  <select
                    value={editingPhoto.source || 'aliyun'}
                    onChange={(e) => setEditingPhoto({...editingPhoto, source: e.target.value as 'aliyun' | 'qq' | 'local'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="aliyun">阿里云OSS</option>
                    <option value="qq">QQ空间</option>
                    <option value="local">本地存储</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">照片URL</label>
                  <input
                    type="url"
                    value={editingPhoto.image}
                    onChange={(e) => setEditingPhoto({...editingPhoto, image: e.target.value})}
                    placeholder="https://your-bucket.oss-cn-region.aliyuncs.com/photo.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    支持阿里云OSS、QQ空间等云存储链接
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea
                    value={editingPhoto.description}
                    onChange={(e) => setEditingPhoto({...editingPhoto, description: e.target.value})}
                    placeholder="记录这个美好瞬间..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingPhoto(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  取消
                </button>
                <button
                  onClick={editingPhoto.id === 0 ? handleAddPhoto : handleUpdatePhoto}
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
                >
                  {editingPhoto.id === 0 ? '添加' : '更新'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 