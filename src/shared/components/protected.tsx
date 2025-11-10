"use client"

import { useAuth } from "@/src/core/context/AuthContext"
import { UserRole } from "@/src/modules/auth"

interface ProtectedProps {
  roles: UserRole[]
  children: React.ReactNode
}

export function Protected({ roles, children }: ProtectedProps) {
  const { user } = useAuth()

  if (!user) return null
  if (!roles.includes(user.role!)) return null

  return <>{children}</>
}
