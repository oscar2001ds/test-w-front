import { httpClient } from '@core/lib/http-client'
import { RefreshTokenResponse } from '../types'

export async function refreshAccessTokenService(): Promise<RefreshTokenResponse> {
  try {
    const response = await httpClient.post<RefreshTokenResponse>('/auth/refresh')
    if (response.error) {
      throw new Error(response.message)
    }

    return response
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Error al refrescar el token')
  }
}
