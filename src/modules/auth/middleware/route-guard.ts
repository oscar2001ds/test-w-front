import { NextRequest, NextResponse } from 'next/server'

export async function checkAuthRoute(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl
  console.log('🔍 [AUTH-MIDDLEWARE] Verificando:', pathname)

  // Solo procesar rutas del auth
  if (!pathname.startsWith('/auth')) {
    return null
  }

  // Permitir acceso a auth
  console.log(`✅ [AUTH-MIDDLEWARE] Acceso permitido a: ${pathname}`)
  return null
}