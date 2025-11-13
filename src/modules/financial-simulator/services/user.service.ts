import { httpClient } from "@/src/core/lib/http-client"
import { User } from "@/src/modules/auth"
import { GetOverviewStatsResponse, GetUsersParams, GetUsersWithStatsResponse, UserData, UsersOverviewStats } from "../types/users.types"

export interface UpdateUserPayload {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  role?: string
  isActive?: boolean
  status?: string
}

class UserService {
  private readonly baseUrl = '/users'

  async updateUser(userId: string, data: UpdateUserPayload): Promise<User> {
    try {
      const url = `${this.baseUrl}/${userId}`

      const response = await httpClient.patch<User>(url, data)

      if (!response) {
        throw new Error("Error inesperado al actualizar el usuario")
      }

      return response
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Failed to update user')
    }
  }

  async getUsersWithStats(params: GetUsersParams): Promise<UserData[]> {
    try {
      const { userRole, ...queryParams } = params
      const queryParamsObj = new URLSearchParams()

      // Solo agregar parámetros que tienen valor
      if (userRole) queryParamsObj.append('role', userRole)
      if (queryParams.page) queryParamsObj.append('page', queryParams.page.toString())
      if (queryParams.limit) queryParamsObj.append('limit', queryParams.limit.toString())
      if (queryParams.search) queryParamsObj.append('search', queryParams.search)
      if (queryParams.status && queryParams.status !== 'all') queryParamsObj.append('status', queryParams.status)
      if (queryParams.sortBy) queryParamsObj.append('sortBy', queryParams.sortBy)
      if (queryParams.sortOrder) queryParamsObj.append('sortOrder', queryParams.sortOrder)

      const url = `${this.baseUrl}/role-with-stats?${queryParamsObj.toString()}`
      const response = await httpClient.get<GetUsersWithStatsResponse[]>(url)

      if (!response) {
        throw new Error("Error inesperado al obtener los usuarios")
      }

      const users: UserData[] = response.map(res => ({
        ...res.user,
        stats: {
          totalSimulations: res.stats.totalSimulations,
          totalInvested: res.stats.totalInvested,
          averageReturn: res.stats.averageReturnRate,
          lastSimulation: res.stats.lastSimulationDate
        }
      }))

      return users

    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error('Failed to fetch users')
    }
  }

  async getUsersOverviewStats(params: { userRole?: string }): Promise<UsersOverviewStats> {
    try {
      const queryParamsObj = new URLSearchParams()

      if (params.userRole) {
        queryParamsObj.append('role', params.userRole)
      }

      const url = `${this.baseUrl}/overview-stats?${queryParamsObj.toString()}`
      const response = await httpClient.get<GetOverviewStatsResponse>(url)

      if (!response) {
        throw new Error("Error inesperado al obtener las estadísticas de usuarios")
      }

      return response

    } catch (error) {
      console.error('Error fetching user overview stats:', error)
      throw new Error('Failed to fetch user overview stats')
    }
  }
}

export const userService = new UserService()