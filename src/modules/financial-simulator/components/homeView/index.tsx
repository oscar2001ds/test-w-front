"use client"

import { useHomeView } from "../../hooks/useHomeView"
import { HeroSection } from "./HeroSection"
import { StatsCards } from "./StatsCards"
import { FeaturesList } from "./FeaturesList"
import { GettingStarted } from "./GettingStarted"
import { RecentActivity } from "./RecentActivity"

export default function HomeView() {
  const {
    recentSimulations,
    isLoading,
    error,
    createNewSimulation,
    viewAllSimulations,
    getUpdatedStatsCards
  } = useHomeView()

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

  const statsCards = getUpdatedStatsCards()

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <HeroSection onCreateSimulation={createNewSimulation}/>

      {/* Stats Cards */}
      <StatsCards statsCards={statsCards} />

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FeaturesList />
        <GettingStarted onCreateSimulation={createNewSimulation} />
      </div>

      {/* Recent Activity */}
      <RecentActivity 
        recentSimulations={recentSimulations}
        onViewAllSimulations={viewAllSimulations}
        isLoading={isLoading}
      />
    </div>
  )
}