import { SimulationItem } from "../types/my-simulations.types"

export const PAGE_TITLES = {
  title: "Mis Simulaciones",
  subtitle: "Administra y visualiza todas tus simulaciones financieras"
} as const

export const BUTTON_LABELS = {
  refresh: "Actualizar",
  newSimulation: "Nueva Simulación",
  createFirst: "Crear Primera Simulación",
  viewDetails: "Ver detalles",
  edit: "Editar",
  downloadReport: "Descargar reporte",
  delete: "Eliminar",
  previous: "Anterior",
  next: "Siguiente"
} as const

export const FILTER_LABELS = {
  search: "Buscar simulaciones...",
  status: "Estado",
  category: "Categoría",
  all: "Todas"
} as const

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Activas' },
  { value: 'completed', label: 'Completadas' },
  { value: 'paused', label: 'Pausadas' }
] as const

export const STATUS_COLORS = {
  active: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  paused: "bg-yellow-100 text-yellow-800 border-yellow-200"
} as const

export const STATUS_LABELS = {
  active: "Activa",
  completed: "Completada",
  paused: "Pausada"
} as const

export const PAYMENT_METHOD_LABELS = {
  monthly: "Mensual",
  annual: "Anual"
} as const

export const STATS_LABELS = {
  totalSimulations: "Total Simulaciones",
  totalAmount: "Monto Total",
  activeSimulations: "Activas",
  averageReturn: "Rentabilidad Prom."
} as const

export const EMPTY_STATE = {
  title: "No tienes simulaciones aún",
  description: "Crea tu primera simulación financiera para empezar a planificar tu futuro."
} as const

export const PAGINATION_CONFIG = {
  itemsPerPage: 6,
  maxVisiblePages: 5
} as const

// Labels para el formulario
export const FORM_LABELS = {
  title: "Título de la simulación",
  amount: "Monto",
  currency: "Moneda",
  returnRate: "Tasa de retorno (%)",
  paymentMethod: "Método de pago",
  status: "Estado",
  startDate: "Fecha de inicio",
  endDate: "Fecha de finalización",
  termMonths: "Duración (meses)"
} as const

export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD - Dólar estadounidense' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'COP', label: 'COP - Peso colombiano' },
  { value: 'MXN', label: 'MXN - Peso mexicano' }
] as const

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'monthly', label: 'Mensual' },
  { value: 'annual', label: 'Anual' }
] as const