'use client'

import { useState } from 'react'

interface NFTMetadata {
  name?: string
  description?: string
  image?: string
  attributes?: Array<{
    trait_type: string
    value: string | number
  }>
}

interface NFTCardProps {
  tokenId: bigint
  tokenURI?: string
  metadata?: NFTMetadata
}

export function NFTCard({ tokenId, tokenURI, metadata }: NFTCardProps) {
  const [imageError, setImageError] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* 图片区域 */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {metadata?.image && !imageError ? (
          <img
            src={metadata.image}
            alt={metadata.name || `NFT #${tokenId}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm">暂无图片</div>
            </div>
          </div>
        )}
        
        {/* Token ID 标签 */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          #{tokenId.toString()}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 truncate">
          {metadata?.name || `NFT #${tokenId}`}
        </h4>
        
        {metadata?.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {metadata.description}
          </p>
        )}

        {/* 属性预览 */}
        {metadata?.attributes && metadata.attributes.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {metadata.attributes.slice(0, 2).map((attr, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {attr.trait_type}: {attr.value}
                </span>
              ))}
              {metadata.attributes.length > 2 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{metadata.attributes.length - 2} 更多
                </span>
              )}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showDetails ? '隐藏详情' : '查看详情'}
          </button>
          {tokenURI && (
            <a
              href={tokenURI.startsWith('ipfs://') ? tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/') : tokenURI}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              元数据
            </a>
          )}
        </div>

        {/* 详细信息 */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Token ID:</span>
                <span className="ml-2 text-gray-600">{tokenId.toString()}</span>
              </div>
              {tokenURI && (
                <div>
                  <span className="font-medium text-gray-700">Token URI:</span>
                  <div className="mt-1 text-xs text-gray-500 break-all font-mono bg-gray-50 p-2 rounded">
                    {tokenURI}
                  </div>
                </div>
              )}
              
              {/* 完整属性列表 */}
              {metadata?.attributes && metadata.attributes.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">属性:</span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {metadata.attributes.map((attr, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                        <div className="font-medium text-gray-700">{attr.trait_type}</div>
                        <div className="text-gray-600">{attr.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}