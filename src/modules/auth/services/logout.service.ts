import { httpClient } from "@core/lib/http-client"

export async function logoutService(): Promise<boolean> {
  try {
    await httpClient.post<Promise<void>>('/auth/logout')
    return true
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`)
    }
    throw new Error("Error al cerrar sesión")
  }
}
