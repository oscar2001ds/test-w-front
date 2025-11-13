"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  UsersViewHookReturn,
  UserData,
  UsersOverviewStats,
  UserFilters,
  UpdateUserRolePayload,
} from "../types/users.types"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/users.constants"
import { useAuth } from "@/src/core/context/AuthContext"
import { useToast } from "@/src/shared"
import { UserRole } from "../../auth"
import { userService } from "../services/user.service"

export const useUsersView = (userRole: UserRole): UsersViewHookReturn => {
  const { user } = useAuth()
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [overviewStats, setOverviewStats] = useState<UsersOverviewStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalInvestments: 0,
    averageReturn: 0,
  })
  const { showSuccess, showError } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    status: "all",
  })

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      if (user) {
        const usersResponse = await userService.getUsersWithStats({ userRole })
        if (usersResponse) setUsers(usersResponse)
      }
    } catch (err) {
      console.error(err)
      showError('Error al cargar los usuarios')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const fetchOverviewStats = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      if (user) {
        const statsResponse = await userService.getUsersOverviewStats({ userRole })
        if (statsResponse) setOverviewStats(statsResponse)
      }
    } catch (err) {
      console.error(err)
      showError('Error al cargar las estadísticas de usuarios')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Función para actualizar filtros
  const updateFilters = (newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Función para buscar por nombre o email
  const filteredUsers = useMemo(() => {
    if (!filters) return users

    return users?.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      const email = user.email.toLowerCase()
      const searchTerm = filters.search.toLowerCase()
      const statusFilter = filters.status

      return (fullName.includes(searchTerm) || email.includes(searchTerm)) &&
        (statusFilter === 'all' || (statusFilter === 'active' && user.isActive) || (statusFilter === 'inactive' && !user.isActive))
    })
  }, [users, filters])

  // Función para cambiar el estado de un usuario
  const changeUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const userUpdated = await userService.updateUser(userId, { isActive })
      if (userUpdated) {
        showSuccess(SUCCESS_MESSAGES.statusChanged)
        fetchUsers()
        fetchOverviewStats()
      } else {
        showError(ERROR_MESSAGES.updateRole)
      }
    } catch (error) {
      console.error('Error changing user status:', error)
      showError(ERROR_MESSAGES.updateRole)
    }
  }

  // Función para refrescar la vista
  const refreshView = async () => {
    await fetchUsers()
    await fetchOverviewStats()
  }

  // Función para cambiar el rol de un usuario
  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      const payload: UpdateUserRolePayload = {
        userId,
        newRole: newRole as UserRole,
      }
      const userUpdated = await userService.updateUser(userId, { role: newRole })
      if (userUpdated) {
        showSuccess(SUCCESS_MESSAGES.roleUpdated)
        fetchUsers()
      } else {
        showError(ERROR_MESSAGES.updateRole)
      }
    } catch (error) {
      console.error('Error changing user role:', error)
      showError(ERROR_MESSAGES.updateRole)
    }
  }

  // Efecto para obtener usuarios
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Efecto para obtener estadísticas generales
  useEffect(() => {
    fetchOverviewStats()
  }, [fetchOverviewStats])

  return {
    users,
    filteredUsers,
    filters,
    overviewStats,
    isLoading,
    updateFilters,
    changeUserRole,
    changeUserStatus,
    refreshView
  }
}