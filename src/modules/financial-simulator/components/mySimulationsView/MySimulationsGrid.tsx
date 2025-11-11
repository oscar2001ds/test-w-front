"use client"

import { TrendingUp, Plus } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { MySimulationCard } from "./MySimulationCard"
import { SimulationItem, SimulationViewSettings } from "../../types/my-simulations.types"
import { EMPTY_STATE, BUTTON_LABELS } from "../../constants/my-simulations.constants"

interface MySimulationsGridProps {
  simulations: SimulationItem[]
  viewSettings: SimulationViewSettings
  isLoading: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onCreateFirst?: () => void
}

export const MySimulationsGrid = ({
  simulations,
  viewSettings,
  isLoading,
  onEdit,
  onDelete,
  onCreateFirst
}: MySimulationsGridProps) => {
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando simulaciones...</p>
      </div>
    )
  }

  if (simulations.length === 0) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
        <div className="max-w-md mx-auto">
          <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {EMPTY_STATE.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {EMPTY_STATE.description}
          </p>
          {onCreateFirst && (
            <Button 
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={onCreateFirst}
            >
              <Plus className="h-4 w-4" />
              {BUTTON_LABELS.createFirst}
            </Button>
          )}
        </div>
      </div>
    )
  }

  const gridClass = viewSettings.layout === 'grid' 
    ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
    : 'space-y-4'

  return (
    <div className={gridClass}>
      {simulations.map((simulation) => (
        <MySimulationCard
          key={simulation.id}
          simulation={simulation}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}