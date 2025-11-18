export const BASE_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  
} as const