import { httpClient } from "@core/lib/http-client"
import type { LoginInput, LoginResponse } from "../types"

export async function loginService(input: LoginInput): Promise<LoginResponse> {
  const { email, password } = input

  try {
    const response = await httpClient.post<LoginResponse>('/auth/login', {
      email,
      password,
      remember: input.remember || false,
      app: input.app || 'dashboard',
    })

    if (!response.user) {
      throw new Error("Credenciales inválidas o respuesta inesperada")
    }

    return response
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error de login: ${error.message}`)
    }
    throw new Error("Error de login desconocido")
  }
}
