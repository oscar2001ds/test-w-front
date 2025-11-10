"use client"

import { useAuth } from "@/src/core/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push('/auth')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
    { name: 'Auth (should redirect)', path: '/auth' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>

          {user && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Usuario Autenticado ✅
              </h2>
              <div className="text-green-700">
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Username:</span> {user.username}</p>
                {user.fullName && (
                  <p><span className="font-medium">Nombre Completo:</span> {user.fullName}</p>
                )}
                <p><span className="font-medium">Estado:</span> {user.isActive ? 'Activo' : 'Inactivo'}</p>
                <p><span className="font-medium">Role:</span> {user.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navegación de prueba */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Navegación de Prueba</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">{item.path}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Información del middleware */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Estado del Middleware</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Ruta Actual:</span>
              <span className="text-gray-600">/dashboard</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tipo de Ruta:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">PROTEGIDA</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Usuario:</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">AUTENTICADO</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones</h2>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Recargar Página (Test Persistence)
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-2 rounded-lg transition-colors ml-0 md:ml-4"
            >
              {isLoggingOut ? 'Cerrando Sesión...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}