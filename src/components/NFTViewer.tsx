'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { WalletInfo } from './WalletInfo'
import { ContractSelector } from './ContractSelector'
import { ContractInfo } from './ContractInfo'
import { NFTGrid } from './NFTGrid'

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

export function NFTViewer() {
  const { address, isConnected } = useAccount()
  const [contractAddress, setContractAddress] = useState('')
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchNFTs = async () => {
    if (!contractAddress || !address || !isConnected) return

    setIsLoading(true)
    setError('')
    setNfts([])

    try {
      // 首先获取用户的余额
      const balanceResponse = await fetch(`/api/nft/balance?contract=${contractAddress}&owner=${address}`)
      const balanceData = await balanceResponse.json()
      
      if (balanceData.error) {
        throw new Error(balanceData.error)
      }

      const balanceNum = Number(balanceData.balance || 0)
      
      if (balanceNum === 0) {
        setNfts([])
        return
      }

      const userNFTs: NFT[] = []
      
      // 获取用户的 NFT token IDs
      for (let i = 0; i < balanceNum; i++) {
        try {
          // 获取指定索引的 token ID
          const tokenIdResponse = await fetch(`/api/nft/token-of-owner-by-index?contract=${contractAddress}&owner=${address}&index=${i}`)
          const tokenIdData = await tokenIdResponse.json()

          if (tokenIdData.tokenId) {
            // 获取 token URI
            const tokenURIResponse = await fetch(`/api/nft/token-uri?contract=${contractAddress}&tokenId=${tokenIdData.tokenId}`)
            const tokenURIData = await tokenURIResponse.json()

            let metadata: Record<string, unknown> = {}
            if (tokenURIData.tokenURI) {
              try {
                // 处理 IPFS URLs
                const ipfsUrl = tokenURIData.tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
                const metadataResponse = await fetch(ipfsUrl)
                metadata = await metadataResponse.json()
                
                // 处理元数据中的 IPFS 图片链接
                if (metadata.image && typeof metadata.image === 'string' && metadata.image.startsWith('ipfs://')) {
                  metadata.image = metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                }
              } catch (metadataError) {
                console.warn('获取元数据失败 for token', tokenIdData.tokenId, metadataError)
              }
            }

            userNFTs.push({
              tokenId: BigInt(tokenIdData.tokenId),
              tokenURI: tokenURIData.tokenURI,
              metadata,
            })
          }
        } catch (tokenError) {
          console.warn('获取 token 失败', i, tokenError)
        }
      }

      setNfts(userNFTs)
    } catch (fetchError) {
      console.error('获取 NFTs 失败:', fetchError)
      setError('获取 NFT 失败，请检查合约地址是否正确')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* 欢迎区域 */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🖼️ NFT Viewer
            </h1>
            <p className="text-lg text-gray-600">
              连接钱包，查看你的 NFT 收藏
            </p>
          </div>

          {/* 钱包信息 */}
          {isConnected && <WalletInfo />}

          {/* 主要内容 */}
          {isConnected ? (
            <div className="space-y-8">
              {/* 合约选择器 */}
              <ContractSelector
                contractAddress={contractAddress}
                onContractChange={setContractAddress}
              />

              {/* 合约信息 */}
              {contractAddress && (
                <ContractInfo
                  contractAddress={contractAddress}
                  onFetchNFTs={fetchNFTs}
                  isLoading={isLoading}
                />
              )}

              {/* NFT 网格 */}
              <NFTGrid
                nfts={nfts}
                isLoading={isLoading}
                error={error}
              />
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                连接钱包开始使用
              </h3>
              <p className="text-gray-600 mb-6">
                请先连接你的 Web3 钱包来查看 NFT 收藏
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 