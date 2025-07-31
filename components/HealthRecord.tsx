'use client'

import { Activity, Heart, Calendar, CheckCircle, AlertCircle } from 'lucide-react'

export default function HealthRecord() {
  const healthRecords = [
    {
      id: 1,
      date: '2023-06-15',
      type: 'vaccination',
      title: '第一针疫苗',
      description: '完成了第一针疫苗接种，富贵表现得很勇敢',
      status: 'completed',
      nextDue: null
    },
    {
      id: 2,
      date: '2023-07-15',
      type: 'vaccination',
      title: '第二针疫苗',
      description: '第二针疫苗接种完成，身体反应良好',
      status: 'completed',
      nextDue: null
    },
    {
      id: 3,
      date: '2023-08-15',
      type: 'vaccination',
      title: '第三针疫苗',
      description: '完成所有基础疫苗接种',
      status: 'completed',
      nextDue: null
    },
    {
      id: 4,
      date: '2024-03-15',
      type: 'checkup',
      title: '一岁体检',
      description: '一岁生日时进行了全面体检，各项指标正常',
      status: 'completed',
      nextDue: null
    },
    {
      id: 5,
      date: '2024-09-15',
      type: 'vaccination',
      title: '年度疫苗',
      description: '年度疫苗接种',
      status: 'scheduled',
      nextDue: '2024-12-15'
    },
    {
      id: 6,
      date: '2024-11-15',
      type: 'checkup',
      title: '定期体检',
      description: '半年一次的定期体检',
      status: 'scheduled',
      nextDue: '2024-12-15'
    }
  ]

  const getStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    } else {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'completed') {
      return 'bg-green-100 text-green-800'
    } else {
      return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="cat-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cat-800 flex items-center space-x-2">
            <Activity className="w-6 h-6" />
            <span>富贵的健康记录</span>
          </h2>
          <button className="cat-button flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>添加记录</span>
          </button>
        </div>

        {/* 健康统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">4</div>
            <div className="text-cat-700">已完成</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">2</div>
            <div className="text-cat-700">待完成</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cat-500">100%</div>
            <div className="text-cat-700">疫苗接种率</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cat-500">健康</div>
            <div className="text-cat-700">当前状态</div>
          </div>
        </div>

        {/* 健康记录列表 */}
        <div className="space-y-4">
          {healthRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cat-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cat-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-cat-800">{record.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status === 'completed' ? '已完成' : '待完成'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-cat-500" />
                      <span className="text-sm text-cat-600">{record.date}</span>
                    </div>
                    <p className="text-cat-700 text-sm leading-relaxed">{record.description}</p>
                    {record.nextDue && (
                      <div className="flex items-center space-x-2 mt-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">下次到期: {record.nextDue}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  {getStatusIcon(record.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 健康提醒 */}
      <div className="cat-card p-6">
        <h3 className="text-xl font-bold text-cat-800 mb-4 flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>健康提醒</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div>
              <div className="font-medium text-yellow-800">年度疫苗即将到期</div>
              <div className="text-sm text-yellow-600">建议在12月15日前接种</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-500" />
            <div>
              <div className="font-medium text-blue-800">定期体检提醒</div>
              <div className="text-sm text-blue-600">建议每半年进行一次体检</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 