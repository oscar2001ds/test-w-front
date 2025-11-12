"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  UsersViewHookReturn,
  UserData,
  UsersOverviewStats,
  UserFilters,
  UserViewSettings,
  RoleChangeModalState,
  UserDetailsModalState,
  UpdateUserRolePayload,
} from "../types/users.types"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/users.constants"
import { useAuth } from "@/src/core/context/AuthContext"
import { useToast } from "@/src/shared"
import { UserRole } from "../../auth"
import { userService } from "../services/user.service"

export const useUsersView = (userRole: UserRole): UsersViewHookReturn => {
  // Estados principales
  const { user } = useAuth()
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [overviewStats, setOverviewStats] = useState<UsersOverviewStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalInvestments: 0,
    averageReturn: 0,
    newUsersThisMonth: 0
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

      return fullName.includes(searchTerm) || email.includes(searchTerm)
    })
  }, [users, filters])

  // Función para cambiar el rol de un usuario
  const changeUserRole = async (userId: string, newRole: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        showSuccess(SUCCESS_MESSAGES.dataExported)
        resolve()
      }, 1000)
    })
  }

  // Efecto para obtener usuarios
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    filteredUsers,
    filters,
    overviewStats,
    isLoading,
    updateFilters,
    changeUserRole
  }
}