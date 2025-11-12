'use client'

import React, { useState } from 'react'
import { UserData } from '../../types/users.types'
import { useUsersView } from '../../hooks/useUsersView'
import { PAGE_TITLES } from '../../constants/users.constants'
import { UsersOverview } from './UsersOverview'
import { UserFilters } from './UserFilters'
import { UserCard } from './UserCard'
import { UsersList } from './UsersList'
import { RoleChangeModal } from './RoleChangeModal'
import { UserDetailsModal } from './UserDetailsModal'
import { UserRole } from '@/src/modules/auth'

interface UsersViewProps {
  userRole: UserRole
}

export default function UsersView({ userRole }: UsersViewProps) {
  const {
    users,
    filteredUsers,
    filters,
    overviewStats,
    isLoading,
    updateFilters,
    changeUserRole
  } = useUsersView(userRole)

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  const pageTitle = PAGE_TITLES[userRole]

  const handleEditRole = (user: UserData) => {
    setSelectedUser(user)
    setShowRoleModal(true)
  }

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
  }

  const handleRoleChange = async (user: UserData, newRole: string) => {
    try {
      await changeUserRole(user.id, newRole)
      setShowRoleModal(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error changing user role:', error)
    }
  }

  const handleCloseModals = () => {
    setShowRoleModal(false)
    setShowDetailsModal(false)
    setSelectedUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="p-6 mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {pageTitle.title}
            </h1>
            <p className="text-gray-600 mt-1">
              {pageTitle.subtitle}
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8">
          <UsersOverview
            stats={overviewStats}
            isLoading={isLoading}
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex-1">
          <UserFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onLayoutChange={setViewMode}
            onRefresh={() => Promise.resolve()}
            isLoading={isLoading}
            viewSettings={{ layout: viewMode }}
          />
        </div>

        {/* Users Display */}
        {viewMode === 'cards' ? (
          <div className="flex flex-1 flex-wrap gap-6">
            {filteredUsers.map((user: UserData) => (
              <UserCard
                key={user.id}
                user={user}
                onEditRole={handleEditRole}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <UsersList
            users={filteredUsers}
            onEditRole={handleEditRole}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No se encontraron {userRole} con los filtros aplicados
            </div>
            <p className="text-gray-400 mt-2">
              Intenta ajustar los filtros para encontrar más resultados
            </p>
          </div>
        )}

        {/* Modals */}
        <RoleChangeModal
          isOpen={showRoleModal}
          onClose={handleCloseModals}
          user={selectedUser}
          onConfirm={handleRoleChange}
        />

        <UserDetailsModal
          isOpen={showDetailsModal}
          onClose={handleCloseModals}
          user={selectedUser}
        />
      </div>
    </div>
  )
}