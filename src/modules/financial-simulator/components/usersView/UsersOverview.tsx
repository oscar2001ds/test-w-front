'use client'

import React from 'react'
import { Users, UserCheck, TrendingUp, DollarSign } from 'lucide-react'
import { UsersOverviewStats } from '../../types/users.types'
import { formatCurrency, formatPercentage } from '@/src/shared/utils/formatters'

interface UsersOverviewProps {
  stats: UsersOverviewStats
  isLoading?: boolean
}

export function UsersOverview({ stats, isLoading = false }: UsersOverviewProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Usuarios Totales',
      value: stats.totalUsers,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-200'
    },
    {
      title: 'Activos',
      value: stats.activeUsers,
      icon: UserCheck,
      gradient: 'from-green-500 to-green-600',
      iconColor: 'text-green-200'
    },
    {
      title: 'Inversión Total',
      value: formatCurrency(stats.totalInvestments),
      icon: DollarSign,
      gradient: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-200'
    },
    {
      title: 'Retorno Promedio',
      value: formatPercentage(stats.averageReturn),
      icon: TrendingUp,
      gradient: 'from-orange-500 to-orange-600',
      iconColor: 'text-orange-200'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} text-white rounded-lg p-4 transform hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-white opacity-90 text-sm">{stat.title}</div>
                </div>
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}