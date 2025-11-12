'use client'

import React from 'react'
import { Eye, Edit, UserCheck, UserX } from 'lucide-react'
import { UserData } from '../../types/users.types'
import { ROLE_COLORS } from '../../constants/users.constants'

interface UsersListProps {
  users: UserData[]
  onEditRole: (user: UserData) => void
  onViewDetails: (user: UserData) => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
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

export function UsersList({ users, onEditRole, onViewDetails }: UsersListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Usuario</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Estado</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Rol</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Simulaciones</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Invertido</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Último Acceso</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const roleColorClass = ROLE_COLORS[user.role as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800'
              
              return (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full border border-gray-200"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColorClass}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {user.stats.totalSimulations}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(user.stats.totalInvested)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-600">
                      {formatTimeAgo(user.lastLoginAt || '')}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewDetails(user)}
                        className="inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </button>
                      <button
                        onClick={() => onEditRole(user)}
                        className="inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-500">No se encontraron usuarios</div>
        </div>
      )}
    </div>
  )
}