export const PAGE_TITLES = {
  title: "Mi Perfil",
  subtitle: "Gestiona tu información personal y configuración de la cuenta"
} as const

export const BUTTON_LABELS = {
  edit: "Editar",
  save: "Guardar",
  cancel: "Cancelar",
  update: "Actualizar",
  changeAvatar: "Cambiar Avatar",
  deleteAccount: "Eliminar Cuenta",
  exportData: "Exportar Datos"
} as const

export const SECTION_LABELS = {
  personalInfo: "Información Personal",
  accountSettings: "Configuración de Cuenta", 
  preferences: "Preferencias",
  stats: "Estadísticas",
  activity: "Actividad Reciente"
} as const

export const FIELD_LABELS = {
  fullName: "Nombre Completo",
  username: "Nombre de Usuario", 
  email: "Correo Electrónico",
  role: "Rol",
  isActive: "Estado de Cuenta",
  lastLoginAt: "Último Acceso",
  createdAt: "Miembro Desde",
  firstName: "Nombre",
  lastName: "Apellido"
} as const

export const ROLE_LABELS = {
  "super-admin": "Super Administrador",
  "admin": "Administrador", 
  "supervisor": "Supervisor",
  "client": "Cliente"
} as const

export const ROLE_COLORS = {
  "super-admin": "bg-red-100 text-red-800 border-red-200",
  "admin": "bg-orange-100 text-orange-800 border-orange-200",
  "supervisor": "bg-blue-100 text-blue-800 border-blue-200", 
  "client": "bg-green-100 text-green-800 border-green-200"
} as const

export const STATUS_LABELS = {
  active: "Activa",
  inactive: "Inactiva"
} as const

export const STATUS_COLORS = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-red-100 text-red-800 border-red-200"
} as const

export const STATS_LABELS = {
  totalSimulations: "Total Simulaciones",
  totalInvested: "Total Invertido", 
  averageReturn: "Retorno Promedio",
  activeDays: "Días Activos",
  memberSince: "Miembro Desde",
  lastActivity: "Última Actividad"
} as const

export const FORM_VALIDATION = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  firstName: {
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    minLength: 2,
    maxLength: 50
  }
} as const

export const ERROR_MESSAGES = {
  loadProfile: "Error al cargar el perfil",
  updateProfile: "Error al actualizar el perfil",
  invalidEmail: "Formato de email inválido",
  invalidUsername: "Nombre de usuario inválido", 
  requiredField: "Este campo es obligatorio",
  networkError: "Error de conexión"
} as const

export const SUCCESS_MESSAGES = {
  profileUpdated: "Perfil actualizado exitosamente",
  avatarUpdated: "Avatar actualizado exitosamente"
} as const