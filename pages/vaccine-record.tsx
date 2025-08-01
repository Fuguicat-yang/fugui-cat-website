import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface VaccineRecord {
  id: number
  date: string
  vaccine: string
  description: string
  status: 'completed' | 'scheduled'
  nextDue: string | null
}

interface HealthReminder {
  id: number
  title: string
  description: string
  type: 'warning' | 'info' | 'success'
  icon: string
  isActive: boolean
  priority: 'high' | 'medium' | 'low'
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

  const [healthReminders, setHealthReminders] = useState<HealthReminder[]>([])

  const [showModal, setShowModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [editingReminder, setEditingReminder] = useState<HealthReminder | null>(null)
  const [newRecord, setNewRecord] = useState({
    date: '',
    vaccine: '',
    description: '',
    status: 'completed' as 'completed' | 'scheduled',
    nextDue: ''
  })

  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    type: 'info' as 'warning' | 'info' | 'success',
    icon: '💡',
    isActive: true,
    priority: 'medium' as 'high' | 'medium' | 'low'
  })

  // 初始化数据
  useEffect(() => {
    const savedRecords = localStorage.getItem('fugui-vaccine-records')
    if (savedRecords) {
      setVaccineRecords(JSON.parse(savedRecords))
    }

    const savedReminders = localStorage.getItem('fugui-health-reminders')
    if (savedReminders) {
      setHealthReminders(JSON.parse(savedReminders))
    } else {
      // 默认健康提醒
      const defaultReminders: HealthReminder[] = [
        {
          id: 1,
          title: '定期体检提醒',
          description: '建议每年进行一次全面体检',
          type: 'info',
          icon: '💡',
          isActive: true,
          priority: 'high'
        },
        {
          id: 2,
          title: '疫苗待完成提醒',
          description: '请及时安排接种计划',
          type: 'warning',
          icon: '⚠️',
          isActive: true,
          priority: 'high'
        }
      ]
      setHealthReminders(defaultReminders)
      localStorage.setItem('fugui-health-reminders', JSON.stringify(defaultReminders))
    }
  }, [])

  // 保存数据到localStorage
  const saveRecords = (newRecords: VaccineRecord[]) => {
    setVaccineRecords(newRecords)
    localStorage.setItem('fugui-vaccine-records', JSON.stringify(newRecords))
  }

  const saveReminders = (newReminders: HealthReminder[]) => {
    setHealthReminders(newReminders)
    localStorage.setItem('fugui-health-reminders', JSON.stringify(newReminders))
  }

  const getStatusColor = (status: string) => {
    if (status === 'completed') {
      return 'bg-green-100 text-green-800 border-green-200'
    } else {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getReminderTextColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-800'
      case 'success':
        return 'text-green-800'
      default:
        return 'text-blue-800'
    }
  }

  const getReminderIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-500'
      case 'success':
        return 'text-green-500'
      default:
        return 'text-blue-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
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

    saveRecords([...vaccineRecords, record])
    setNewRecord({
      date: '',
      vaccine: '',
      description: '',
      status: 'completed',
      nextDue: ''
    })
    setShowModal(false)
  }

  const handleDeleteRecord = (id: number) => {
    if (confirm('确定要删除这条记录吗？')) {
      const updatedRecords = vaccineRecords.filter(record => record.id !== id)
      saveRecords(updatedRecords)
    }
  }

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.description) {
      alert('请填写完整信息')
      return
    }

    const reminder: HealthReminder = {
      id: Date.now(),
      title: newReminder.title,
      description: newReminder.description,
      type: newReminder.type,
      icon: newReminder.icon,
      isActive: newReminder.isActive,
      priority: newReminder.priority
    }

    saveReminders([...healthReminders, reminder])
    setNewReminder({
      title: '',
      description: '',
      type: 'info',
      icon: '💡',
      isActive: true,
      priority: 'medium'
    })
    setShowReminderModal(false)
  }

  const handleEditReminder = (reminder: HealthReminder) => {
    setEditingReminder(reminder)
    setNewReminder({
      title: reminder.title,
      description: reminder.description,
      type: reminder.type,
      icon: reminder.icon,
      isActive: reminder.isActive,
      priority: reminder.priority
    })
    setShowReminderModal(true)
  }

  const handleUpdateReminder = () => {
    if (!editingReminder || !newReminder.title || !newReminder.description) {
      alert('请填写完整信息')
      return
    }

    const updatedReminders = healthReminders.map(reminder =>
      reminder.id === editingReminder.id
        ? {
            ...reminder,
            title: newReminder.title,
            description: newReminder.description,
            type: newReminder.type,
            icon: newReminder.icon,
            isActive: newReminder.isActive,
            priority: newReminder.priority
          }
        : reminder
    )

    saveReminders(updatedReminders)
    setEditingReminder(null)
    setNewReminder({
      title: '',
      description: '',
      type: 'info',
      icon: '💡',
      isActive: true,
      priority: 'medium'
    })
    setShowReminderModal(false)
  }

  const handleDeleteReminder = (id: number) => {
    if (confirm('确定要删除这条健康提醒吗？')) {
      const updatedReminders = healthReminders.filter(reminder => reminder.id !== id)
      saveReminders(updatedReminders)
    }
  }

  const toggleReminderActive = (id: number) => {
    const updatedReminders = healthReminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    )
    saveReminders(updatedReminders)
  }

  const completedCount = vaccineRecords.filter(r => r.status === 'completed').length
  const scheduledCount = vaccineRecords.filter(record => record.status === 'scheduled').length

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
                    <div className="ml-4 flex items-center space-x-2">
                      {record.status === 'completed' ? (
                        <span className="text-green-500 text-2xl">✅</span>
                      ) : (
                        <span className="text-yellow-500 text-2xl">⏳</span>
                      )}
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-red-600 hover:text-red-800 text-sm p-1"
                        title="删除记录"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 健康提醒 */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-800">健康提醒</h3>
              <button
                onClick={() => {
                  setEditingReminder(null)
                  setNewReminder({
                    title: '',
                    description: '',
                    type: 'info',
                    icon: '💡',
                    isActive: true,
                    priority: 'medium'
                  })
                  setShowReminderModal(true)
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm"
              >
                + 添加提醒
              </button>
            </div>
            <div className="space-y-3">
              {healthReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${getReminderColor(reminder.type)}`}
                >
                  <span className={`text-2xl ${getReminderIconColor(reminder.type)}`}>{reminder.icon}</span>
                  <div>
                    <div className="font-medium text-lg text-gray-800">{reminder.title}</div>
                    <div className="text-sm text-gray-600">{reminder.description}</div>
                  </div>
                  <div className="flex items-center space-x-2 ml-auto">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                      {reminder.priority}
                    </span>
                    <button
                      onClick={() => toggleReminderActive(reminder.id)}
                      className="text-gray-600 hover:text-gray-800 text-sm p-1"
                      title={reminder.isActive ? '关闭提醒' : '开启提醒'}
                    >
                      {reminder.isActive ? '🔕' : '🔔'}
                    </button>
                    <button
                      onClick={() => handleEditReminder(reminder)}
                      className="text-blue-600 hover:text-blue-800 text-sm p-1"
                      title="编辑提醒"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="text-red-600 hover:text-red-800 text-sm p-1"
                      title="删除提醒"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
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

        {/* 健康提醒模态框 */}
        {showReminderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                {editingReminder ? '编辑健康提醒' : '添加健康提醒'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">提醒标题</label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    placeholder="例如：定期体检提醒"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">提醒描述</label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                    placeholder="详细描述..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">提醒类型</label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({...newReminder, type: e.target.value as 'warning' | 'info' | 'success'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">信息提醒</option>
                    <option value="warning">警告提醒</option>
                    <option value="success">成功提醒</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">图标</label>
                  <input
                    type="text"
                    value={newReminder.icon}
                    onChange={(e) => setNewReminder({...newReminder, icon: e.target.value})}
                    placeholder="💡"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                  <select
                    value={newReminder.priority}
                    onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as 'high' | 'medium' | 'low'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newReminder.isActive}
                    onChange={(e) => setNewReminder({...newReminder, isActive: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">启用提醒</label>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  取消
                </button>
                <button
                  onClick={editingReminder ? handleUpdateReminder : handleAddReminder}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  {editingReminder ? '更新' : '添加'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 