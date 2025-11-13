'use user'

import React from 'react'
import { Eye, Edit, UserCheck, UserX } from 'lucide-react'
import { UserData } from '../../types/users.types'
import { ROLE_COLORS } from '../../constants/users.constants'
import { formatCurrency, formatPercentage } from '@/src/shared/utils/formatters'

interface UserCardProps {
  user: UserData
  onEdit: (user: UserData) => void
  onViewDetails: (user: UserData) => void
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

export function UserCard({ user, onEdit, onViewDetails }: UserCardProps) {
  const roleColorClass = ROLE_COLORS[user.role as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800'

  return (
    <div className="flex-1 min-w-[250px] sm:min-w-[400px] bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
      <div className="p-6">
        {/* Header con avatar y acciones */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.fullName}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              <div className={`absolute bottom-1 right-2 w-4 h-4 rounded-full border-2 border-white ${user.isActive ? 'bg-green-500' : 'bg-red-500'
                }`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{user.fullName}</h3>
              <p className="text-gray-600 text-sm">@{user.username}</p>
              <p className="text-gray-500 text-xs">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
              {user.isActive ? <UserCheck className="h-3 w-3 mr-1 inline" /> : <UserX className="h-3 w-3 mr-1 inline" />}
              {user.isActive ? 'Activo' : 'Inactivo'}
            </span>

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColorClass}`}>
              {user.role}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="flex flex-1 flex-wrap gap-4 mb-4 w-full">
          <div className="flex-1 min-w-[200px] bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{user.stats.totalSimulations}</div>
            <div className="text-xs text-blue-700">Simulaciones</div>
          </div>
          <div className="flex-1 min-w-[200px] bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(user.stats.totalInvested)}</div>
            <div className="text-xs text-green-700">Invertido</div>
          </div>
          <div className="flex-1 min-w-[200px] bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{formatPercentage(user.stats.averageReturn)}</div>
            <div className="text-xs text-purple-700">Retorno Prom.</div>
          </div>
          <div className="flex-1 min-w-[200px] bg-orange-50 rounded-lg p-3 text-center">
            <div className="text-sm font-semibold text-orange-600">{formatTimeAgo(user.lastLoginAt || '')}</div>
            <div className="text-xs text-orange-700">Último acceso</div>
          </div>
        </div>

        {/* Metadata */}
        <div className="text-xs text-gray-500 mb-4 space-y-1">
          <div className="flex items-center justify-between">
            <span>Miembro desde:</span>
            <span>{formatTimeAgo(user.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Última simulación:</span>
            <span>{formatTimeAgo(user.stats.lastSimulation)}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(user)}
            className="flex-1 flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </button>
          <button
            onClick={() => onEdit(user)}
            className="flex-1 flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </button>
        </div>
      </div>
    </div>
  )
}