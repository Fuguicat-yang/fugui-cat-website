'use client'

import { Heart, Calendar, MapPin, Star } from 'lucide-react'

export default function CatProfile() {
  const catInfo = {
    name: '富贵',
    breed: '英短银渐层',
    birthday: '2023-03-15',
    age: '1岁8个月',
    weight: '4.2kg',
    location: '温暖的家',
    personality: '温顺可爱，喜欢晒太阳',
    favoriteFood: '三文鱼、鸡胸肉',
    hobbies: '睡觉、晒太阳、玩逗猫棒'
  }

  return (
    <div className="space-y-6">
      {/* 主要信息卡片 */}
      <div className="cat-card p-8">
        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 bg-cat-200 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-cat-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-cat-800 mb-2">{catInfo.name}</h2>
            <p className="text-lg text-cat-600 mb-4">{catInfo.breed}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-cat-500" />
                <span className="text-cat-700">生日: {catInfo.birthday}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-cat-500" />
                <span className="text-cat-700">年龄: {catInfo.age}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-cat-500" />
                <span className="text-cat-700">体重: {catInfo.weight}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-cat-500" />
                <span className="text-cat-700">位置: {catInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 性格特点 */}
        <div className="cat-card p-6">
          <h3 className="text-xl font-bold text-cat-800 mb-4 flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>性格特点</span>
          </h3>
          <p className="text-cat-700 leading-relaxed">{catInfo.personality}</p>
        </div>

        {/* 最爱食物 */}
        <div className="cat-card p-6">
          <h3 className="text-xl font-bold text-cat-800 mb-4 flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>最爱食物</span>
          </h3>
          <p className="text-cat-700 leading-relaxed">{catInfo.favoriteFood}</p>
        </div>

        {/* 兴趣爱好 */}
        <div className="cat-card p-6 md:col-span-2">
          <h3 className="text-xl font-bold text-cat-800 mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>兴趣爱好</span>
          </h3>
          <p className="text-cat-700 leading-relaxed">{catInfo.hobbies}</p>
        </div>
      </div>

      {/* 成长里程碑 */}
      <div className="cat-card p-6">
        <h3 className="text-xl font-bold text-cat-800 mb-4">成长里程碑</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-cat-500">3个月</div>
            <div className="text-cat-700">开始吃猫粮</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-cat-500">6个月</div>
            <div className="text-cat-700">完成疫苗接种</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-cat-500">1岁</div>
            <div className="text-cat-700">成年仪式</div>
          </div>
        </div>
      </div>
    </div>
  )
} 