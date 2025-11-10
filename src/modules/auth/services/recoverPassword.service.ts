import { httpClient } from "@core/lib/http-client"
import type { RecoverPasswordInput, RecoverPasswordResponse } from "../types"

export async function recoverPasswordService(
  input: RecoverPasswordInput,
): Promise<RecoverPasswordResponse> {
  try {
    const response = await httpClient.post<RecoverPasswordResponse>('/auth/recover-password', input)
    
    if (!response.success) {
      throw new Error(response.message || "Error al solicitar recuperación de contraseña")
    }

    return response
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error en recuperación de contraseña: ${error.message}`)
    }
    throw new Error("Error en recuperación de contraseña")
  }
}
