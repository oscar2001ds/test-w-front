import { UserSimulation } from './simulation.types'

export type SimulationItem = UserSimulation

export interface SimulationStats {
  totalSimulations: number
  totalAmount: number
  activeSimulations: number
  averageReturn: number
}

export interface SimulationFilters {
  search: string
  status: 'all' | 'active' | 'completed' | 'paused'
}

export interface SimulationViewSettings {
  layout: 'grid' | 'list'
  itemsPerPage: number
  currentPage: number
}

export interface MySimulationsData {
  simulations: SimulationItem[]
  stats: SimulationStats
  filters: SimulationFilters
  viewSettings: SimulationViewSettings
  isLoading: boolean
  error: string | null
  totalPages: number
}

export interface MySimulationsActions {
  // Filtros y búsqueda
  setSearch: (search: string) => void
  setStatusFilter: (status: SimulationFilters['status']) => void
  clearFilters: () => void
  
  // Vista y paginación
  setLayout: (layout: 'grid' | 'list') => void
  setCurrentPage: (page: number) => void
  
  // Modales
  openCreateModal: () => void
  openEditModal: (id: string) => void
  closeModals: () => void
  modalState: ModalState
  
  // Acciones de simulaciones
  createSimulation: (data: CreateSimulationFormData) => Promise<void>
  editSimulation: (data: EditSimulationFormData) => Promise<void>
  deleteSimulation: (id: string) => void
  
  // Datos
  refreshData: () => void
}

export type MySimulationsHookReturn = MySimulationsData & MySimulationsActions

export interface SimulationCardProps {
  simulation: SimulationItem
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

// Form types for creating/editing simulations
export interface CreateSimulationFormData {
  title: string
  amount: number
  paymentMethod: 'monthly' | 'annual'
  startDate: string
  endDate: string
}

export interface EditSimulationFormData {
  id: string
  title: string
  amount: number
  paymentMethod: 'monthly' | 'annual'
  startDate: string
  endDate: string
  termMonths: number  // Solo lectura, calculado automáticamente
  status: 'active' | 'completed' | 'paused'
}

// Modal state
export interface ModalState {
  isCreateModalOpen: boolean
  isEditModalOpen: boolean
  editingSimulation: SimulationItem | null
}