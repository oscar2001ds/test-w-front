import { UserRole } from "@/src/modules/auth"
import { SidebarItem } from "@/src/modules/financial-simulator/types/side-bar.types"

// Configuración centralizada de permisos por ruta
export const ROUTE_PERMISSIONS = {
  [SidebarItem.Home]: true,                    // Siempre disponible
  [SidebarItem.MySimulations]: true,           // Disponible para usuarios normales
  [SidebarItem.SuperAdmins]: false,            // Solo super admins
  [SidebarItem.Admins]: false,                 // Solo admins y super admins
  [SidebarItem.Supervisors]: true,             // Disponible para supervisors+
  [SidebarItem.Clients]: true,                 // Disponible para clients+
  [SidebarItem.MyProfile]: true,               // Siempre disponible
} as const

// Función para verificar si el usuario tiene acceso a una ruta
export function hasRouteAccess(route: SidebarItem, userRole?: UserRole): boolean {
  switch (route) {
    case SidebarItem.SuperAdmins:
      return ['super-adminnnnn'].includes(userRole || '')
    case SidebarItem.Admins:
      return ['super-admin'].includes(userRole || '')
    case SidebarItem.Supervisors:
      return ['super-admin', 'admin'].includes(userRole || '')
    case SidebarItem.Clients:
      return ['super-admin', 'admin', 'supervisor'].includes(userRole || '')
    default:
      return ROUTE_PERMISSIONS[route]
  }
}