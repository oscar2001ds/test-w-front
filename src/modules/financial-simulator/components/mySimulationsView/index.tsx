"use client"

import { useMySimulationsView } from "../../hooks/useMySimulationsView"
import { MySimulationsHeader } from "./MySimulationsHeader"
import { MySimulationsStats } from "./MySimulationsStats"
import { MySimulationsFilters } from "./MySimulationsFilters"
import { MySimulationsGrid } from "./MySimulationsGrid"
import { MySimulationsPagination } from "./MySimulationsPagination"

import { SimulationFormModal } from './SimulationFormModal'

export default function MySimulationsView() {
  const {
    simulations,
    stats,
    filters,
    viewSettings,
    isLoading,
    error,
    totalPages,
    modalState,
    openCreateModal,
    openEditModal,
    closeModals,
    setSearch,
    setStatusFilter,
    setLayout,
    setCurrentPage,
    createSimulation,
    editSimulation,
    deleteSimulation,
    refreshData
  } = useMySimulationsView()

  // Handlers para los modales
  const handleCreateSubmit = async (data: any) => {
    await createSimulation(data as any)
  }

  const handleEditSubmit = async (data: any) => {
    await editSimulation(data as any)
  }

  if (error) {
    return (
      <div className="space-y-8 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Error al cargar los datos</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <MySimulationsHeader 
        onCreateSimulation={openCreateModal}
        onRefresh={refreshData}
        isLoading={isLoading}
      />

      {/* Stats */}
      <MySimulationsStats stats={stats} />

      {/* Filters */}
      <MySimulationsFilters
        filters={filters}
        viewSettings={viewSettings}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onLayoutChange={setLayout}
      />

      {/* Grid */}
      <MySimulationsGrid
        simulations={simulations}
        viewSettings={viewSettings}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={deleteSimulation}
        onCreateFirst={openCreateModal}
      />

      {/* Pagination */}
      <MySimulationsPagination
        viewSettings={viewSettings}
        totalPages={totalPages}
        totalItems={stats.totalSimulations}
        onPageChange={setCurrentPage}
      />

      {/* Modales */}
      <SimulationFormModal
        isOpen={modalState.isCreateModalOpen}
        mode="create"
        onClose={closeModals}
        onSubmit={handleCreateSubmit}
        isLoading={isLoading}
      />

      <SimulationFormModal
        isOpen={modalState.isEditModalOpen}
        mode="edit"
        simulation={modalState.editingSimulation}
        onClose={closeModals}
        onSubmit={handleEditSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}