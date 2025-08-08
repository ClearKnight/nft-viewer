'use client'

import { useState } from 'react'

interface NFTContract {
  name: string
  address: string
  symbol: string
  description?: string
}

const popularNFTs: NFTContract[] = [
  {
    name: "Bored Ape Yacht Club",
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    symbol: "BAYC",
    description: "最著名的 NFT 项目之一"
  },
  {
    name: "CryptoPunks",
    address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    symbol: "PUNKS",
    description: "最早的 NFT 项目"
  },
  {
    name: "Doodles",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    symbol: "DOODLE",
    description: "彩色涂鸦风格 NFT"
  },
  {
    name: "Azuki",
    address: "0xED5AF388653567Af7F388a6234A7Dd8c4E3E28c8",
    symbol: "AZUKI",
    description: "日式动漫风格 NFT"
  },
  {
    name: "Moonbirds",
    address: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    symbol: "MOONBIRD",
    description: "猫头鹰主题 NFT"
  }
]

interface ContractSelectorProps {
  contractAddress: string
  onContractChange: (address: string) => void
}

export function ContractSelector({ contractAddress, onContractChange }: ContractSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const filteredNFTs = popularNFTs.filter(nft =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectNFT = (nft: NFTContract) => {
    onContractChange(nft.address)
    setSearchTerm('')
    setShowCustomInput(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">选择 NFT 合约</h3>
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showCustomInput ? '选择热门' : '自定义地址'}
        </button>
      </div>

      {showCustomInput ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              合约地址
            </label>
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => onContractChange(e.target.value)}
              placeholder="输入 ERC-721 合约地址 (0x...)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="搜索 NFT 项目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredNFTs.map((nft) => (
              <button
                key={nft.address}
                onClick={() => selectNFT(nft)}
                className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                  contractAddress === nft.address
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{nft.name}</div>
                    <div className="text-sm text-blue-600 font-medium">{nft.symbol}</div>
                    {nft.description && (
                      <div className="text-xs text-gray-500 mt-1">{nft.description}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-2 font-mono">
                      {nft.address.slice(0, 8)}...{nft.address.slice(-6)}
                    </div>
                  </div>
                  {contractAddress === nft.address && (
                    <div className="text-blue-500">
                      ✓
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}