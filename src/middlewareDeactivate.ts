import { NextRequest, NextResponse } from 'next/server'
import { checkFinancialSimulatorRoute } from '@modules/financial-simulator/middleware/route-guard'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let user = null

  try {
    const cookieHeader = request.headers.get('cookie') || undefined
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

    try {
      const response = await fetch(`${baseUrl}/auth/session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(cookieHeader && { 'Cookie': cookieHeader }),
        },
        credentials: 'include',
      })
      const data = await response.json()
      user = response.ok && data.user ? data.user : null
    } catch (error) {
      console.error('❌ [AUTH-MIDDLEWARE] Error en verificación de refresh token:', error)
    }

    if (user && pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/financial-simulator/home', request.url))
    }
    if (!user && pathname.startsWith('/financial-simulator/')) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  } catch (error) {
    user = null
    console.error('❌ [AUTH-MIDDLEWARE] Error verificando sesión:', error)
  }

  const financialSimulatorResponse = await checkFinancialSimulatorRoute(request, user?.role)
  if (financialSimulatorResponse) {
    return financialSimulatorResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/financial-simulator/:path*',
  ],
}