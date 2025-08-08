'use client'

import { useState, useMemo } from 'react'
import { NFTCard } from './NFTCard'
import { NFTFilters } from './NFTFilters'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'
import { EmptyState } from './EmptyState'

interface NFT {
  tokenId: bigint
  tokenURI?: string
  metadata?: {
    name?: string
    description?: string
    image?: string
    attributes?: Array<{
      trait_type: string
      value: string | number
    }>
  }
}

interface NFTGridProps {
  nfts: NFT[]
  isLoading: boolean
  error: string
  onRetry?: () => void
}

export function NFTGrid({ nfts, isLoading, error, onRetry }: NFTGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id')

  // 过滤和排序 NFTs
  const filteredAndSortedNFTs = useMemo(() => {
    let filtered = nfts

    // 搜索过滤
    if (searchTerm) {
      filtered = nfts.filter(nft => {
        const name = nft.metadata?.name || `NFT #${nft.tokenId}`
        return name.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    // 排序
    filtered.sort((a, b) => {
      if (sortBy === 'id') {
        return Number(a.tokenId) - Number(b.tokenId)
      } else {
        const nameA = a.metadata?.name || `NFT #${a.tokenId}`
        const nameB = b.metadata?.name || `NFT #${b.tokenId}`
        return nameA.localeCompare(nameB)
      }
    })

    return filtered
  }, [nfts, searchTerm, sortBy])

  if (error) {
    return (
      <ErrorMessage
        title="获取 NFT 失败"
        message={error}
        onRetry={onRetry}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <LoadingSpinner size="lg" text="正在加载你的 NFT..." />
        
        {/* 加载骨架屏 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (nfts.length === 0) {
    return (
      <EmptyState
        icon="🖼️"
        title="暂无 NFT"
        description="请先选择一个合约地址，然后点击获取按钮来查看你的 NFT 收藏"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* 过滤器 */}
      <NFTFilters
        onSearchChange={setSearchTerm}
        onSortChange={setSortBy}
        totalCount={nfts.length}
        filteredCount={filteredAndSortedNFTs.length}
      />

      {/* NFT 网格 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {filteredAndSortedNFTs.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="没有找到匹配的 NFT"
            description={`没有找到包含 "${searchTerm}" 的 NFT，请尝试其他搜索词`}
            action={{
              text: "清除搜索",
              onClick: () => setSearchTerm('')
            }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                你的 NFT 收藏
              </h3>
              <div className="text-sm text-gray-500">
                显示 {filteredAndSortedNFTs.length} / {nfts.length} 个
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedNFTs.map((nft, index) => (
                <NFTCard
                  key={`${nft.tokenId}-${index}`}
                  tokenId={nft.tokenId}
                  tokenURI={nft.tokenURI}
                  metadata={nft.metadata}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}