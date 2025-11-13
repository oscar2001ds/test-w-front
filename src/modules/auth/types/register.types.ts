// === REGISTER USER ===
export type RegisterInput = Readonly<{
  username: string
  email: string
  password: string
  firstName: string
  lastName?: string
}>

export type RegisterResponse = Readonly<{
  user?: {
    id: string
    username: string
    email: string
    firstName: string
    lastName?: string
    fullName: string
  }
}>

// === EMAIL VERIFICATION ===
export type ResendVerificationInput = {
  email: string
}

export type ResendVerificationResponse = {
  success: boolean
  message: string
}

export type VerifyEmailInput = {
  token: string
  email?: string
}

export type VerifyEmailResponse = {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    verified: boolean
  }
}