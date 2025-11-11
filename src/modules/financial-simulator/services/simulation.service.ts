import { httpClient } from "@/src/core/lib/http-client"
import { GetUserSimulationsParams, GetUserSimulationsResponse, SimulationStats, SimulationStatsResponse, UserSimulation } from "../types/simulation.types"

class SimulationService {
  private readonly baseUrl = '/simulations'

  async getUserSimulations(params: GetUserSimulationsParams = {}): Promise<GetUserSimulationsResponse> {
    try {
      const queryParams = new URLSearchParams()

      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.status && params.status !== 'all') queryParams.append('status', params.status)

      const url = `${this.baseUrl}/user/${params.userId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

      const response = await httpClient.get<GetUserSimulationsResponse>(url)

      if (!response) {
        throw new Error("Credenciales inválidas o respuesta inesperada")
      }

      return response
    } catch (error) {
      console.error('Error fetching user simulations:', error)
      throw new Error('Failed to fetch user simulations')
    }
  }

  async getUserSimulationStats(userId?: string): Promise<SimulationStats> {
    try {
      const url = `${this.baseUrl}/stats/${userId}`
      const response = await httpClient.get<SimulationStatsResponse>(url)

      if (!response) {
        throw new Error("Credenciales inválidas o respuesta inesperada")
      }

      return {
        totalInvested: response.totalInvested,
        totalSimulations: response.totalSimulations,
        averageReturn: response.averageReturnRate,
        activeDays: response.userActiveDays
      }
    } catch (error) {
      console.error('Error fetching user simulation stats:', error)
      return {
        totalInvested: 0,
        totalSimulations: 0,
        averageReturn: 0,
        activeDays: 0
      }
    }
  }

  async getRecentSimulations(userId?: string, limit = 5): Promise<UserSimulation[]> {
    try {
      const response = await this.getUserSimulations({
        userId,
        limit,
        page: 1
      })

      if (!response || !response.simulations) {
        throw new Error("Credenciales inválidas o respuesta inesperada")
      }

      return response.simulations
    } catch (error) {
      console.error('Error fetching recent simulations:', error)
      return []
    }
  }
}

export const simulationService = new SimulationService()