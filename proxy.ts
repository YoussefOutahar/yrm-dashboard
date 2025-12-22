import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { getUserRole, getDashboardRouteForRole } from '@/lib/utils/roles'

export async function proxy(request: NextRequest) {
  // 1. Refresh session
  let supabaseResponse = await updateSession(request)

  // 2. Create Supabase client to check user
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // 3. Redirect authenticated users away from /auth
  if (pathname === '/auth' && user) {
    const role = getUserRole(user)
    const redirectUrl = getDashboardRouteForRole(role)
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // 4. Protect /dashboard routes - regular users only
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    const role = getUserRole(user)
    if (role === 'admin') {
      // Admins cannot access user dashboard
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // 5. Protect /admin routes - admins only
  if (pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    const role = getUserRole(user)
    if (role !== 'admin') {
      // Non-admins cannot access admin dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth',
  ],
}
