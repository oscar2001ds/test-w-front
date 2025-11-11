import { NextRequest, NextResponse } from 'next/server'
import { SidebarItem } from '@/src/modules/financial-simulator/types/side-bar.types'
import { sessionService } from '../../auth'

// Mapeo de rutas a items del sidebar
const ROUTE_TO_SIDEBAR_ITEM: Record<string, SidebarItem> = {
  '/financial-simulator/home': SidebarItem.Home,
  '/financial-simulator/my-simulations': SidebarItem.MySimulations,
  '/financial-simulator/super-admins': SidebarItem.SuperAdmins,
  '/financial-simulator/admins': SidebarItem.Admins,
  '/financial-simulator/supervisors': SidebarItem.Supervisors,
  '/financial-simulator/my-profile': SidebarItem.MyProfile,
}

// Configuración de permisos (sincronizada con protected-routes.ts)
const ROUTE_PERMISSIONS = {
  [SidebarItem.Home]: true,
  [SidebarItem.MySimulations]: true,
  [SidebarItem.SuperAdmins]: false,      // Cambia a true para habilitar
  [SidebarItem.Admins]: false,           // Cambia a true para habilitar
  [SidebarItem.Supervisors]: true,
  [SidebarItem.MyProfile]: true,
} as const

export function checkFinancialSimulatorRoute(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl

  // Solo procesar rutas del financial-simulator
  if (!pathname.startsWith('/financial-simulator/')) {
    return null
  }

  // Obtener el item del sidebar correspondiente a la ruta
  const sidebarItem = ROUTE_TO_SIDEBAR_ITEM[pathname]
  
  if (!sidebarItem) {
    // Ruta no encontrada, redirigir a home
    return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
  }

  // Verificar permisos
  if (!ROUTE_PERMISSIONS[sidebarItem]) {
    console.log(`🚫 [FINANCIAL-SIMULATOR] Acceso denegado a: ${pathname}`)
    return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
  }

  // Permitir acceso
  console.log(`✅ [FINANCIAL-SIMULATOR] Acceso permitido a: ${pathname}`)
  return null
}