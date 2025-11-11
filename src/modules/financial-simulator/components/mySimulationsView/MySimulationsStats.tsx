"use client"

import { TrendingUp, DollarSign, Calendar } from "lucide-react"
import { SimulationStats } from "../../types/my-simulations.types"
import { STATS_LABELS } from "../../constants/my-simulations.constants"

interface MySimulationsStatsProps {
  stats: SimulationStats
}

const StatCard = ({
  icon,
  label,
  value,
  valueColor,
  bgColor
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  valueColor: string
  bgColor: string
}) => (
  <div className="bg-white p-4 rounded-lg border shadow-sm flex-1 min-w-[200px]">
    <div className="flex items-center gap-3">
      <div className={`p-2 ${bgColor} rounded-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  </div>
)

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
    <div className="flex flex-1 flex-wrap gap-6">
      <StatCard
        icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
        label={STATS_LABELS.totalSimulations}
        value={stats.totalSimulations}
        valueColor="text-gray-900"
        bgColor="bg-blue-100"
      />
      <StatCard
        icon={<DollarSign className="h-5 w-5 text-green-600" />}
        label={STATS_LABELS.totalAmount}
        value={formatCurrency(stats.totalAmount)}
        valueColor="text-gray-900"
        bgColor="bg-green-100"
      />
      <StatCard
        icon={<Calendar className="h-5 w-5 text-green-600" />}
        label={STATS_LABELS.activeSimulations}
        value={stats.activeSimulations}
        valueColor="text-green-600"
        bgColor="bg-green-100"
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
        label={STATS_LABELS.averageReturn}
        value={formatPercentage(stats.averageReturn)}
        valueColor="text-purple-600"
        bgColor="bg-purple-100"
      />
    </div>
  )

}