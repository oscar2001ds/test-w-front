"use client"

import { Plus, RefreshCw } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { PAGE_TITLES, BUTTON_LABELS } from "../../constants/my-simulations.constants"

interface MySimulationsHeaderProps {
  onCreateSimulation: () => void
  onRefresh: () => void
  isLoading?: boolean
}

export const MySimulationsHeader = ({ 
  onCreateSimulation, 
  onRefresh, 
  isLoading = false 
}: MySimulationsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{PAGE_TITLES.title}</h1>
        <p className="text-gray-600 mt-1">
          {PAGE_TITLES.subtitle}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {BUTTON_LABELS.refresh}
        </Button>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={onCreateSimulation}
        >
          <Plus className="h-4 w-4" />
          {BUTTON_LABELS.newSimulation}
        </Button>
      </div>
    </div>
  )
}