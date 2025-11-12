import { UserRole } from "../../auth/types/auth.types"
import { SimulationStatsResponse } from "./simulation.types"

// Datos principales de un usuario
export interface UserData {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt?: string
  lastLoginAt?: string
  stats: UserStats
}

export interface UserStats {
  totalSimulations: number
  totalInvested: number
  averageReturn: number
  lastSimulation: string
}

export interface UsersOverviewStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  totalInvestments: number
  averageReturn: number
  newUsersThisMonth: number
}

// Filtros simplificados (sin rol)
export interface UserFilters {
  search: string
  status: 'all' | 'active' | 'inactive'
}

export interface UserViewSettings {
  layout: 'grid' | 'list'
  itemsPerPage: number
  currentPage: number
  sortBy: 'name' | 'createdAt' | 'lastLoginAt' | 'totalInvested' | 'totalSimulations'
  sortOrder: 'asc' | 'desc'
}

export interface RoleChangeModalState {
  isOpen: boolean
  user: UserData | null
  newRole: UserRole | null
}

export interface UserDetailsModalState {
  isOpen: boolean
  user: UserData | null
}

// Parámetros para obtener usuarios
export interface GetUsersParams {
  userRole?: UserRole
  page?: number
  limit?: number
  search?: string
  status?: UserFilters['status']
  sortBy?: UserViewSettings['sortBy']
  sortOrder?: UserViewSettings['sortOrder']
}

// Respuesta del API
export interface GetUsersResponse {
  user: Omit<UserData, 'stats'>
  stats: SimulationStatsResponse
}

// Hook return type
export interface UsersViewHookReturn {
  users: UserData[]
  filteredUsers: UserData[]
  filters: UserFilters
  overviewStats: UsersOverviewStats
  isLoading: boolean
  updateFilters: (newFilters: Partial<UserFilters>) => void
  changeUserRole: (userId: string, newRole: string) => Promise<void>
}

// Payload para actualizar rol
export interface UpdateUserRolePayload {
  userId: string
  newRole: UserRole
}

// Props de componentes
export interface UserFiltersProps {
  filters: UserFilters
  viewSettings: UserViewSettings
  onSearchChange: (search: string) => void
  onStatusFilterChange: (status: UserFilters['status']) => void
  onClearFilters: () => void
  onLayoutChange: (layout: 'grid' | 'list') => void
  onExport: () => Promise<void>
  onRefresh: () => Promise<void>
  isLoading: boolean
}

export interface UserCardProps {
  user: UserData
  onEditRole: (user: UserData) => void
  onViewDetails: (user: UserData) => void
}

export interface UserListProps {
  users: UserData[]
  onEditRole: (user: UserData) => void
  onViewDetails: (user: UserData) => void
}

export interface UsersOverviewProps {
  stats: UsersOverviewStats
  isLoading: boolean
}

export interface RoleChangeModalProps {
  user: UserData | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (user: UserData, newRole: UserRole) => Promise<void>
  isLoading: boolean
}

export interface UserDetailsModalProps {
  user: UserData | null
  isOpen: boolean
  onClose: () => void
}