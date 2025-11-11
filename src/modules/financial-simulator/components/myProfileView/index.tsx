'use client'

import { User } from 'lucide-react'
import { ProfileHeader } from './ProfileHeader'
import { ProfileInfo } from './ProfileInfo'
import { EditFieldModal } from './EditFieldModal'
import { useMyProfileView } from '../../hooks/useMyProfileView'
import { PAGE_TITLES } from '../../constants/my-profile.constants'

export default function ProfileView() {
  const {
    profileData,
    isLoading,
    error,
    editModalState,
    updateProfile,
    refreshProfile,
    openEditModal,
    closeEditModal,
    saveFieldEdit
  } = useMyProfileView()
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Error al cargar el perfil
            </h2>
            <p className="text-red-700 mb-4">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="h-32 bg-gray-300 animate-pulse" />
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="h-32 w-32 bg-gray-300 rounded-full animate-pulse" />
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-300 rounded animate-pulse w-1/3" />
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2" />
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-300 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="h-12 bg-gray-300 rounded animate-pulse w-1/4 mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-10 bg-gray-300 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6 bg-gray-50 p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{PAGE_TITLES.title}</h1>
          <p className="text-gray-600">
            {PAGE_TITLES.subtitle}
          </p>
        </div>
      </div>

      {/* Profile Header - Siempre visible */}
      <ProfileHeader
        user={profileData}
        stats={profileData.stats}
      />

      {/* Main Content */}
      <ProfileInfo 
        user={profileData} 
        onEditField={openEditModal}
      />

      {/* Edit Field Modal */}
      <EditFieldModal
        isOpen={editModalState.isOpen}
        field={editModalState.field}
        currentValue={editModalState.currentValue}
        onSave={saveFieldEdit}
        onClose={closeEditModal}
        isLoading={isLoading}
      />

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200 bg-white rounded-lg">
        <p className="text-sm text-gray-500">
          ¿Necesitas ayuda? {' '}
          <a href="/support" className="text-blue-600 hover:underline pointer-events-none">
            Yo también 🥲
          </a>
        </p>
      </div>
    </div>
  )
}