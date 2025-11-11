export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface UserSimulation {
  id: string
  title: string
  amount: number
  currency: string
  returnRate: number
  paymentMethod: 'monthly' | 'annual'
  createdAt: string
  lastUpdated: string
  status: 'active' | 'completed' | 'paused'
}

// Get User Simulations

export interface GetUserSimulationsParams {
  userId?: string
  page?: number
  limit?: number
  status?: 'active' | 'completed' | 'paused' | 'all'
}

export interface GetUserSimulationsResponse {
  simulations: UserSimulation[]
  pagination: Pagination
}

// Create Simulation

export interface CreateSimulationPayload {
  title: string
  amount: number
  currency: string
  returnRate: number
  paymentMethod: 'monthly' | 'annual'
}

// Update Simulation

export interface UpdateSimulationPayload {
  id: string
  title?: string
  amount?: number
  currency?: string
  returnRate?: number
  paymentMethod?: 'monthly' | 'annual'
  status?: 'active' | 'completed' | 'paused'
}

// Simulation Stats

export interface SimulationStats {
  totalInvested: number
  totalSimulations: number
  averageReturn: number
  activeDays: number
}

export interface SimulationStatsResponse {
  totalSimulations: number;
  activeSimulations: number;
  completedSimulations: number;
  pausedSimulations: number;
  totalInvested: number;
  totalProjectedReturns: number;
  averageReturnRate: number;
  userActiveDays: number;
}
