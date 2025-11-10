import { httpClient } from "@core/lib/http-client"

export async function logoutService(): Promise<boolean> {
  try {
    await httpClient.post<Promise<void>>('/auth/logout')
    // Remover token del cliente HTTP
    httpClient.removeAuthToken()
    return true
  } catch (error) {
    // Incluso si el logout falla en el servidor, removemos el token localmente
    httpClient.removeAuthToken()

    if (error instanceof Error) {
      throw new Error(`${error.message}`)
    }
    throw new Error("Error al cerrar sesión")
  }
}
