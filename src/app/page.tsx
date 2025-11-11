"use client"

import { useAuth } from "@/src/core/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex w-screen h-screen min-h-screen items-center justify-center bg-linear-to-l from-[#054c76] via-[#0c192a] to-[#471c3a]">
      {user ? (
        <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Bienvenido {user.firstName}! 👋
            </h1>
            <div className="space-y-4">
              <div className="bg-[#0d3b5b51] border border-[#0D3B5B] rounded-lg p-4">
                <p className="text-[#0D3B5B]">
                  Empieza a explorar las funcionalidades de tu cuenta.
                </p>
                <button
                  onClick={() => router.push('/financial-simulator')}
                  className="w-full cursor-pointer bg-[#331C34] hover:bg-[#4B2C4D] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Ir a Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Bienvenido! 👋
              </h1>
              <div className="space-y-4">
                <div className="bg-[#0d3b5b51] border border-[#0D3B5B] rounded-lg p-4">
                  <p className="text-[#0D3B5B]">
                    No se encontró información del usuario
                  </p>
                </div>

                <button
                  onClick={() => router.push('/auth')}
                  className="w-full cursor-pointer bg-[#331C34] hover:bg-[#4B2C4D] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Ir a Autenticación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
