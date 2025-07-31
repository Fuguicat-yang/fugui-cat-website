'use client'

import { useState } from 'react'
import { Heart, Camera, Scale, Activity, Calendar, Plus } from 'lucide-react'
import CatProfile from '@/components/CatProfile'
import Timeline from '@/components/Timeline'
import PhotoGallery from '@/components/PhotoGallery'
import WeightChart from '@/components/WeightChart'
import HealthRecord from '@/components/HealthRecord'
import AddRecord from '@/components/AddRecord'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-4">富贵的成长记录</h1>
          <p className="text-xl text-orange-600">记录每一刻的美好时光</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🐱</span>
            </div>
            <h2 className="text-2xl font-bold text-orange-800 mb-4">富贵</h2>
            <p className="text-orange-600 mb-4">英短银渐层 | 1岁8个月</p>
            <p className="text-gray-700">温顺可爱，喜欢晒太阳的小猫咪</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-2">基本信息</h3>
            <p className="text-gray-700">生日: 2023-03-15</p>
            <p className="text-gray-700">体重: 4.2kg</p>
            <p className="text-gray-700">位置: 温暖的家</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-2">最爱食物</h3>
            <p className="text-gray-700">三文鱼、鸡胸肉</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-2">兴趣爱好</h3>
            <p className="text-gray-700">睡觉、晒太阳、玩逗猫棒</p>
          </div>
        </div>
      </div>
    </div>
  )
} 