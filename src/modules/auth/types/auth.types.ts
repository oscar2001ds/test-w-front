// === FORMS ===
export type AuthOption = "login" | "register" | "forgotPassword";
export interface AuthFormPreviewProps {
  handleOptionChange?: (option: AuthOption) => void;
}

// === LOGIN ===
export type LoginInput = Readonly<{
  email: string
  password: string
  remember?: boolean
  app?: string
}>

export type LoginResponse = Readonly<{
  user?: {
    id: string
    username: string
    email: string
    firstName: string
    lastName?: string
    fullName: string
  }
  access_token?: string
}>

// === REFRESH TOKEN ===
export type RefreshTokenResponse = {
  access_token?: string
  success: boolean
  message?: string
  error?: boolean
}

// === SESSION ===
export type UserRole = 'super-admin' | 'admin' | 'supervisor' | 'client'

export type User = Readonly<{
  id: string
  username: string
  email: string
  firstName: string
  lastName?: string
  fullName: string
  isActive?: boolean
  lastLoginAt?: string
  role?: UserRole
}>

export type SessionResponse = {
  user?: User
  success: boolean
  message?: string
}