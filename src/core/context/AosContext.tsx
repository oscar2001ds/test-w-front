"use client"

import { ReactNode, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 400,
      easing: "ease-out",
    })
  }, [])

  return <>{children}</>
}
