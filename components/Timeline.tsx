'use client'

import { Calendar, Heart, Camera, Star } from 'lucide-react'

export default function Timeline() {
  const timelineEvents = [
    {
      id: 1,
      date: '2023-03-15',
      title: '富贵出生了！',
      description: '今天是一个特别的日子，富贵来到了这个世界。小小的它，眼睛还没有完全睁开。',
      type: 'birth',
      icon: Heart
    },
    {
      id: 2,
      date: '2023-04-15',
      title: '第一次睁开眼睛',
      description: '富贵第一次睁开了它那双美丽的眼睛，好奇地打量着这个世界。',
      type: 'milestone',
      icon: Star
    },
    {
      id: 3,
      date: '2023-05-15',
      title: '开始吃猫粮',
      description: '富贵开始从母乳转向猫粮，这是它成长的重要一步。',
      type: 'food',
      icon: Heart
    },
    {
      id: 4,
      date: '2023-06-15',
      title: '第一次接种疫苗',
      description: '为了富贵的健康，今天带它去接种了第一针疫苗。',
      type: 'health',
      icon: Star
    },
    {
      id: 5,
      date: '2023-09-15',
      title: '六个月生日',
      description: '富贵六个月了！已经长成了一只漂亮的小猫咪。',
      type: 'birthday',
      icon: Calendar
    },
    {
      id: 6,
      date: '2024-03-15',
      title: '一岁生日',
      description: '富贵一岁了！已经是一只成年猫咪了，但依然那么可爱。',
      type: 'birthday',
      icon: Calendar
    },
    {
      id: 7,
      date: '2024-11-15',
      title: '最新照片',
      description: '富贵在阳光下晒太阳，看起来非常惬意。',
      type: 'photo',
      icon: Camera
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'birth':
        return 'bg-pink-500'
      case 'milestone':
        return 'bg-blue-500'
      case 'food':
        return 'bg-green-500'
      case 'health':
        return 'bg-purple-500'
      case 'birthday':
        return 'bg-cat-500'
      case 'photo':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <div className="cat-card p-6">
        <h2 className="text-2xl font-bold text-cat-800 mb-6">富贵的成长时间线</h2>
        
        <div className="space-y-6">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon
            return (
              <div key={event.id} className="timeline-item">
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(event.type)}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-cat-600">{event.date}</span>
                      <span className="text-lg font-bold text-cat-800">{event.title}</span>
                    </div>
                    <p className="text-cat-700 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 