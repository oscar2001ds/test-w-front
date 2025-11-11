"use client"

import { TrendingUp, DollarSign, Calendar } from "lucide-react"
import { SimulationStats } from "../../types/my-simulations.types"
import { STATS_LABELS } from "../../constants/my-simulations.constants"

interface MySimulationsStatsProps {
  stats: SimulationStats
}

export const MySimulationsStats = ({ stats }: MySimulationsStatsProps) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}k`
    }
    return `$${amount.toLocaleString()}`
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{STATS_LABELS.totalSimulations}</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalSimulations}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{STATS_LABELS.totalAmount}</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.totalAmount)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{STATS_LABELS.activeSimulations}</p>
            <p className="text-2xl font-bold text-green-600">{stats.activeSimulations}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{STATS_LABELS.averageReturn}</p>
            <p className="text-2xl font-bold text-purple-600">
              {formatPercentage(stats.averageReturn)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}