"use client"

import { Search, Filter, Grid3X3, List } from "lucide-react"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { SimulationFilters, SimulationViewSettings } from "../../types/my-simulations.types"
import { 
  FILTER_LABELS, 
  STATUS_OPTIONS
} from "../../constants/my-simulations.constants"

interface MySimulationsFiltersProps {
  filters: SimulationFilters
  viewSettings: SimulationViewSettings
  onSearchChange: (search: string) => void
  onStatusChange: (status: SimulationFilters['status']) => void
  onLayoutChange: (layout: 'grid' | 'list') => void
}

export const MySimulationsFilters = ({
  filters,
  viewSettings,
  onSearchChange,
  onStatusChange,
  onLayoutChange
}: MySimulationsFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder={FILTER_LABELS.search}
              className="pl-10"
              value={filters.search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filtro por estado */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.status}
            onChange={(e) => onStatusChange(e.target.value as SimulationFilters['status'])}
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          

          
          {/* Toggle de vista */}
          <div className="flex border rounded-lg">
            <Button 
              variant={viewSettings.layout === 'grid' ? 'default' : 'ghost'}
              size="sm" 
              className="border-r"
              onClick={() => onLayoutChange('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewSettings.layout === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onLayoutChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}