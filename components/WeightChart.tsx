'use client'

import { Scale, TrendingUp, TrendingDown } from 'lucide-react'

export default function WeightChart() {
  const weightData = [
    { date: '2023-03-15', weight: 0.1, age: '出生' },
    { date: '2023-04-15', weight: 0.5, age: '1个月' },
    { date: '2023-05-15', weight: 1.2, age: '2个月' },
    { date: '2023-06-15', weight: 2.0, age: '3个月' },
    { date: '2023-07-15', weight: 2.8, age: '4个月' },
    { date: '2023-08-15', weight: 3.2, age: '5个月' },
    { date: '2023-09-15', weight: 3.5, age: '6个月' },
    { date: '2023-10-15', weight: 3.8, age: '7个月' },
    { date: '2023-11-15', weight: 4.0, age: '8个月' },
    { date: '2023-12-15', weight: 4.1, age: '9个月' },
    { date: '2024-01-15', weight: 4.2, age: '10个月' },
    { date: '2024-02-15', weight: 4.2, age: '11个月' },
    { date: '2024-03-15', weight: 4.2, age: '1岁' },
    { date: '2024-11-15', weight: 4.2, age: '1岁8个月' }
  ]

  const currentWeight = weightData[weightData.length - 1]
  const previousWeight = weightData[weightData.length - 2]
  const weightChange = currentWeight.weight - previousWeight.weight
  const isGaining = weightChange > 0

  return (
    <div className="space-y-6">
      <div className="cat-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cat-800 flex items-center space-x-2">
            <Scale className="w-6 h-6" />
            <span>富贵的体重记录</span>
          </h2>
          <button className="cat-button flex items-center space-x-2">
            <Scale className="w-4 h-4" />
            <span>记录体重</span>
          </button>
        </div>

        {/* 当前体重信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-cat-500">{currentWeight.weight}kg</div>
            <div className="text-cat-700">当前体重</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-cat-500">{currentWeight.age}</div>
            <div className="text-cat-700">当前年龄</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className={`text-3xl font-bold flex items-center justify-center space-x-1 ${
              isGaining ? 'text-green-500' : 'text-red-500'
            }`}>
              {isGaining ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              <span>{Math.abs(weightChange).toFixed(1)}kg</span>
            </div>
            <div className="text-cat-700">体重变化</div>
          </div>
        </div>

        {/* 体重图表 */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-bold text-cat-800 mb-4">体重增长曲线</h3>
          <div className="h-64 bg-cat-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Scale className="w-16 h-16 text-cat-300 mx-auto mb-4" />
              <p className="text-cat-500">体重图表占位符</p>
              <p className="text-cat-400 text-sm">这里将显示富贵的体重增长曲线</p>
            </div>
          </div>
        </div>
      </div>

      {/* 体重记录列表 */}
      <div className="cat-card p-6">
        <h3 className="text-xl font-bold text-cat-800 mb-4">详细记录</h3>
        <div className="space-y-3">
          {weightData.slice(-10).reverse().map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-cat-100 rounded-full flex items-center justify-center">
                  <Scale className="w-4 h-4 text-cat-500" />
                </div>
                <div>
                  <div className="font-medium text-cat-800">{record.age}</div>
                  <div className="text-sm text-cat-600">{record.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-cat-600">{record.weight}kg</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 