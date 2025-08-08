'use client'

import { WalletConnect } from './WalletConnect'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🖼️ NFT Viewer
            </h1>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              学习版
            </span>
          </div>
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}