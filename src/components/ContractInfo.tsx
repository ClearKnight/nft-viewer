'use client'

import { useAccount, useReadContract } from 'wagmi'
import { erc721Abi } from 'viem'
import { useState, useEffect } from 'react'

interface ContractInfoProps {
  contractAddress: string
  onFetchNFTs: () => void
  isLoading: boolean
}

export function ContractInfo({ contractAddress, onFetchNFTs, isLoading }: ContractInfoProps) {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 获取合约名称
  const { data: contractName } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    functionName: 'name',
    query: {
      enabled: !!contractAddress && isConnected && mounted,
    },
  })

  // 获取合约符号
  const { data: contractSymbol } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    functionName: 'symbol',
    query: {
      enabled: !!contractAddress && isConnected && mounted,
    },
  })

  // 获取总供应量
  const { data: totalSupply, error: totalSupplyError, isLoading: totalSupplyLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    functionName: 'totalSupply',
    query: {
      enabled: !!contractAddress && isConnected && mounted,
    },
  })

  // 获取用户余额
  const { data: balance, error: balanceError, isLoading: balanceLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!contractAddress && !!address && isConnected && mounted,
    },
  })

  if (!mounted || !isConnected || !contractAddress) {
    return null
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">合约信息</h3>
      
      <div className="space-y-4">
        {/* 合约基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">合约名称</div>
            <div className="font-semibold text-gray-900">
              {contractName || 'Loading...'}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">符号</div>
            <div className="font-semibold text-gray-900">
              {contractSymbol || 'Loading...'}
            </div>
          </div>
        </div>

        {/* 数量信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600">总供应量</div>
            <div className="text-xl font-bold text-blue-900">
              {totalSupplyLoading ? (
                <div className="animate-pulse">Loading...</div>
              ) : totalSupplyError ? (
                <span className="text-red-500 text-sm">获取失败</span>
              ) : (
                totalSupply?.toString() || 'N/A'
              )}
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-green-600">你拥有的数量</div>
            <div className="text-xl font-bold text-green-900">
              {balanceLoading ? (
                <div className="animate-pulse">Loading...</div>
              ) : balanceError ? (
                <span className="text-red-500 text-sm">获取失败</span>
              ) : (
                balance?.toString() || '0'
              )}
            </div>
          </div>
        </div>

        {/* 合约地址 */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">合约地址</div>
          <div className="font-mono text-sm text-gray-900 break-all">
            {contractAddress}
          </div>
        </div>

        {/* 获取按钮 */}
        <button
          onClick={onFetchNFTs}
          disabled={!contractAddress || isLoading || Number(balance || 0) === 0}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>加载中...</span>
            </div>
          ) : Number(balance || 0) === 0 ? (
            '你没有这个合约的 NFT'
          ) : (
            `获取我的 NFT (${balance?.toString() || 0} 个)`
          )}
        </button>

        {/* 错误信息 */}
        {(totalSupplyError || balanceError) && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              <div className="font-medium mb-1">调试信息:</div>
              {totalSupplyError && (
                <div className="text-xs">总供应量错误: {totalSupplyError.message}</div>
              )}
              {balanceError && (
                <div className="text-xs">余额错误: {balanceError.message}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}