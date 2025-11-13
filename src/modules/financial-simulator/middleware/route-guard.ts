import { NextRequest, NextResponse } from 'next/server'
import { SidebarItem } from '@/src/modules/financial-simulator/types/side-bar.types'
import { UserRole } from '../../auth'
import { hasRouteAccess } from '@/src/core/config/protected-routes'

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

  if (!pathname.startsWith('/financial-simulator/')) {
    return null
  }

  const sidebarItem = ROUTE_TO_SIDEBAR_ITEM[pathname]

  if (!sidebarItem) {
    return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
  }

  if (!hasRouteAccess(sidebarItem, userRole)) {
    return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
  }

  return null
}