// === RECOVER PASSWORD ===
export interface RecoverPasswordInput {
  username: string
  gre?: string
}

export type RecoverPasswordResponse = {
  recoverId?: string
  message: string
  success: boolean
}

// === SET PASSWORD ===
export type SetPasswordInput = Readonly<{
  recoverId: string
  newPassword: string
  acceptTerms?: boolean
}>

export type SetPasswordResponse = {
  success: boolean
  message?: string
}

// === CHANGE PASSWORD (future) ===
export type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type ChangePasswordResponse = {
  success: boolean
  message?: string
}