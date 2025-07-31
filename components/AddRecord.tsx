'use client'

import { useState } from 'react'
import { X, Plus, Camera, Scale, Activity, Calendar } from 'lucide-react'

export default function AddRecord() {
  const [isOpen, setIsOpen] = useState(false)
  const [recordType, setRecordType] = useState('')

  const recordTypes = [
    { id: 'photo', name: '照片记录', icon: Camera, description: '上传富贵的照片' },
    { id: 'weight', name: '体重记录', icon: Scale, description: '记录富贵的体重' },
    { id: 'health', name: '健康记录', icon: Activity, description: '记录健康检查' },
    { id: 'milestone', name: '成长里程碑', icon: Calendar, description: '记录重要时刻' }
  ]

  return (
    <>
      {/* 模态框 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-cat-800">添加新记录</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cat-500 hover:text-cat-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!recordType ? (
              <div className="space-y-4">
                <p className="text-cat-700 mb-4">选择要添加的记录类型：</p>
                <div className="grid grid-cols-1 gap-3">
                  {recordTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setRecordType(type.id)}
                        className="flex items-center space-x-3 p-4 border border-cat-200 rounded-lg hover:bg-cat-50 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-cat-100 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-cat-500" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-cat-800">{type.name}</div>
                          <div className="text-sm text-cat-600">{type.description}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    onClick={() => setRecordType('')}
                    className="text-cat-500 hover:text-cat-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-cat-700">添加{recordTypes.find(t => t.id === recordType)?.name}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cat-700 mb-2">日期</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-cat-200 rounded-lg focus:ring-2 focus:ring-cat-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cat-700 mb-2">标题</label>
                    <input
                      type="text"
                      placeholder="请输入标题"
                      className="w-full p-3 border border-cat-200 rounded-lg focus:ring-2 focus:ring-cat-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cat-700 mb-2">描述</label>
                    <textarea
                      rows={3}
                      placeholder="请输入描述"
                      className="w-full p-3 border border-cat-200 rounded-lg focus:ring-2 focus:ring-cat-500 focus:border-transparent"
                    />
                  </div>
                  
                  {recordType === 'weight' && (
                    <div>
                      <label className="block text-sm font-medium text-cat-700 mb-2">体重 (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="请输入体重"
                        className="w-full p-3 border border-cat-200 rounded-lg focus:ring-2 focus:ring-cat-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  
                  {recordType === 'photo' && (
                    <div>
                      <label className="block text-sm font-medium text-cat-700 mb-2">上传照片</label>
                      <div className="border-2 border-dashed border-cat-200 rounded-lg p-6 text-center">
                        <Camera className="w-12 h-12 text-cat-300 mx-auto mb-2" />
                        <p className="text-cat-500">点击上传照片</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2 px-4 border border-cat-300 text-cat-700 rounded-lg hover:bg-cat-50"
                  >
                    取消
                  </button>
                  <button className="flex-1 cat-button">
                    保存记录
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
} 