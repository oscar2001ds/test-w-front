"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  sessionService,
  User,
  loginService,
  LoginInput,
  logoutService,
  setPasswordService,
  SetPasswordInput,
  recoverPasswordService,
  RecoverPasswordInput,
  refreshAccessTokenService,
  RegisterInput,
  registerService
} from "@/src/modules/auth"
import { httpClient } from "@core/lib/http-client"

interface AuthContextValue {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  refetchUser: () => Promise<void>
  login: (input: LoginInput) => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  logout: () => Promise<boolean>
  setPassword: (input: SetPasswordInput) => Promise<boolean>
  recoverPassword: (input: RecoverPasswordInput) => Promise<string>
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => { },
  isLoading: true,
  refetchUser: async () => { },
  login: async () => { },
  register: async () => { },
  logout: async () => false,
  setPassword: async () => false,
  recoverPassword: async () => "",
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function initializeSession() {
    try {
      setIsLoading(true)
      const userData = await sessionService()
      if (userData) {
        setUser(userData)
        setIsLoading(false)
      } else {
        setUser(null)
        await refetchUser()
      }
    } catch (error) {
      console.error(error)
      await refetchUser()
    }
  }

  async function refetchUser() {
    try {
      setIsLoading(true)
      const response = await refreshAccessTokenService()
      if (response.success && response.access_token) {
        httpClient.setAuthToken(response.access_token)
        await initializeSession()
      }
      setIsLoading(false)
    } catch (error) {
      console.info(error)
      setIsLoading(false)
    }
  }
  async function login(input: LoginInput) {
    setIsLoading(true)
    const result = await loginService(input)
    setUser(result.user || null)
    await initializeSession()
    setIsLoading(false)
  }

  async function register(input: RegisterInput) {
    setIsLoading(true)
    const result = await registerService(input)
    setUser(result.user || null)
    await initializeSession()
    setIsLoading(false)
  }

  async function logout() {
    setIsLoading(true)
    const success = await logoutService()
    setUser(null)
    setIsLoading(false)
    return success
  }

  async function setPassword(input: SetPasswordInput): Promise<boolean> {
    setIsLoading(true)
    const response = await setPasswordService(input)
    if (response.success) {
      await initializeSession()
    }
    setIsLoading(false)
    return response.success
  }

  async function recoverPassword(input: RecoverPasswordInput): Promise<string> {
    setIsLoading(true)
    const response = await recoverPasswordService(input)
    setIsLoading(false)
    return response.message
  }

  async function init() {
    console.log("AuthContext initializing...", httpClient.hasAuthToken(), httpClient.getAuthToken())
    if (httpClient.hasAuthToken()) {
      await initializeSession()
    } else {
      await refetchUser()
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    console.log("AuthContext user changed:", user)
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        refetchUser: initializeSession,
        login,
        register,
        logout,
        setPassword,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
