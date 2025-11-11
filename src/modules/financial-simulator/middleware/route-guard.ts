import { NextRequest, NextResponse } from 'next/server'
import { SidebarItem } from '@/src/modules/financial-simulator/types/side-bar.types'
import { UserRole } from '../../auth'
import { hasRouteAccess } from '@/src/core/config/protected-routes'

// Mapeo de rutas a items del sidebar
const ROUTE_TO_SIDEBAR_ITEM: Record<string, SidebarItem> = {
  '/financial-simulator/home': SidebarItem.Home,
  '/financial-simulator/my-simulations': SidebarItem.MySimulations,
  '/financial-simulator/super-admins': SidebarItem.SuperAdmins,
  '/financial-simulator/admins': SidebarItem.Admins,
  '/financial-simulator/supervisors': SidebarItem.Supervisors,
  '/financial-simulator/clients': SidebarItem.Clients,
  '/financial-simulator/my-profile': SidebarItem.MyProfile,
}

export function checkFinancialSimulatorRoute(request: NextRequest, userRole?: UserRole): NextResponse | null {
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
  if (!hasRouteAccess(sidebarItem, userRole)) {
    console.log(`🚫 [FINANCIAL-SIMULATOR] Acceso denegado a: ${pathname}`)
    return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
  }

  // Permitir acceso
  console.log(`✅ [FINANCIAL-SIMULATOR] Acceso permitido a: ${pathname}`)
  return null
}