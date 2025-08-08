'use client'

interface StatsPanelProps {
  totalNFTs: number
  contractName?: string
  contractSymbol?: string
  isLoading?: boolean
}

export function StatsPanel({ totalNFTs, contractName, contractSymbol, isLoading }: StatsPanelProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">收藏统计</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-900">{totalNFTs}</div>
          <div className="text-sm text-blue-600">拥有的 NFT</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-900 truncate">
            {contractName || '未知'}
          </div>
          <div className="text-sm text-green-600">合约名称</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-lg font-bold text-purple-900">
            {contractSymbol || 'N/A'}
          </div>
          <div className="text-sm text-purple-600">符号</div>
        </div>
      </div>
    </div>
  )
}