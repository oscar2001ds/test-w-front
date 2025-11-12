import { UserRole } from "../../auth";

// Títulos dinámicos por tipo de usuario
export const PAGE_TITLES: Record<UserRole, { title: string; subtitle: string }> = {
  "super-admin": {
    title: "Gestión de Super Administradores",
    subtitle: "Administra y supervisa todos los super administradores de la plataforma"
  },
  client: {
    title: "Gestión de Clientes",
    subtitle: "Administra y supervisa todos los clientes de la plataforma"
  },
  supervisor: {
    title: "Gestión de Supervisores", 
    subtitle: "Administra y supervisa todos los supervisores de la plataforma"
  },
  admin: {
    title: "Gestión de Administradores",
    subtitle: "Administra y supervisa todos los administradores de la plataforma"
  }
} as const

export const BUTTON_LABELS = {
  refresh: "Actualizar",
  export: "Exportar",
  viewDetails: "Ver Detalles",
  editRole: "Editar Rol",
  save: "Guardar",
  cancel: "Cancelar",
  close: "Cerrar",
  filters: "Filtros",
  clearFilters: "Limpiar Filtros"
} as const

export const FILTER_LABELS = {
  search: "Buscar por nombre, email o username...",
  status: "Estado",
  all: "Todos",
  active: "Activos",
  inactive: "Inactivos"
} as const

// Opciones de roles para el modal de cambio de rol
export const ROLE_OPTIONS = [
  { value: 'client', label: 'Cliente' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'admin', label: 'Administrador' }
] as const

// Colores para los badges de roles
export const ROLE_COLORS = {
  client: 'bg-blue-100 text-blue-800',
  supervisor: 'bg-purple-100 text-purple-800', 
  admin: 'bg-red-100 text-red-800'
} as const

// Configuración de exportación
export const EXPORT_CONFIG = {
  formats: ['csv', 'xlsx'],
  defaultFormat: 'csv',
  filename: 'usuarios'
} as const

// Mensajes de error
export const ERROR_MESSAGES = {
  loadUsers: "Error al cargar los usuarios",
  loadStats: "Error al cargar las estadísticas",
  updateRole: "Error al actualizar el rol del usuario",
  exportData: "Error al exportar los datos",
  generic: "Ha ocurrido un error inesperado"
} as const

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  roleUpdated: "Rol actualizado correctamente",
  dataRefreshed: "Datos actualizados correctamente",
  dataExported: "Datos exportados correctamente"
} as const

// Configuración de ordenamiento
export const SORT_OPTIONS = [
  { value: 'name', label: 'Nombre' },
  { value: 'createdAt', label: 'Fecha de registro' },
  { value: 'lastLoginAt', label: 'Último acceso' },
  { value: 'totalInvested', label: 'Total invertido' },
  { value: 'totalSimulations', label: 'Simulaciones' }
] as const

// Configuración de vista
export const VIEW_CONFIG = {
  defaultLayout: 'grid' as const,
  gridCols: {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  }
}