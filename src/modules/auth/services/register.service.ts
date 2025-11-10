import { httpClient } from "@core/lib/http-client"
import type { 
  RegisterInput, 
  RegisterResponse,
  ResendVerificationInput,
  ResendVerificationResponse,
  VerifyEmailInput,
  VerifyEmailResponse 
} from "../types"

export async function registerService(input: RegisterInput): Promise<RegisterResponse> {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
  } = input

  // Validaciones básicas
  if (!username || !email || !password || !firstName) {
    throw new Error("Username, email, contraseña y nombre son obligatorios")
  }

  try {
    const response = await httpClient.post<RegisterResponse>('/auth/register', {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
    })

    if (!response.user || !response.access_token) {
      throw new Error("Error en el registro")
    }

    // Si el registro incluye login automático, configurar el token
    if (response.access_token) {
      httpClient.setAuthToken(response.access_token)
    }

    return response
  } catch (error) {
    if (error instanceof Error) {
      // Manejar errores específicos del servidor
      if (error.message.includes('409') || error.message.toLowerCase().includes('already exists')) {
        throw new Error("Este email ya está registrado")
      }
      if (error.message.includes('422') || error.message.toLowerCase().includes('validation')) {
        throw new Error("Datos de registro inválidos. Verifica la información ingresada")
      }
      throw new Error(`Error de registro: ${error.message}`)
    }
    throw new Error("Error de registro desconocido")
  }
}

// Servicio para verificar si un email ya está registrado
export async function checkEmailAvailability(email: string): Promise<boolean> {
  try {
    const response = await httpClient.get<{ available: boolean; message?: string }>(
      `/auth/check-email?email=${encodeURIComponent(email)}`
    )
    
    return response.available
  } catch (error) {
    console.error("Error verificando disponibilidad del email:", error)
    // En caso de error, asumimos que está disponible para no bloquear el registro
    return true
  }
}

// Servicio para reenviar email de verificación

export async function resendVerificationEmail(input: ResendVerificationInput): Promise<ResendVerificationResponse> {
  try {
    const response = await httpClient.post<ResendVerificationResponse>('/auth/resend-verification', {
      email: input.email.toLowerCase().trim()
    })

    return response
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error reenviando verificación: ${error.message}`)
    }
    throw new Error("Error reenviando verificación")
  }
}

// Servicio para verificar email con token

export async function verifyEmailService(input: VerifyEmailInput): Promise<VerifyEmailResponse> {
  try {
    const response = await httpClient.post<VerifyEmailResponse>('/auth/verify-email', input)

    if (!response.success) {
      throw new Error(response.message || "Error verificando email")
    }

    return response
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.toLowerCase().includes('not found')) {
        throw new Error("Token de verificación inválido o expirado")
      }
      throw new Error(`Error verificando email: ${error.message}`)
    }
    throw new Error("Error verificando email")
  }
}