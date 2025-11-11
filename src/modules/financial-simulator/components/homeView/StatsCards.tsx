"use client"

import { StatCardData } from "../../types/home-view.types"

interface StatsCardsProps {
  statsCards: StatCardData[]
}

const colorSchemeClasses = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600"
}

export const StatsCards = ({ statsCards }: StatsCardsProps) => {
  return (
    <div className="flex flex-1 flex-wrap gap-6">
      {statsCards.map((card) => {
        const Icon = card.icon
        const colorClasses = colorSchemeClasses[card.colorScheme]

        return (
          <div key={card.id} className="bg-white rounded-lg p-6 shadow-sm border flex-1 min-w-[300px]">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorClasses}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-gray-900 truncate">{card.value}</p>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}