'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/shared/components/ui/dialog'
import { Button } from '@/src/shared/components/ui/button'
import { User, Mail, Calendar, TrendingUp, DollarSign, BarChart3, UserCheck, UserX, X, Activity } from 'lucide-react'
import { UserData } from '../../types/users.types'
import { ROLE_COLORS } from '../../constants/users.constants'

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserData | null
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  return `Hace ${Math.floor(diffDays / 30)} meses`
}

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  if (!user) return null

  const roleColorClass = ROLE_COLORS[user.role as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800'

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between px-1 pb-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Detalles del Usuario
              </h3>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6">
          {/* Header del usuario */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.fullName}
                className="w-20 h-20 rounded-full border-4 border-gray-200"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white ${user.isActive ? 'bg-green-500' : 'bg-red-500'
                }`} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
              <p className="text-gray-600 text-lg">@{user.username}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColorClass}`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Miembro desde:</span>
                  <span className="font-medium">{formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Último acceso:</span>
                  <span className="font-medium">{formatTimeAgo(user.lastLoginAt || '')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Estadísticas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.stats.totalSimulations}
                  </div>
                  <div className="text-xs text-blue-700">Simulaciones</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center truncate">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(user.stats.totalInvested)}
                  </div>
                  <div className="text-xs text-green-700">Total Invertido</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {user.stats.averageReturn}%
                  </div>
                  <div className="text-xs text-purple-700">Retorno Promedio</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-orange-600">
                    {formatTimeAgo(user.stats.lastSimulation)}
                  </div>
                  <div className="text-xs text-orange-700">Última Simulación</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-sm text-gray-600">Última simulación creada</span>
                  <span className="text-sm font-medium">{formatTimeAgo(user.stats.lastSimulation)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-sm text-gray-600">Último inicio de sesión</span>
                  <span className="text-sm font-medium">{formatTimeAgo(user.lastLoginAt || '')}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Fecha de registro</span>
                  <span className="text-sm font-medium">{formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}