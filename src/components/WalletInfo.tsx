'use client'

import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect } from 'react'

export function WalletInfo() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: ethBalance } = useBalance({
    address: address,
    query: {
      enabled: !!address && isConnected && mounted,
    },
  })

  if (!mounted || !isConnected) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">钱包信息</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">地址:</span>
              <code className="text-sm bg-white px-2 py-1 rounded border">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </code>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">余额:</span>
              <span className="text-lg font-bold text-blue-900">
                {ethBalance ? `${parseFloat(ethBalance.formatted).toFixed(4)} ETH` : 'Loading...'}
              </span>
            </div>
          </div>
        </div>
        <div className="text-4xl">
          💰
        </div>
      </div>
    </div>
  )
}