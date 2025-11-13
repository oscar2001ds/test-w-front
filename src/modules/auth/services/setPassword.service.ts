import { httpClient } from "@core/lib/http-client"
import type { SetPasswordInput, SetPasswordResponse } from "../types"

export async function setPasswordService(
  input: SetPasswordInput,
): Promise<SetPasswordResponse> {
  const { recoverId, newPassword, acceptTerms = false } = input

  try {
    const response = await httpClient.post<SetPasswordResponse>('/auth/set-password', {
      recoverId,
      newPassword,
      acceptTerms,
    })

    if (typeof response.success !== "boolean") {
      throw new Error("Respuesta inválida del servidor")
    }

    return response
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al establecer contraseña: ${error.message}`)
    }
    throw new Error("Error al establecer contraseña")
  }
}
