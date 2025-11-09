"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
}

export interface BreakpointState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

interface BreakpointsContextType extends BreakpointState { }

const BreakpointsContext = createContext<BreakpointsContextType | undefined>(undefined)

interface BreakpointsProviderProps {
  children: ReactNode
}

export function BreakpointsProvider({ children }: BreakpointsProviderProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const updateBreakpoints = () => {
    const width = window.innerWidth

    setIsMobile(width < BREAKPOINTS.mobile)
    setIsTablet(width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet)
    setIsDesktop(width >= BREAKPOINTS.tablet)
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    updateBreakpoints()
    window.addEventListener("resize", updateBreakpoints)

    return () => {
      window.removeEventListener("resize", updateBreakpoints)
    }
  }, [])

  const value: BreakpointsContextType = {
    isMobile,
    isTablet,
    isDesktop,
  }

  return (
    <BreakpointsContext.Provider value={value}>
      {children}
    </BreakpointsContext.Provider>
  )
}

export function useBreakpoints(): BreakpointState {
  const context = useContext(BreakpointsContext)

  if (context === undefined) {
    throw new Error("useBreakpoints must be used within a BreakpointsProvider")
  }

  return context
}