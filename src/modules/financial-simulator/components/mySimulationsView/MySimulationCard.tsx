"use client"

import { TrendingUp, MoreHorizontal, Eye, Edit2, Download, Trash2 } from "lucide-react"
import { Button } from "../../../../shared/components/ui/button"
import { Badge } from "../../../../shared/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../../../shared/components/ui/dropdown-menu"
import { SimulationCardProps } from "../../types/my-simulations.types"
import {
  STATUS_COLORS,
  STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  BUTTON_LABELS
} from "../../constants/my-simulations.constants"

export const MySimulationCard = ({
  simulation,
  onEdit,
  onDelete,
}: SimulationCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {simulation.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {simulation.currency}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="gap-2"
                onClick={() => onEdit(simulation.id)}
              >
                <Edit2 className="h-4 w-4" />
                {BUTTON_LABELS.edit}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-red-600"
                onClick={() => onDelete(simulation.id)}
              >
                <Trash2 className="h-4 w-4" />
                {BUTTON_LABELS.delete}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-4">

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Monto</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(simulation.amount, simulation.currency)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Rentabilidad</p>
            <p className="text-lg font-semibold text-green-600">
              {simulation.returnRate}%
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Duración:</p>
            <p className="font-medium text-gray-900">
              {simulation.termMonths} meses
            </p>
          </div>
          <div>
            <p className="text-gray-500">Método de pago:</p>
            <p className="font-medium text-gray-900">
              {PAYMENT_METHOD_LABELS[simulation.paymentMethod]}
            </p>
          </div>
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Fecha inicio:</p>
            <p className="font-medium text-gray-900">
              {formatDate(simulation.startDate)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Fecha fin:</p>
            <p className="font-medium text-gray-900">
              {formatDate(simulation.endDate)}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={STATUS_COLORS[simulation.status]}>
              {STATUS_LABELS[simulation.status]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t rounded-b-lg">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Creada: {formatDate(simulation.createdAt)}</span>
          <span>Actualizada: {formatDate(simulation.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}