import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function PhotoAlbum() {
  // 计算富贵的年龄
  const calculateAge = () => {
    const birthday = new Date('2021-11-01')
    const today = new Date()
    
    let years = today.getFullYear() - birthday.getFullYear()
    let months = today.getMonth() - birthday.getMonth()
    
    // 如果还没到生日月份，或者到了月份但还没到日期，年龄减1
    if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
      years--
      months += 12
    }
    
    // 如果月份为负数，调整
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

  const photos = [
    {
      id: 1,
      title: '富贵的第一天',
      date: '2021-11-01',
      description: '刚出生的小富贵，还很小很小',
      likes: 15,
      image: '/fugui-photo.jpg'
    },
    {
      id: 2,
      title: '第一次睁开眼睛',
      date: '2021-12-01',
      description: '好奇地打量着这个世界',
      likes: 23,
      image: '/fugui-photo.jpg'
    },
    {
      id: 3,
      title: '晒太阳的富贵',
      date: '2022-03-15',
      description: '在窗台上享受阳光',
      likes: 31,
      image: '/fugui-photo.jpg'
    },
    {
      id: 4,
      title: '六个月生日',
      date: '2022-05-01',
      description: '已经长成了一只漂亮的小猫咪',
      likes: 28,
      image: '/fugui-photo.jpg'
    },
    {
      id: 5,
      title: '一岁生日',
      date: '2022-11-01',
      description: '成年猫咪了，但依然可爱',
      likes: 42,
      image: '/fugui-photo.jpg'
    },
    {
      id: 6,
      title: '最新照片',
      date: '2024-12-01',
      description: '在沙发上休息的富贵',
      likes: 19,
      image: '/fugui-photo.jpg'
    }
  ]

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

          {/* 照片网格 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-pink-800">富贵的照片相册</h2>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                📸 上传照片
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
                  <div className="aspect-w-3 aspect-h-2 bg-pink-100 relative">
                    <Image 
                      src={photo.image}
                      alt={photo.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-pink-800">{photo.title}</h3>
                      <div className="flex items-center space-x-1 text-pink-500">
                        <span className="text-sm">❤️ {photo.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-pink-600">📅 {photo.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
      </div>
    </>
  )
} 