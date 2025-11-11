"use client"

import { useState, useEffect, useCallback } from "react"
import { simulationService } from "../services/simulation.service"
import { HomeViewHookReturn, UserStats } from "../types/home-view.types"
import { UserSimulation } from "../types/simulation.types"
import { STATS_CARDS } from "../constants/home-view.constants"
import { useAuth } from "@/src/core/context/AuthContext"
import { useRouter } from "next/navigation"

export const useHomeView = (): HomeViewHookReturn => {
  const router = useRouter()
  const { user } = useAuth()
  const [userStats, setUserStats] = useState<UserStats>({
    totalInvested: 0,
    totalSimulations: 0,
    averageReturn: 0,
    activeDays: 0
  })

  const [recentSimulations, setRecentSimulations] = useState<UserSimulation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserStats = useCallback(async () => {
    try {
      const stats = await simulationService.getUserSimulationStats(user?.id)
      setUserStats(stats)
    } catch (err) {
      console.error('Error fetching user stats:', err)
      setError('Error al cargar las estadísticas del usuario')
    }
  }, [user])

  const fetchRecentSimulations = useCallback(async () => {
    try {
      const simulations = await simulationService.getRecentSimulations(user?.id, 5)
      setRecentSimulations(simulations)
    } catch (err) {
      console.error('Error fetching recent simulations:', err)
      setError('Error al cargar las simulaciones recientes')
    }
  }, [user])

  const fetchAllData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      await Promise.all([
        fetchUserStats(),
        fetchRecentSimulations()
      ])
    } catch (err) {
      console.error('Error fetching home view data:', err)
      setError('Error al cargar los datos')
    } finally {
      setIsLoading(false)
    }
  }, [fetchUserStats, fetchRecentSimulations])

  const refreshData = useCallback(() => {
    fetchAllData()
  }, [fetchAllData])

  const createNewSimulation = useCallback(() => {
    router.push('/financial-simulator/my-simulations?create=true')
  }, [router])

  const viewAllSimulations = useCallback(() => {
    router.push('/financial-simulator/my-simulations')
  }, [router])

  const getUpdatedStatsCards = useCallback(() => {
    return STATS_CARDS.map(card => {
      let updatedValue: string | number = card.value

      switch (card.id) {
        case 'total-invested':
          updatedValue = `$${userStats.totalInvested.toLocaleString()}`
          break
        case 'simulations':
          updatedValue = userStats.totalSimulations
          break
        case 'average-return':
          updatedValue = `${userStats.averageReturn.toFixed(2)}%`
          break
        case 'active-days':
          updatedValue = userStats.activeDays
          break
      }

      return {
        ...card,
        value: updatedValue
      }
    })
  }, [userStats])

  useEffect(() => {
    if (user) fetchAllData()
  }, [user])

  return {
    userStats,
    recentSimulations,
    isLoading,
    error,
    createNewSimulation,
    viewAllSimulations,
    refreshData,
    getUpdatedStatsCards
  }
}