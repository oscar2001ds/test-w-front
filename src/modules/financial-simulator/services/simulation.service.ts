import { httpClient } from "@/src/core/lib/http-client"
import { GetUserSimulationsParams, GetUserSimulationsResponse, SimulationStats, SimulationStatsResponse, UserSimulation } from "../types/simulation.types"
import { CreateSimulationFormData, EditSimulationFormData } from "../types/my-simulations.types"

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
        activeDays: response.userActiveDays,
        activeSimulations: response.activeSimulations
      }
    } catch (error) {
      console.error('Error fetching user simulation stats:', error)
      return {
        totalInvested: 0,
        totalSimulations: 0,
        averageReturn: 0,
        activeDays: 0,
        activeSimulations: 0
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

  async createSimulation(data: CreateSimulationFormData): Promise<UserSimulation> {
    try {
      const response = await httpClient.post<UserSimulation>(this.baseUrl, {
        title: data.title,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        startDate: data.startDate,
        endDate: data.endDate
      })

      if (!response) {
        throw new Error("Error inesperado al crear la simulación")
      }

      return response
    } catch (error) {
      console.error('Error creating simulation:', error)
      throw new Error('Failed to create simulation')
    }
  }

  async updateSimulation(data: EditSimulationFormData, userId: string): Promise<UserSimulation> {
    try {
      const url = `${this.baseUrl}/${data.id}/user/${userId}`
      
      const response = await httpClient.patch<UserSimulation>(url, {
        title: data.title,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status
      })

      if (!response) {
        throw new Error("Error inesperado al actualizar la simulación")
      }

      return response
    } catch (error) {
      console.error('Error updating simulation:', error)
      throw new Error('Failed to update simulation')
    }
  }

  async deleteSimulation(simulationId: string, userId: string): Promise<void> {
    try {
      const url = `${this.baseUrl}/${simulationId}/user/${userId}`
      
      await httpClient.delete(url)
    } catch (error) {
      console.error('Error deleting simulation:', error)
      throw new Error('Failed to delete simulation')
    }
  }
}

export const simulationService = new SimulationService()