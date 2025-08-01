import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface FoodRecord {
  id: number
  date: string
  foodName: string
  brand: string
  type: 'dry' | 'wet' | 'treat' | 'supplement'
  description: string
  reaction: 'like' | 'dislike' | 'neutral'
  quantity: string
  price?: number
  notes: string
}

export default function FoodRecord() {
  const [foodRecords, setFoodRecords] = useState<FoodRecord[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingRecord, setEditingRecord] = useState<FoodRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  // 初始化数据
  useEffect(() => {
    const savedRecords = localStorage.getItem('fugui-food-records')
    if (savedRecords) {
      setFoodRecords(JSON.parse(savedRecords))
    } else {
      // 默认数据
      const defaultRecords: FoodRecord[] = [
        {
          id: 1,
          date: '2021-11-01',
          foodName: '皇家幼猫粮',
          brand: 'Royal Canin',
          type: 'dry',
          description: '适合1-4个月幼猫的专用猫粮',
          reaction: 'like',
          quantity: '1kg',
          price: 120,
          notes: '富贵很喜欢，吃得很好'
        },
        {
          id: 2,
          date: '2022-03-15',
          foodName: '渴望六种鱼',
          brand: 'Orijen',
          type: 'dry',
          description: '高蛋白天然猫粮',
          reaction: 'like',
          quantity: '2kg',
          price: 280,
          notes: '营养丰富，毛发更亮'
        },
        {
          id: 3,
          date: '2022-06-01',
          foodName: '希尔斯成猫粮',
          brand: 'Hill\'s',
          type: 'dry',
          description: '成猫专用营养配方',
          reaction: 'neutral',
          quantity: '1.5kg',
          price: 150,
          notes: '一般般，没有特别喜好'
        }
      ]
      setFoodRecords(defaultRecords)
      localStorage.setItem('fugui-food-records', JSON.stringify(defaultRecords))
    }
  }, [])

  // 保存数据到localStorage
  const saveRecords = (newRecords: FoodRecord[]) => {
    setFoodRecords(newRecords)
    localStorage.setItem('fugui-food-records', JSON.stringify(newRecords))
  }

  // 添加记录
  const handleAddRecord = () => {
    if (!editingRecord?.foodName || !editingRecord?.date) {
      alert('请填写完整信息')
      return
    }

    const record: FoodRecord = {
      ...editingRecord,
      id: Date.now()
    }

    saveRecords([...foodRecords, record])
    setEditingRecord(null)
    setShowModal(false)
  }

  // 编辑记录
  const handleEditRecord = (record: FoodRecord) => {
    setEditingRecord(record)
    setShowModal(true)
  }

  // 更新记录
  const handleUpdateRecord = () => {
    if (!editingRecord?.foodName || !editingRecord?.date) {
      alert('请填写完整信息')
      return
    }

    const updatedRecords = foodRecords.map(r => 
      r.id === editingRecord.id ? editingRecord : r
    )
    saveRecords(updatedRecords)
    setEditingRecord(null)
    setShowModal(false)
  }

  // 删除记录
  const handleDeleteRecord = (id: number) => {
    if (confirm('确定要删除这条换粮记录吗？')) {
      const updatedRecords = foodRecords.filter(r => r.id !== id)
      saveRecords(updatedRecords)
    }
  }

  // 筛选记录
  const filteredRecords = foodRecords.filter(record => {
    const matchesSearch = record.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || record.type === filterType
    return matchesSearch && matchesType
  })

  // 统计信息
  const totalRecords = foodRecords.length
  const likeCount = foodRecords.filter(r => r.reaction === 'like').length
  const dislikeCount = foodRecords.filter(r => r.reaction === 'dislike').length
  const totalSpent = foodRecords.reduce((sum, r) => sum + (r.price || 0), 0)

  const getReactionIcon = (reaction: string) => {
    switch (reaction) {
      case 'like': return '😍'
      case 'dislike': return '😞'
      case 'neutral': return '😐'
      default: return '😐'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dry': return 'bg-blue-100 text-blue-800'
      case 'wet': return 'bg-green-100 text-green-800'
      case 'treat': return 'bg-yellow-100 text-yellow-800'
      case 'supplement': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case 'dry': return '干粮'
      case 'wet': return '湿粮'
      case 'treat': return '零食'
      case 'supplement': return '营养品'
      default: return '其他'
    }
  }

  return (
    <>
      <Head>
        <title>换粮记录本 - 富贵的成长记录</title>
        <meta name="description" content="记录富贵猫咪的饮食习惯和换粮历史" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        {/* 头部 */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-3">
                <Link href="/" className="text-green-600 hover:text-green-800">
                  <span className="text-2xl">←</span>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-green-800">换粮记录本</h1>
                  <p className="text-green-600">记录富贵的饮食习惯</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🍽️</span>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-500">{totalRecords}</div>
              <div className="text-gray-700">总记录数</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-500">{likeCount}</div>
              <div className="text-gray-700">喜欢</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-red-500">{dislikeCount}</div>
              <div className="text-gray-700">不喜欢</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-500">¥{totalSpent}</div>
              <div className="text-gray-700">总花费</div>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="搜索食物名称、品牌或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">全部类型</option>
                  <option value="dry">干粮</option>
                  <option value="wet">湿粮</option>
                  <option value="treat">零食</option>
                  <option value="supplement">营养品</option>
                </select>
                <button
                  onClick={() => {
                    setEditingRecord({
                      id: 0,
                      date: format(new Date(), 'yyyy-MM-dd'),
                      foodName: '',
                      brand: '',
                      type: 'dry',
                      description: '',
                      reaction: 'neutral',
                      quantity: '',
                      price: 0,
                      notes: ''
                    })
                    setShowModal(true)
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>🍽️</span>
                  <span>添加记录</span>
                </button>
              </div>
            </div>
          </div>

          {/* 换粮记录列表 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-800">详细记录</h2>
              <div className="text-sm text-gray-500">
                共 {filteredRecords.length} 条记录
              </div>
            </div>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-green-800">{record.foodName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(record.type)}`}>
                          {getTypeName(record.type)}
                        </span>
                        <span className="text-2xl">{getReactionIcon(record.reaction)}</span>
                      </div>
                      <div className="flex items-center space-x-4 mb-2 text-sm text-gray-600">
                        <span>📅 {record.date}</span>
                        <span>🏷️ {record.brand}</span>
                        <span>📦 {record.quantity}</span>
                        {record.price && <span>💰 ¥{record.price}</span>}
                      </div>
                      <p className="text-gray-700 mb-2">{record.description}</p>
                      {record.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          📝 {record.notes}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <button
                        onClick={() => handleEditRecord(record)}
                        className="text-blue-600 hover:text-blue-800 text-sm p-1"
                        title="编辑记录"
                      >
                        ✏️
                      </button>
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

              {filteredRecords.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                  <p className="text-gray-500">没有找到记录</p>
                  <button
                    onClick={() => {
                      setEditingRecord({
                        id: 0,
                        date: format(new Date(), 'yyyy-MM-dd'),
                        foodName: '',
                        brand: '',
                        type: 'dry',
                        description: '',
                        reaction: 'neutral',
                        quantity: '',
                        price: 0,
                        notes: ''
                      })
                      setShowModal(true)
                    }}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    添加第一条记录
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 饮食建议 */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">饮食建议</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-green-500 text-xl">💡</span>
                <div>
                  <div className="font-medium text-green-800">换粮建议</div>
                  <div className="text-sm text-green-600">新猫粮需要逐步过渡，建议7-10天完成换粮</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 text-xl">💧</span>
                <div>
                  <div className="font-medium text-blue-800">水分补充</div>
                  <div className="text-sm text-blue-600">干粮为主时，确保充足的清水供应</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-500 text-xl">⚖️</span>
                <div>
                  <div className="font-medium text-yellow-800">食量控制</div>
                  <div className="text-sm text-yellow-600">根据体重和活动量调整每日食量</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 添加/编辑记录模态框 */}
        {showModal && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                {editingRecord.id === 0 ? '添加换粮记录' : '编辑换粮记录'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">记录日期</label>
                  <input
                    type="date"
                    value={editingRecord.date}
                    onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">食物名称</label>
                  <input
                    type="text"
                    value={editingRecord.foodName}
                    onChange={(e) => setEditingRecord({...editingRecord, foodName: e.target.value})}
                    placeholder="例如：皇家幼猫粮"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">品牌</label>
                  <input
                    type="text"
                    value={editingRecord.brand}
                    onChange={(e) => setEditingRecord({...editingRecord, brand: e.target.value})}
                    placeholder="例如：Royal Canin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">食物类型</label>
                  <select
                    value={editingRecord.type}
                    onChange={(e) => setEditingRecord({...editingRecord, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="dry">干粮</option>
                    <option value="wet">湿粮</option>
                    <option value="treat">零食</option>
                    <option value="supplement">营养品</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea
                    value={editingRecord.description}
                    onChange={(e) => setEditingRecord({...editingRecord, description: e.target.value})}
                    placeholder="描述这个食物的特点..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
                    <input
                      type="text"
                      value={editingRecord.quantity}
                      onChange={(e) => setEditingRecord({...editingRecord, quantity: e.target.value})}
                      placeholder="例如：1kg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">价格(¥)</label>
                    <input
                      type="number"
                      value={editingRecord.price || ''}
                      onChange={(e) => setEditingRecord({...editingRecord, price: Number(e.target.value) || 0})}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">反应</label>
                  <select
                    value={editingRecord.reaction}
                    onChange={(e) => setEditingRecord({...editingRecord, reaction: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="like">😍 喜欢</option>
                    <option value="neutral">😐 一般</option>
                    <option value="dislike">😞 不喜欢</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                  <textarea
                    value={editingRecord.notes}
                    onChange={(e) => setEditingRecord({...editingRecord, notes: e.target.value})}
                    placeholder="记录富贵的反应或其他注意事项..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingRecord(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  取消
                </button>
                <button
                  onClick={editingRecord.id === 0 ? handleAddRecord : handleUpdateRecord}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                >
                  {editingRecord.id === 0 ? '添加' : '更新'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 