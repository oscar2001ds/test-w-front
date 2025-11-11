import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Calendar,
  DollarSign,
  Clock 
} from "lucide-react"
import { StatCardData, FeatureItem, GettingStartedStep } from "../types/home-view.types"

export const HERO_CONTENT = {
  title: "Simulador Financiero",
  subtitle: "Toma decisiones financieras inteligentes",
  description: "Planifica tu futuro financiero con herramientas avanzadas de simulación. Calcula inversiones, préstamos y proyecciones con datos precisos y actualizados.",
  primaryButtonText: "Crear Nueva Simulación"
} as const

export const STATS_CARDS: StatCardData[] = [
  {
    id: "total-invested",
    title: "Total Invertido",
    value: 0,
    icon: DollarSign,
    colorScheme: "green",
    description: "Monto total de tus inversiones activas"
  },
  {
    id: "simulations",
    title: "Simulaciones",
    value: 0,
    icon: BarChart3,
    colorScheme: "blue",
    description: "Número total de simulaciones creadas"
  },
  {
    id: "average-return",
    title: "Rentabilidad Promedio",
    value: "0%",
    icon: TrendingUp,
    colorScheme: "purple",
    description: "Rentabilidad promedio de tus simulaciones"
  },
  {
    id: "active-days",
    title: "Días Activo",
    value: 0,
    icon: Clock,
    colorScheme: "orange",
    description: "Días desde que empezaste a usar el simulador"
  }
]

export const FEATURES_LIST: FeatureItem[] = [
  {
    id: "investment-simulations",
    title: "Simulaciones de Inversión",
    description: "Calcula el valor futuro de tus inversiones con diferentes tasas de interés y plazos.",
    icon: Calculator,
    colorScheme: "blue"
  },
  {
    id: "time-planning",
    title: "Planificación Temporal",
    description: "Selecciona rangos de fechas y frecuencias de pago para obtener proyecciones precisas.",
    icon: Calendar,
    colorScheme: "green"
  },
  {
    id: "secure-data",
    title: "Datos Seguros",
    description: "Todas tus simulaciones se guardan de forma segura y puedes acceder a ellas cuando quieras.",
    icon: Shield,
    colorScheme: "purple"
  },
  {
    id: "comparative-analysis",
    title: "Análisis Comparativo",
    description: "Compara múltiples escenarios de inversión y elige la opción más rentable para tu perfil.",
    icon: BarChart3,
    colorScheme: "orange"
  }
]

export const GETTING_STARTED_STEPS: GettingStartedStep[] = [
  {
    id: "define-amount",
    stepNumber: 1,
    title: "Define tu monto",
    description: "Ingresa el valor que deseas invertir o simular",
    colorScheme: "blue"
  },
  {
    id: "select-term",
    stepNumber: 2,
    title: "Selecciona el plazo",
    description: "Elige entre pagos mensuales o anuales según tus necesidades",
    colorScheme: "blue"
  },
  {
    id: "define-dates",
    stepNumber: 3,
    title: "Define las fechas",
    description: "Establece el rango de fechas para tu simulación financiera",
    colorScheme: "blue"
  },
  {
    id: "get-results",
    stepNumber: 4,
    title: "Obtén resultados",
    description: "Visualiza proyecciones detalladas y guarda tus simulaciones",
    colorScheme: "green"
  }
]

export const RECENT_ACTIVITY_EMPTY_STATE = {
  title: "No hay simulaciones aún",
  description: "Crea tu primera simulación para empezar a ver tu actividad aquí",
  buttonText: "Ver todas"
} as const

export const SECTION_TITLES = {
  whatCanYouDo: "¿Qué puedes hacer?",
  howToStart: "Cómo empezar",
  recentActivity: "Actividad Reciente"
} as const