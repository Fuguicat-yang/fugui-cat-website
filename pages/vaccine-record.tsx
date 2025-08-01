import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

interface VaccineRecord {
  id: number
  date: string
  vaccine: string
  description: string
  status: 'completed' | 'scheduled'
  nextDue: string | null
}

export default function VaccineRecord() {
  const [vaccineRecords, setVaccineRecords] = useState<VaccineRecord[]>([
    {
      id: 1,
      date: '2022-01-15',
      vaccine: '三联疫苗',
      description: '第一针三联疫苗，富贵表现得很勇敢',
      status: 'completed',
      nextDue: null
    },
    {
      id: 2,
      date: '2022-02-15',
      vaccine: '三联疫苗',
      description: '第二针三联疫苗，身体反应良好',
      status: 'completed',
      nextDue: null
    },
    {
      id: 3,
      date: '2022-03-15',
      vaccine: '三联疫苗',
      description: '第三针三联疫苗，完成基础免疫',
      status: 'completed',
      nextDue: null
    },
    {
      id: 4,
      date: '2023-03-15',
      vaccine: '年度加强疫苗',
      description: '一岁生日时进行年度加强疫苗接种',
      status: 'completed',
      nextDue: null
    },
    {
      id: 5,
      date: '2024-03-15',
      vaccine: '年度加强疫苗',
      description: '年度加强疫苗接种',
      status: 'completed',
      nextDue: null
    },
    {
      id: 6,
      date: '2025-03-15',
      vaccine: '年度加强疫苗',
      description: '年度加强疫苗接种',
      status: 'scheduled',
      nextDue: '2025-03-15'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [newRecord, setNewRecord] = useState({
    date: '',
    vaccine: '',
    description: '',
    status: 'completed' as 'completed' | 'scheduled',
    nextDue: ''
  })

  const getStatusColor = (status: string) => {
    if (status === 'completed') {
      return 'bg-green-100 text-green-800 border-green-200'
    } else {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  const handleAddRecord = () => {
    if (!newRecord.date || !newRecord.vaccine || !newRecord.description) {
      alert('请填写完整信息')
      return
    }

    const record: VaccineRecord = {
      id: Date.now(),
      date: newRecord.date,
      vaccine: newRecord.vaccine,
      description: newRecord.description,
      status: newRecord.status,
      nextDue: newRecord.status === 'scheduled' ? newRecord.nextDue : null
    }

    setVaccineRecords([...vaccineRecords, record])
    setNewRecord({
      date: '',
      vaccine: '',
      description: '',
      status: 'completed',
      nextDue: ''
    })
    setShowModal(false)
  }

  const completedCount = vaccineRecords.filter(r => r.status === 'completed').length
  const scheduledCount = vaccineRecords.filter(r => r.status === 'scheduled').length

  return (
    <>
      <Head>
        <title>疫苗记录本 - 富贵的成长记录</title>
        <meta name="description" content="记录富贵猫咪的疫苗接种历程" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* 头部 */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-3">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  <span className="text-2xl">←</span>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-blue-800">疫苗记录本</h1>
                  <p className="text-blue-600">富贵的疫苗接种历程</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💉</span>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-500">{completedCount}</div>
              <div className="text-gray-700">已完成</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-yellow-500">{scheduledCount}</div>
              <div className="text-gray-700">待完成</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-500">100%</div>
              <div className="text-gray-700">接种率</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-500">健康</div>
              <div className="text-gray-700">当前状态</div>
            </div>
          </div>

          {/* 疫苗记录列表 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-800">详细记录</h2>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <span>➕</span>
                <span>添加记录</span>
              </button>
            </div>
            <div className="space-y-4">
              {vaccineRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-blue-800">{record.vaccine}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
                          {record.status === 'completed' ? '已完成' : '待完成'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">📅 {record.date}</span>
                      </div>
                      <p className="text-gray-700">{record.description}</p>
                      {record.nextDue && (
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-sm text-yellow-600">⏰ 下次到期: {record.nextDue}</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      {record.status === 'completed' ? (
                        <span className="text-green-500 text-2xl">✅</span>
                      ) : (
                        <span className="text-yellow-500 text-2xl">⏳</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 健康提醒 */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">健康提醒</h3>
            <div className="space-y-3">
              {scheduledCount > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-500 text-xl">⚠️</span>
                  <div>
                    <div className="font-medium text-yellow-800">有疫苗待完成</div>
                    <div className="text-sm text-yellow-600">请及时安排接种计划</div>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 text-xl">💡</span>
                <div>
                  <div className="font-medium text-blue-800">定期体检提醒</div>
                  <div className="text-sm text-blue-600">建议每年进行一次全面体检</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 添加记录模态框 */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-blue-800 mb-4">添加疫苗记录</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">接种日期</label>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">疫苗名称</label>
                  <input
                    type="text"
                    value={newRecord.vaccine}
                    onChange={(e) => setNewRecord({...newRecord, vaccine: e.target.value})}
                    placeholder="例如：三联疫苗"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                    placeholder="记录接种情况..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select
                    value={newRecord.status}
                    onChange={(e) => setNewRecord({...newRecord, status: e.target.value as 'completed' | 'scheduled'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="completed">已完成</option>
                    <option value="scheduled">待完成</option>
                  </select>
                </div>
                
                {newRecord.status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">下次到期日期</label>
                    <input
                      type="date"
                      value={newRecord.nextDue}
                      onChange={(e) => setNewRecord({...newRecord, nextDue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  取消
                </button>
                <button
                  onClick={handleAddRecord}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 