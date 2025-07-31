'use client'

import { Camera, Heart, Calendar } from 'lucide-react'

export default function PhotoGallery() {
  const photos = [
    {
      id: 1,
      title: '富贵的第一天',
      date: '2023-03-15',
      description: '刚出生的小富贵，还很小很小',
      likes: 15,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: '第一次睁开眼睛',
      date: '2023-04-15',
      description: '好奇地打量着这个世界',
      likes: 23,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: '晒太阳的富贵',
      date: '2023-05-20',
      description: '在窗台上享受阳光',
      likes: 31,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: '六个月生日',
      date: '2023-09-15',
      description: '已经长成了一只漂亮的小猫咪',
      likes: 28,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: '一岁生日',
      date: '2024-03-15',
      description: '成年猫咪了，但依然可爱',
      likes: 42,
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: '最新照片',
      date: '2024-11-15',
      description: '在沙发上休息的富贵',
      likes: 19,
      image: '/api/placeholder/300/200'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="cat-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cat-800 flex items-center space-x-2">
            <Camera className="w-6 h-6" />
            <span>富贵的照片相册</span>
          </h2>
          <button className="cat-button flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>上传照片</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-2 bg-cat-100 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-cat-300 mx-auto mb-2" />
                  <p className="text-cat-500 text-sm">照片占位符</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-cat-800">{photo.title}</h3>
                  <div className="flex items-center space-x-1 text-cat-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{photo.likes}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-cat-500" />
                  <span className="text-sm text-cat-600">{photo.date}</span>
                </div>
                <p className="text-cat-700 text-sm leading-relaxed">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cat-card p-4 text-center">
          <div className="text-2xl font-bold text-cat-500">{photos.length}</div>
          <div className="text-cat-700">总照片数</div>
        </div>
        <div className="cat-card p-4 text-center">
          <div className="text-2xl font-bold text-cat-500">
            {photos.reduce((sum, photo) => sum + photo.likes, 0)}
          </div>
          <div className="text-cat-700">总点赞数</div>
        </div>
        <div className="cat-card p-4 text-center">
          <div className="text-2xl font-bold text-cat-500">1年8个月</div>
          <div className="text-cat-700">记录时长</div>
        </div>
      </div>
    </div>
  )
} 