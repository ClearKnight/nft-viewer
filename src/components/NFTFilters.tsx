'use client'

import { useState } from 'react'

interface NFTFiltersProps {
  onSearchChange: (search: string) => void
  onSortChange: (sort: 'id' | 'name') => void
  totalCount: number
  filteredCount: number
}

export function NFTFilters({ onSearchChange, onSortChange, totalCount, filteredCount }: NFTFiltersProps) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'id' | 'name'>('id')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const handleSortChange = (value: 'id' | 'name') => {
    setSort(value)
    onSortChange(value)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="搜索 NFT 名称..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">排序:</label>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as 'id' | 'name')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="id">Token ID</option>
              <option value="name">名称</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">
            显示 {filteredCount} / {totalCount} 个
          </div>
        </div>
      </div>
    </div>
  )
}