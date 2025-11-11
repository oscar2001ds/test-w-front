"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  MySimulationsHookReturn,
  SimulationFilters,
  SimulationViewSettings,
  SimulationStats,
  SimulationItem,
  ModalState,
  CreateSimulationFormData,
  EditSimulationFormData
} from "../types/my-simulations.types"
import { PAGINATION_CONFIG } from "../constants/my-simulations.constants"
import { simulationService } from "../services/simulation.service"
import { useAuth } from "@/src/core/context/AuthContext"
import { useToast } from "@/src/shared"
import { useRouter, useSearchParams } from "next/navigation"

export const useMySimulationsView = (): MySimulationsHookReturn => {
  // Estados principales
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const [simulations, setSimulations] = useState<SimulationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<SimulationStats>({
    totalSimulations: 0,
    totalAmount: 0,
    activeSimulations: 0,
    averageReturn: 0
  })
  const { showSuccess, showError } = useToast();

  // Estados de filtros
  const [filters, setFilters] = useState<SimulationFilters>({
    search: '',
    status: 'all'
  })

  // Estados de vista y paginación
  const [viewSettings, setViewSettings] = useState<SimulationViewSettings>({
    layout: 'grid',
    itemsPerPage: PAGINATION_CONFIG.itemsPerPage,
    currentPage: 1
  })

  // Estado del modal
  const [modalState, setModalState] = useState<ModalState>({
    isCreateModalOpen: false,
    isEditModalOpen: false,
    editingSimulation: null
  })

  // Filtrado de simulaciones
  const filteredSimulations = useMemo(() => {
    let filtered = [...simulations]

    // Filtro por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(sim =>
        sim.title.toLowerCase().includes(searchTerm) ||
        sim.currency.toLowerCase().includes(searchTerm)
      )
    }

    // Filtro por estado
    if (filters.status !== 'all') {
      filtered = filtered.filter(sim => sim.status === filters.status)
    }

    return filtered
  }, [simulations, filters])

  // Paginación
  const paginatedSimulations = useMemo(() => {
    const startIndex = (viewSettings.currentPage - 1) * viewSettings.itemsPerPage
    const endIndex = startIndex + viewSettings.itemsPerPage
    return filteredSimulations.slice(startIndex, endIndex)
  }, [filteredSimulations, viewSettings.currentPage, viewSettings.itemsPerPage])

  const totalPages = useMemo(() =>
    Math.ceil(filteredSimulations.length / viewSettings.itemsPerPage),
    [filteredSimulations.length, viewSettings.itemsPerPage]
  )

  // Estadísticas
  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      if (user) {
        const response = await simulationService.getUserSimulationStats(user.id)
        if (response) {
          setStats({
            totalSimulations: response.totalSimulations,
            totalAmount: response.totalInvested,
            activeSimulations: response.activeSimulations,
            averageReturn: response.averageReturn
          })
        }
      }
    } catch (err) {
      console.error(err)
      showError('Error al calcular las estadísticas')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Funciones de carga de datos
  const fetchSimulations = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      if (user) {
        const response = await simulationService.getUserSimulations({ userId: user.id })
        if (response && response.simulations) {
          setSimulations(response.simulations)
        }
      }
    } catch (err) {
      console.error(err)
      showError('Error al cargar las simulaciones')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const refreshData = useCallback(() => {
    fetchSimulations()
  }, [fetchSimulations])

  // Funciones de filtros
  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }))
    setViewSettings(prev => ({ ...prev, currentPage: 1 })) // Reset a primera página
  }, [])

  const setStatusFilter = useCallback((status: SimulationFilters['status']) => {
    setFilters(prev => ({ ...prev, status }))
    setViewSettings(prev => ({ ...prev, currentPage: 1 }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'all'
    })
    setViewSettings(prev => ({ ...prev, currentPage: 1 }))
  }, [])

  // Funciones de vista
  const setLayout = useCallback((layout: 'grid' | 'list') => {
    setViewSettings(prev => ({ ...prev, layout }))
  }, [])

  const setCurrentPage = useCallback((currentPage: number) => {
    setViewSettings(prev => ({ ...prev, currentPage }))
  }, [])

  // Funciones de modales
  const openCreateModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isCreateModalOpen: true }))
  }, [])

  const openEditModal = useCallback((id: string) => {
    const simulation = simulations.find(sim => sim.id === id)
    if (simulation) {
      setModalState(prev => ({
        ...prev,
        isEditModalOpen: true,
        editingSimulation: simulation
      }))
    }
  }, [simulations])

  const closeModals = useCallback(() => {
    setModalState({
      isCreateModalOpen: false,
      isEditModalOpen: false,
      editingSimulation: null
    })
  }, [])

  // Funciones de acciones de simulaciones
  const createSimulation = useCallback(async (data: CreateSimulationFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      // Llamada a la API para crear la simulación
      const newSimulation = await simulationService.createSimulation(data)

      // Actualizar la lista local de simulaciones
      setSimulations(prev => [newSimulation, ...prev])

      // Notificar éxito
      showSuccess('Simulación creada exitosamente')
     
      // Cerrar el modal
      closeModals()

      // Refrescar estadísticas
      fetchStats()
    } catch (err) {
      console.error('Error creating simulation:', err)
      showError('Error al crear la simulación')
      throw err // Re-throw para que el formulario pueda manejarlo
    } finally {
      setIsLoading(false)
    }
  }, [closeModals, fetchStats])

  const editSimulation = useCallback(async (data: EditSimulationFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!user) {
        throw new Error('Usuario no autenticado')
      }

      // Llamada a la API para actualizar la simulación
      const updatedSimulation = await simulationService.updateSimulation(data, user.id)

      // Actualizar simulación en estado local
      setSimulations(prev => prev.map(sim =>
        sim.id === data.id ? updatedSimulation : sim
      ))

      // Notificar éxito
      showSuccess('Simulación actualizada exitosamente')

      // Cerrar el modal
      closeModals()

      // Refrescar estadísticas
      fetchStats()
    } catch (err) {
      console.error('Error editing simulation:', err)
      showError('Error al editar la simulación')
      throw err // Re-throw para que el formulario pueda manejarlo
    } finally {
      setIsLoading(false)
    }
  }, [user, closeModals, fetchStats])

  const deleteSimulation = useCallback(async (id: string) => {
    try {
      setError(null)

      if (!user) {
        throw new Error('Usuario no autenticado')
      }

      // Llamada a la API para eliminar la simulación
      await simulationService.deleteSimulation(id, user.id)

      // Actualizar estado local
      setSimulations(prev => prev.filter(sim => sim.id !== id))

      // Notificar éxito
      showSuccess('Simulación eliminada exitosamente')

      // Refrescar estadísticas
      fetchStats()
    } catch (err) {
      console.error('Error deleting simulation:', err)
      showError('Error al eliminar la simulación')
      throw err
    }
  }, [user, fetchStats])

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchSimulations()
  }, [fetchSimulations])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Ajustar página actual si excede el total de páginas después de filtrar
  useEffect(() => {
    if (viewSettings.currentPage > totalPages && totalPages > 0) {
      setViewSettings(prev => ({ ...prev, currentPage: totalPages }))
    }
  }, [viewSettings.currentPage, totalPages])

  useEffect(() => {
    if (params.get('create') === 'true') {
      openCreateModal()
      // Borrar el parámetro de la URL después de abrir el modal
      router.replace('/financial-simulator/my-simulations', { scroll: false })
    }
  }, [params])

  return {
    // Data
    simulations: paginatedSimulations,
    stats,
    filters,
    viewSettings,
    isLoading,
    error,
    totalPages,

    // Modal state
    modalState,
    openCreateModal,
    openEditModal,
    closeModals,

    // Filter actions
    setSearch,
    setStatusFilter,
    clearFilters,

    // View actions
    setLayout,
    setCurrentPage,

    // Simulation actions
    createSimulation,
    editSimulation,
    deleteSimulation,

    // Data actions
    refreshData
  }
}