'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/shared/components/ui/dialog'
import { Button } from '@/src/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'
import { UserData } from '../../types/users.types'
import { ROLE_COLORS } from '../../constants/users.constants'

interface RoleChangeModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserData | null
  onConfirm: (user: UserData, newRole: string) => void
}

const AVAILABLE_ROLES = [
  { value: 'client', label: 'Cliente' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'admin', label: 'Administrador' }
]

export function RoleChangeModal({ isOpen, onClose, user, onConfirm }: RoleChangeModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    if (user) {
      setSelectedRole(user.role)
    }
  }, [user])

  const handleConfirm = async () => {
    if (!user || !selectedRole) return

    setIsLoading(true)
    try {
      await onConfirm(user, selectedRole)
      onClose()
    } catch (error) {
      console.error('Error changing role:', error)
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
          <DialogDescription>
            Estás a punto de cambiar el rol del usuario. Esta acción afectará los permisos y accesos del usuario.
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

          <div className="space-y-3">
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
              <Select 
                value={selectedRole} 
                onValueChange={setSelectedRole}
                disabled={isLoading}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ROLES.map((role) => (
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
            </div>

            {selectedRole && selectedRole !== user.role && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Vista previa del cambio:</strong>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentRoleColorClass}`}>
                      {user.role}
                    </span>
                    <span className="text-gray-500">→</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${newRoleColorClass}`}>
                      {selectedRole}
                    </span>
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
            disabled={!selectedRole || selectedRole === user.role || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Cambiando...' : 'Confirmar Cambio'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}