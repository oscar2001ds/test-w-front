import { httpClient } from "@core/lib/http-client"
import type { User, SessionResponse } from "../types"

export async function sessionService(): Promise<User | null> {
  try {
    const response = await httpClient.get<SessionResponse>('/auth/session')

    if (!response.success || !response.user) {
      throw new Error("No authenticated user found")
    }

    return response.user
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`)
    }
    throw new Error("Error al obtener la sesión")
  }
}
