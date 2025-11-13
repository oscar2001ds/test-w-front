"use client"

import { useState, useEffect, useCallback } from "react"
import { MyProfileHookReturn, ProfileData, EditModalState, EditableField } from "../types/profile.types"
import { userService, UpdateUserPayload } from "@/src/modules/financial-simulator/services/user.service"
import { simulationService } from "../services/simulation.service"
import { useAuth } from "@/src/core/context/AuthContext"
import { useToast } from "@/src/shared"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/my-profile.constants"

export const useMyProfileView = (): MyProfileHookReturn => {
  // Estados principales
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { showSuccess, showError } = useToast()
  
  // Estado del modal de edición
  const [editModalState, setEditModalState] = useState<EditModalState>({
    isOpen: false,
    field: null,
    currentValue: '',
    newValue: ''
  })

  // Función para obtener estadísticas de simulaciones
  const fetchStats = useCallback(async (userId: string) => {
    try {
      const stats = await simulationService.getUserSimulationStats(userId)
      return {
        totalSimulations: stats.totalSimulations,
        totalInvested: stats.totalInvested,
        averageReturn: stats.averageReturn,
        activeDays: stats.activeDays || 0,
        activeSimulations: stats.activeSimulations,
        memberSince: new Date().toISOString(),
        lastActivity: user?.lastLoginAt || new Date().toISOString()
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      // Retornar stats por defecto si hay error
      return {
        totalSimulations: 0,
        totalInvested: 0,
        averageReturn: 0,
        activeDays: 0,
        activeSimulations: 0,
        memberSince: new Date().toISOString(),
        lastActivity: user?.lastLoginAt || new Date().toISOString()
      }
    }
  }, [user])

  // Función para cargar el perfil completo
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setError("Usuario no autenticado")
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Obtener estadísticas de simulaciones
      const stats = await fetchStats(user.id)

      // Crear el perfil completo combinando user + stats
      const fullProfile: ProfileData = {
        ...user,
        stats
      }

      setProfileData(fullProfile)
    } catch (err) {
      console.error('Error fetching profile:', err)
      showError(ERROR_MESSAGES.loadProfile)
    } finally {
      setIsLoading(false)
    }
  }, [user, fetchStats])

  // Función para actualizar el perfil
  const updateProfile = useCallback(async (data: UpdateUserPayload) => {
    if (!user || !profileData) {
      throw new Error("Usuario no autenticado o perfil no cargado")
    }

    try {
      setIsLoading(true)
      setError(null)

      // Actualizar usuario en el backend
      const updatedUser = await userService.updateUser(user.id, data)

      // Actualizar el perfil local
      setProfileData(prev => prev ? {
        ...prev,
        ...updatedUser
      } : null)

      showSuccess(SUCCESS_MESSAGES.profileUpdated)
    } catch (err) {
      console.error('Error updating profile:', err)
      const errorMessage = ERROR_MESSAGES.updateProfile
      showError(errorMessage)
      throw err // Re-throw para que el componente pueda manejarlo
    } finally {
      setIsLoading(false)
    }
  }, [user, profileData])

  // Función para refrescar el perfil
  const refreshProfile = useCallback(async () => {
    await fetchProfile()
  }, [fetchProfile])

  // Funciones del modal de edición
  const openEditModal = useCallback((field: EditableField, currentValue: string) => {
    setEditModalState({
      isOpen: true,
      field,
      currentValue,
      newValue: currentValue
    })
  }, [])

  const closeEditModal = useCallback(() => {
    setEditModalState({
      isOpen: false,
      field: null,
      currentValue: '',
      newValue: ''
    })
  }, [])

  const saveFieldEdit = useCallback(async (field: EditableField, newValue: string) => {
    if (!user || !profileData) {
      throw new Error("Usuario no autenticado o perfil no cargado")
    }

    try {
      // Preparar los datos de actualización según el campo
      let updateData: UpdateUserPayload = {}
      
      switch (field) {
        case 'firstName':
          updateData.firstName = newValue.trim()
          break
        case 'lastName':
          updateData.lastName = newValue.trim()
          break
        case 'username':
          updateData.username = newValue.trim()
          break
        case 'email':
          updateData.email = newValue.trim()
          break
      }

      // Actualizar el perfil
      await updateProfile(updateData)
      
      // Cerrar el modal
      closeEditModal()
    } catch (err) {
      console.error('Error saving field edit:', err)
      throw err // Re-throw para que el modal pueda manejarlo
    }
  }, [user, profileData, updateProfile, closeEditModal])

  // Cargar perfil al montar el componente
  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return {
    // Data
    profileData,
    isLoading,
    error,
    
    // Modal state
    editModalState,

    // Actions
    updateProfile,
    refreshProfile,
    openEditModal,
    closeEditModal,
    saveFieldEdit
  }
}