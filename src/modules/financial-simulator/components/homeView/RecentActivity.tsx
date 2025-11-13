"use client"

import { Users } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { UserSimulation } from "../../types/simulation.types"
import { RECENT_ACTIVITY_EMPTY_STATE, SECTION_TITLES } from "../../constants/home-view.constants"
import { SimulationCard } from "./SimulationCard"

interface RecentActivityProps {
  recentSimulations: UserSimulation[]
  onViewAllSimulations: () => void
  isLoading: boolean
}

export const RecentActivity = ({ 
  recentSimulations, 
  onViewAllSimulations, 
  isLoading 
}: RecentActivityProps) => {
  const handleSimulationClick = (simulation: UserSimulation) => {
    // TODO: Implementar navegación a la simulación específica
    console.log('Navegando a simulación:', simulation.id)
  }

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{SECTION_TITLES.recentActivity}</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onViewAllSimulations}
        >
          {RECENT_ACTIVITY_EMPTY_STATE.buttonText}
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm">Cargando simulaciones...</p>
        </div>
      ) : recentSimulations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">{RECENT_ACTIVITY_EMPTY_STATE.title}</p>
          <p className="text-sm">{RECENT_ACTIVITY_EMPTY_STATE.description}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {recentSimulations.map((simulation) => (
            <SimulationCard 
              key={simulation.id}
              simulation={simulation}
              onClick={handleSimulationClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}