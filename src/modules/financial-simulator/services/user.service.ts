import { httpClient } from "@/src/core/lib/http-client"
import { User } from "@/src/modules/auth"

export interface UpdateUserPayload {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  role?: string
  isActive?: boolean
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
}

export const userService = new UserService()