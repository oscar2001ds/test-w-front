import { User, UserRole } from "../../auth/types/auth.types"

export interface ClientStats {
  totalSimulations: number
  totalInvested: number
  averageReturn: number
  lastSimulation: string
}

export interface ClientData extends User {
  createdAt: string
  stats: ClientStats
}

export interface ClientsOverviewStats {
  totalClients: number
  activeClients: number
  inactiveClients: number
  totalInvestments: number
  averageReturn: number
  newClientsThisMonth: number
}

export interface ClientFilters {
  search: string
  status: 'all' | 'active' | 'inactive'
  role: 'all' | UserRole
  dateRange?: {
    from: string
    to: string
  }
}

export interface ClientViewSettings {
  layout: 'grid' | 'list'
  itemsPerPage: number
  currentPage: number
  sortBy: 'name' | 'createdAt' | 'lastLoginAt' | 'totalInvested' | 'totalSimulations'
  sortOrder: 'asc' | 'desc'
}

export interface RoleChangeModalState {
  isOpen: boolean
  client: ClientData | null
  newRole: UserRole | null
}

export interface ClientDetailsModalState {
  isOpen: boolean
  client: ClientData | null
}

export interface UpdateClientRolePayload {
  userId: string
  newRole: UserRole
  reason?: string
}

// Hook return type siguiendo el patrón establecido
export interface ClientsViewHookReturn {
  // Data
  clients: ClientData[]
  overviewStats: ClientsOverviewStats
  filters: ClientFilters
  viewSettings: ClientViewSettings
  isLoading: boolean
  error: string | null
  totalPages: number

  // Modal states
  roleChangeModal: RoleChangeModalState
  clientDetailsModal: ClientDetailsModalState

  // Filter actions
  setSearch: (search: string) => void
  setStatusFilter: (status: ClientFilters['status']) => void
  setRoleFilter: (role: ClientFilters['role']) => void
  clearFilters: () => void

  // View actions
  setLayout: (layout: 'grid' | 'list') => void
  setCurrentPage: (page: number) => void
  setSortBy: (sortBy: ClientViewSettings['sortBy']) => void
  setSortOrder: (order: ClientViewSettings['sortOrder']) => void

  // Modal actions
  openRoleChangeModal: (client: ClientData) => void
  openClientDetailsModal: (client: ClientData) => void
  closeModals: () => void

  // Client actions
  updateClientRole: (payload: UpdateClientRolePayload) => Promise<void>
  refreshData: () => Promise<void>
  exportClients: () => Promise<void>
}

// Props para componentes
export interface ClientCardProps {
  client: ClientData
  onEditRole: (client: ClientData) => void
  onViewDetails: (client: ClientData) => void
}

export interface ClientsOverviewProps {
  stats: ClientsOverviewStats
  onRefresh: () => void
  onExport: () => void
}

export interface ClientFiltersProps {
  filters: ClientFilters
  viewSettings: ClientViewSettings
  totalResults: number
  totalItems: number
  onSearchChange: (search: string) => void
  onStatusFilterChange: (status: ClientFilters['status']) => void
  onRoleFilterChange: (role: ClientFilters['role']) => void
  onLayoutChange: (layout: 'grid' | 'list') => void
  onClearFilters: () => void
}

export interface RoleChangeModalProps {
  isOpen: boolean
  client: ClientData | null
  currentRole: UserRole
  onSave: (payload: UpdateClientRolePayload) => Promise<void>
  onClose: () => void
  isLoading: boolean
}

export interface ClientDetailsModalProps {
  isOpen: boolean
  client: ClientData | null
  onClose: () => void
  onEditRole: (client: ClientData) => void
}