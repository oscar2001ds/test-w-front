import { SidebarItem } from "@/src/modules/financial-simulator/types/side-bar.types"

// Configuración centralizada de permisos por ruta
export const ROUTE_PERMISSIONS = {
  [SidebarItem.Home]: true,                    // Siempre disponible
  [SidebarItem.MySimulations]: true,           // Disponible para usuarios normales
  [SidebarItem.SuperAdmins]: false,            // Solo super admins
  [SidebarItem.Admins]: false,                 // Solo admins y super admins
  [SidebarItem.Supervisors]: true,             // Disponible para supervisors+
  [SidebarItem.MyProfile]: true,               // Siempre disponible
} as const

// Función para verificar si el usuario tiene acceso a una ruta
export function hasRouteAccess(route: SidebarItem, userRole?: string): boolean {
  // Si la ruta está explícitamente deshabilitada
  if (!ROUTE_PERMISSIONS[route]) {
    return false
  }

  // Aquí puedes agregar lógica adicional basada en roles
  switch (route) {
    case SidebarItem.SuperAdmins:
      return userRole === 'SUPER_ADMIN'
    case SidebarItem.Admins:
      return ['SUPER_ADMIN', 'ADMIN'].includes(userRole || '')
    case SidebarItem.Supervisors:
      return ['SUPER_ADMIN', 'ADMIN', 'SUPERVISOR'].includes(userRole || '')
    default:
      return ROUTE_PERMISSIONS[route]
  }
}

// Función para obtener rutas disponibles para el usuario
export function getAvailableRoutes(userRole?: string): SidebarItem[] {
  return Object.keys(ROUTE_PERMISSIONS).filter(route => 
    hasRouteAccess(route as SidebarItem, userRole)
  ) as SidebarItem[]
}