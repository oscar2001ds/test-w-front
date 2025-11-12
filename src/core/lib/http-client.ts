import { BASE_CONFIG } from "../config/base-config"

class HttpClient {
  private baseURL: string
  private defaultHeaders: HeadersInit

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)

      if (response.status === 204) {
        return {} as T
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `HTTP Error: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error de red o servidor')
    }
  }

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
      cache: 'no-store',
    })
  }

  async post<T>(
    endpoint: string,
    body?: any,
    headers?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers,
      credentials: 'include',
      cache: 'no-store',
    })
  }

  async put<T>(
    endpoint: string,
    body?: any,
    headers?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      headers,
      credentials: 'include',
      cache: 'no-store',
    })
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    headers?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      headers,
      credentials: 'include',
      cache: 'no-store',
    })
  }

  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
      cache: 'no-store',
    })
  }
}

export const httpClient = new HttpClient(BASE_CONFIG.API_URL)

export default httpClient