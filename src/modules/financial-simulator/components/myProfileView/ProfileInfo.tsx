'use client'

import React from 'react'
import { Badge } from "@shared/components/ui/badge"
import { Button } from "@shared/components/ui/button"
import {
  User,
  Mail,
  Shield,
  Calendar,
  Settings,
  Edit,
} from 'lucide-react'
import { ProfileInfoProps } from '../../types/profile.types'

const InfoRow = ({
  label,
  value,
  icon: Icon,
  editable = false,
  onEdit
}: {
  label: string
  value: string | React.ReactNode
  icon: any
  editable?: boolean
  onEdit?: () => void
}) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
    </div>

    {editable && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="text-gray-400 hover:text-gray-600"
      >
        <Edit className="h-4 w-4" />
      </Button>
    )}
  </div>
)

export function ProfileInfo({ user, onEditField }: ProfileInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No disponible'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case 'super-admin': return 'Super Administrador'
      case 'admin': return 'Administrador'
      case 'supervisor': return 'Supervisor'
      case 'client': return 'Cliente'
      default: return 'Usuario'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Información Personal
        </h2>
        <Badge className="bg-blue-100 text-blue-800 pointer-events-none">
          ID: {user.id.toString().slice(0, 8)}...
        </Badge>
      </div>

      <div className="space-y-0">
        <InfoRow
          label="Nombre"
          value={user.firstName}
          icon={User}
          editable={true}
          onEdit={() => onEditField('firstName', user.firstName)}
        />

        <InfoRow
          label="Apellido"
          value={user.lastName}
          icon={User}
          editable={true}
          onEdit={() => onEditField('lastName', user.lastName ?? '')}
        />

        <InfoRow
          label="Nombre de Usuario"
          value={`@${user.username}`}
          icon={User}
          editable={true}
          onEdit={() => onEditField('username', user.username)}
        />

        <InfoRow
          label="Correo Electrónico"
          value={user.email}
          icon={Mail}
          editable={true}
          onEdit={() => onEditField('email', user.email)}
        />

        <InfoRow
          label="Rol en la Plataforma"
          value={
            <div className="flex items-center gap-2">
              <span>{getRoleDisplayName(user.role)}</span>
              <Badge className={
                user.role === 'super-admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'admin' ? 'bg-orange-100 text-orange-800' :
                    user.role === 'supervisor' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
              }>
                {user.role?.toUpperCase()}
              </Badge>
            </div>
          }
          icon={Shield}
        />

        <InfoRow
          label="Estado de la Cuenta"
          value={
            <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
              {user.isActive ? 'Activa' : 'Inactiva'}
            </Badge>
          }
          icon={Settings}
        />

        <InfoRow
          label="Último Acceso"
          value={formatDate(user.lastLoginAt)}
          icon={Calendar}
        />
      </div>
    </div >
  )
}