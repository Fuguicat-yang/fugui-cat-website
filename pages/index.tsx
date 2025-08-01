import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import QQImage from '../components/QQImage'

export default function Home() {
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

  return (
    <>
      <Head>
        <title>富贵的成长记录</title>
        <meta name="description" content="记录富贵猫咪的成长点滴" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 背景 */}
      <div className="min-h-screen bg-white">
        {/* 顶部导航栏 */}
        <nav className="w-full flex justify-end items-center py-6 px-8 bg-white/80 backdrop-blur sticky top-0 z-20">
                      <div className="flex space-x-4">
              <Link href="/vaccine-record">
                <button className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-colors duration-200">疫苗记录本</button>
              </Link>
              <Link href="/photo-album">
                <button className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow transition-colors duration-200">爱的相册</button>
              </Link>
              <Link href="/food-record">
                <button className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-colors duration-200">换粮记录本</button>
              </Link>

            </div>
        </nav>
        {/* 主要内容区域 */}
        <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
          {/* 透明卡片背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-orange-100/80 backdrop-blur-sm"></div>
          
          {/* 主要内容 */}
          <div className="relative z-10 text-center max-w-6xl mx-auto">
            {/* 标题 */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-800 mb-4">在爱中长大的富贵</h1>
            </div>
            
            {/* 富贵信息 */}
            <div className="mb-8">
              <p className="text-lg text-orange-600 mb-2">{age}</p>
              <p className="text-sm text-orange-500">🎂 生日: 2021年11月1日</p>
            </div>
            
            {/* 设计感照片拼贴 */}
            <div className="mb-12">
              <div className="relative w-full max-w-4xl mx-auto">
                {/* 照片网格容器 */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  {/* 第一张照片 - 左上 */}
                  <div className="group relative transform rotate-1 sm:rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="relative w-full aspect-square sm:h-64 md:h-80 overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                      <Image 
                        src="fugui-photo-1.jpg" 
                        alt="富贵照片1"
                        width={300}
                        height={320}
                        className="object-cover w-full h-full"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* 第二张照片 - 右上 */}
                  <div className="group relative transform -rotate-1 sm:-rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="relative w-full aspect-square sm:h-64 md:h-80 overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                      <Image 
                        src="fugui-photo-2.jpeg" 
                        alt="富贵照片2"
                        width={300}
                        height={320}
                        className="object-cover w-full h-full"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* 第三张照片 - 左下 */}
                  <div className="group relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="relative w-full aspect-square sm:h-64 md:h-80 overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                      <Image 
                        src="fugui-photo-3.jpeg" 
                        alt="富贵照片3"
                        width={300}
                        height={320}
                        className="object-cover w-full h-full"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* 第四张照片 - 右下 */}
                  <div className="group relative transform rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="relative w-full aspect-square sm:h-64 md:h-80 overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                      <Image 
                        src="fugui-photo-4.jpeg" 
                        alt="富贵照片4"
                        width={300}
                        height={320}
                        className="object-cover w-full h-full"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
                
                {/* 装饰性元素 - 在移动端隐藏 */}
                <div className="hidden sm:block absolute -top-4 -left-4 w-8 h-8 bg-orange-400 rounded-full opacity-60"></div>
                <div className="hidden sm:block absolute -bottom-4 -right-4 w-6 h-6 bg-orange-300 rounded-full opacity-60"></div>
                <div className="hidden sm:block absolute top-1/2 -right-8 w-4 h-4 bg-orange-200 rounded-full opacity-60"></div>
                <div className="hidden sm:block absolute top-1/2 -left-8 w-3 h-3 bg-orange-100 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* QQ空间图片测试区域 */}
            <div className="mt-12 bg-white/80 backdrop-blur rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">QQ空间图片测试</h2>
              <p className="text-gray-600 mb-4">测试QQ空间图片是否能正常显示</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 测试图片1 */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">测试图片1</h3>
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <QQImage 
                      src="https://example.com/test-image-1.jpg"
                      alt="测试图片1"
                      width={300}
                      height={200}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">请替换为你的QQ空间图片链接</p>
                </div>

                {/* 测试图片2 */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">测试图片2</h3>
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <QQImage 
                      src="https://example.com/test-image-2.jpg"
                      alt="测试图片2"
                      width={300}
                      height={200}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">请替换为你的QQ空间图片链接</p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  使用方法：将QQ空间图片链接替换到上面的src属性中
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm text-left">
                  <p className="font-medium mb-1">示例：</p>
                  <code className="text-blue-600">
                    src="https://user.qzone.qq.com/你的QQ号/photo/图片ID"
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 