'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/shared/components/ui/dialog'
import { Button } from '@/src/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'
import { UserData } from '../../types/users.types'
import { ROLE_COLORS } from '../../constants/users.constants'
import { useAuth } from "@/src/core/context/AuthContext"
import { UserRole } from '@/src/modules/auth'

interface EditionModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserData | null
  onConfirm: (user: UserData, updates: { role?: string; isActive?: boolean }) => void
}

// Función para obtener roles disponibles según el rol del usuario actual
const getAvailableRoles = (currentUserRole: string) => {
  const allRoles = [
    { value: UserRole.Client, label: 'Cliente', level: 1 },
    { value: UserRole.Supervisor, label: 'Supervisor', level: 1 },
    { value: UserRole.Admin, label: 'Administrador', level: 2 },
    { value: UserRole.SuperAdmin, label: 'Super Administrador', level: 3 },
  ]

  const currentUserLevel = allRoles.find(role => role.value === currentUserRole)?.level || 1

  return allRoles.filter(role => role.level < currentUserLevel)
}

export function EditionModal({ isOpen, onClose, user, onConfirm }: EditionModalProps) {
  const { user: currentUser } = useAuth()
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    if (user) {
      setSelectedRole(user.role)
      setSelectedStatus(user.isActive)
    }
  }, [user])

  const handleConfirm = async () => {
    if (!user) return

    const updates: { role?: string; isActive?: boolean } = {}
    
    if (selectedRole !== user.role) {
      updates.role = selectedRole
    }
    
    if (selectedStatus !== user.isActive) {
      updates.isActive = selectedStatus
    }

    // Si no hay cambios, no hacer nada
    if (Object.keys(updates).length === 0) {
      onClose()
      return
    }

    setIsLoading(true)
    try {
      await onConfirm(user, updates)
      onClose()
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  if (!user) return null

  const currentRoleColorClass = ROLE_COLORS[user.role as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800'
  const newRoleColorClass = ROLE_COLORS[selectedRole as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800'
  const availableRoles = getAvailableRoles(currentUser?.role || 'client')
  
  const hasRoleChange = selectedRole !== user.role
  const hasStatusChange = selectedStatus !== user.isActive
  const hasChanges = hasRoleChange || hasStatusChange

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Puedes cambiar el rol y estado del usuario. Los cambios afectarán los permisos y accesos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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

          <div className="space-y-4">
            {/* Información del usuario */}
            <div>
              <label className="text-sm font-medium text-gray-700">Estado Actual</label>
              <div className="mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Nuevo Estado</label>
              <Select 
                value={selectedStatus.toString()} 
                onValueChange={(value) => setSelectedStatus(value === 'true')}
                disabled={isLoading}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  </SelectItem>
                  <SelectItem value="false">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Inactivo
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Rol Actual</label>
              <div className="mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentRoleColorClass}`}>
                  {user.role}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Nuevo Rol</label>
              {availableRoles.length > 0 ? (
                <Select 
                  value={selectedRole} 
                  onValueChange={setSelectedRole}
                  disabled={isLoading}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Roles disponibles para cambio */}
                    {availableRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ROLE_COLORS[role.value as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {role.label}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="mt-1 p-2 text-sm text-gray-500 bg-gray-50 rounded">
                  No tienes permisos para cambiar el rol de este usuario
                </div>
              )}
            </div>

            {/* Vista previa de cambios */}
            {hasChanges && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Vista previa de cambios:</strong>
                  <div className="mt-2 space-y-2">
                    {hasStatusChange && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                        <span className="text-gray-500">→</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedStatus ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    )}
                    {hasRoleChange && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Rol:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentRoleColorClass}`}>
                          {user.role}
                        </span>
                        <span className="text-gray-500">→</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${newRoleColorClass}`}>
                          {selectedRole}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!hasChanges || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Guardando...' : 'Confirmar Cambios'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}