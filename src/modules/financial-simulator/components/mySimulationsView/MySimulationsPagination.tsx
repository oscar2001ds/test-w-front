"use client"

import { Button } from "@/src/shared/components/ui/button"
import { SimulationViewSettings } from "../../types/my-simulations.types"
import { BUTTON_LABELS } from "../../constants/my-simulations.constants"

interface MySimulationsPaginationProps {
  viewSettings: SimulationViewSettings
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
}

export const MySimulationsPagination = ({
  viewSettings,
  totalPages,
  totalItems,
  onPageChange
}: MySimulationsPaginationProps) => {
  
  if (totalPages <= 1) return null

  const { currentPage, itemsPerPage } = viewSettings
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const maxVisible = 5
    const pages = []
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()
  const showFirstPage = visiblePages[0] > 1
  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Mostrando {startIndex}-{endIndex} de {totalItems} simulaciones
      </p>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {BUTTON_LABELS.previous}
        </Button>
        
        {showFirstPage && (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPageChange(1)}
            >
              1
            </Button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}
        
        {visiblePages.map(page => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={page === currentPage ? "bg-blue-600 text-white" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        
        {showLastPage && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {BUTTON_LABELS.next}
        </Button>
      </div>
    </div>
  )
}