import { LucideIcon } from "lucide-react"
import { UserSimulation } from "./simulation.types"

export interface StatCardData {
  id: string
  title: string
  value: string | number
  icon: LucideIcon
  colorScheme: 'green' | 'blue' | 'purple' | 'orange'
  description: string
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  colorScheme: 'blue' | 'green' | 'purple' | 'orange'
}

export interface GettingStartedStep {
  id: string
  stepNumber: number
  title: string
  description: string
  colorScheme: 'blue' | 'green'
}

export interface UserStats {
  totalInvested: number
  totalSimulations: number
  averageReturn: number
  activeDays: number
}

export interface HomeViewData {
  userStats: UserStats
  recentSimulations: UserSimulation[]
  isLoading: boolean
  error: string | null
}

export interface HomeViewActions {
  createNewSimulation: () => void
  viewAllSimulations: () => void
  refreshData: () => void
  getUpdatedStatsCards: () => StatCardData[]
}

export type HomeViewHookReturn = HomeViewData & HomeViewActions