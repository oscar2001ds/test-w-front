'use client'

import React from 'react'
import { Grid, List, RefreshCw, Search, X } from 'lucide-react'
import {
  UserFilters as UserFiltersType,
} from '../../types/users.types'
import { STATUS_OPTIONS } from '../../constants/users.constants'

interface UserFiltersProps {
  filters: UserFiltersType
  onFiltersChange: (newFilters: Partial<UserFiltersType>) => void
  onLayoutChange: (layout: 'cards' | 'list') => void
  onRefresh: () => Promise<void>
  isLoading: boolean
  viewSettings: {
    layout: 'cards' | 'list'
  }
}

export function UserFilters({
  filters,
  onFiltersChange,
  onLayoutChange,
  onRefresh,
  isLoading,
  viewSettings
}: UserFiltersProps) {
  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.status !== 'all'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Filter Row */}
        <div className="flex w-full flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o username..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtro por estado */}
        <select
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.status}
          onChange={(e) => onFiltersChange({ status: e.target.value as UserFiltersType['status'] })}
        >
          {STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onLayoutChange('cards')}
              className={`p-2 ${viewSettings.layout === 'cards'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onLayoutChange('list')}
              className={`p-2 ${viewSettings.layout === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </div>
    </div>
  )
}