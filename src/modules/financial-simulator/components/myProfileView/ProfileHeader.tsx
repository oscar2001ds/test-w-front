'use client'

import { Badge } from "@shared/components/ui/badge"
import {
  Shield,
  Clock,
  User,
} from 'lucide-react'
import { ProfileHeaderProps } from '../../types/profile.types'
import { formatCurrency } from "@/src/shared/utils/formatters"

const getRoleColor = (role?: string) => {
  switch (role) {
    case 'super-admin': return 'bg-red-100 text-red-800 hover:bg-red-200'
    case 'admin': return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    case 'supervisor': return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    case 'client': return 'bg-green-100 text-green-800 hover:bg-green-200'
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'ayer'
  if (diffDays < 7) return `hace ${diffDays} días`
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`
  return `hace ${Math.floor(diffDays / 365)} años`
}

export function ProfileHeader({
  user,
  stats,
}: ProfileHeaderProps) {
  const lastActivity = stats.lastActivity ? new Date(stats.lastActivity) : null

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header con gradiente - altura responsive */}
      <div className="relative h-54 sm:h-[250px] lg:h-36 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Layout responsive: vertical en mobile, horizontal en desktop */}
        <div className="relative flex h-full flex-col lg:flex-row lg:items-end gap-4 lg:gap-6 p-4 lg:p-0">
          
          {/* Avatar - centrado en mobile, izquierda en desktop */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}&backgroundColor=b6e3f4,c0aede,d1d4f9&accessories=eyepatch,kurt,prescription01&accessoriesProbability=100`}
                alt={user.fullName}
                className="w-full h-full object-cover border-4 border-white shadow-lg rounded-full bg-white lg:absolute lg:z-10 lg:ml-2 lg:mt-12"
              />
            </div>
          </div>

          {/* Información del usuario - centrada en mobile, izquierda en desktop */}
          <div className="text-center lg:text-left flex-1 lg:pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 lg:mb-2">
              {user.fullName}
            </h1>

            {/* Info básica - stack vertical en mobile, horizontal en desktop */}
            <div className="hidden sm:flex flex-col sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start items-center gap-2 sm:gap-3 text-sm text-white mb-3">
              <span className="font-medium">{user.email}</span>
              <span className="hidden sm:inline">•</span>
              <span>@{user.username}</span>

              {user.role && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <Badge className={getRoleColor(user.role)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role.replace('-', ' ').toUpperCase()}
                  </Badge>
                </>
              )}

              {user.isActive && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <Badge className="bg-green-100 text-green-800">
                    Activo
                  </Badge>
                </>
              )}
            </div>

            {/* Metadata - centrada en mobile, izquierda en desktop */}
            <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start items-center gap-2 sm:gap-6 lg:gap-10 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Miembro
              </div>

              {lastActivity && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Última actividad {formatTimeAgo(lastActivity)}</span>
                  <span className="sm:hidden">{formatTimeAgo(lastActivity)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats resumidas - responsive grid */}
      <div className="relative pb-4 sm:pb-6 px-4 sm:px-6 flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-gray-200">
        <div className="text-center p-2 sm:p-0">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
            {stats.totalSimulations}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Simulaciones</div>
        </div>

        <div className="text-center p-2 sm:p-0">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
            <span className="sm:hidden">{formatCurrency(stats.totalInvested).replace('COP$', '$')}</span>
            <span className="hidden sm:inline">{formatCurrency(stats.totalInvested)}</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Invertido</div>
        </div>

        <div className="text-center p-2 sm:p-0">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
            {stats.averageReturn.toFixed(1)}%
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="sm:hidden">Retorno</span>
            <span className="hidden sm:inline">Retorno Prom.</span>
          </div>
        </div>

        <div className="text-center p-2 sm:p-0">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
            {stats.activeDays}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="sm:hidden">Días</span>
            <span className="hidden sm:inline">Días Activos</span>
          </div>
        </div>
      </div>
    </div>
  )
}