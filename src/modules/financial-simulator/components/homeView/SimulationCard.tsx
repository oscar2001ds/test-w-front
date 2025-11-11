"use client"

import { Calendar, TrendingUp } from "lucide-react"
import { UserSimulation } from "../../types/simulation.types"

interface SimulationCardProps {
  simulation: UserSimulation
  onClick?: (simulation: UserSimulation) => void
  editable?: boolean
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  paused: "bg-yellow-100 text-yellow-800"
}

const statusLabels = {
  active: "Activa",
  completed: "Completada",
  paused: "Pausada"
}

const paymentMethodLabels = {
  monthly: "Mensual",
  annual: "Anual"
}

export const SimulationCard = ({ simulation, onClick, editable }: SimulationCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount)
  }

  const handleClick = () => {
    onClick?.(simulation)
  }

  return (
    <div
      className={`flex-1 min-w-[320px] p-4 bg-gray-50 rounded-lg transition-colors border hover:border-blue-200 ${editable ? "cursor-pointer hover:bg-gray-100" : "cursor-default"}`}
      onClick={editable ? handleClick : undefined}
    >
      {/* Header con icono y status */}
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[simulation.status]}`}>
          {statusLabels[simulation.status]}
        </span>
      </div>

      {/* Título */}
      <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-10">
        {simulation.title}
      </h4>

      {/* Información principal */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Monto:</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(simulation.amount, simulation.currency)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Rentabilidad:</span>
          <span className="font-medium text-green-600">
            {simulation.returnRate}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Método:</span>
          <span className="font-medium text-gray-900">
            {paymentMethodLabels[simulation.paymentMethod]}
          </span>
        </div>
      </div>

      {/* Footer con fecha */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>Actualizada: {formatDate(simulation.lastUpdated)}</span>
        </div>
      </div>
    </div>
  )
}