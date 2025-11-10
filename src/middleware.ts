import { NextRequest, NextResponse } from 'next/server'
import { checkFinancialSimulatorRoute } from '@modules/financial-simulator/middleware/route-guard'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si está autenticado usando solo cookies
  try {
    const cookieHeader = request.headers.get('cookie') || undefined
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

    // Verificar si el refresh token es válido
    const response = await fetch(`${baseUrl}/auth/verify-refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader }),
      },
      credentials: 'include',
    })
    const data = await response.json()
    const isValidSession = data.valid === true

    if (isValidSession && pathname.startsWith('/auth')) {
      console.log(`🚫 [AUTH-MIDDLEWARE] Ya autenticado, redirigiendo desde: ${pathname}`)
      return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
    }
    if (!isValidSession && pathname.startsWith('/financial-simulator/')) {
      console.log(`🚫 [AUTH-MIDDLEWARE] No autenticado, redirigiendo desde: ${pathname}`)
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  } catch (error) {
    console.error('❌ [AUTH-MIDDLEWARE] Error verificando sesión:', error)
  }

  // Verificar rutas del financial-simulator
  const financialSimulatorResponse = await checkFinancialSimulatorRoute(request)
  if (financialSimulatorResponse) {
    return financialSimulatorResponse
  }

  // Continuar con otras verificaciones de middleware si las hay
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Coincidir con rutas del financial-simulator
     */
    '/auth/:path*',
    '/financial-simulator/:path*',
  ],
}