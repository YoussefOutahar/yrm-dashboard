'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'
import { createClient } from '@/lib/supabase/client'
import { getUserRole, getDashboardRouteForRole } from '@/lib/utils/roles'
import type { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
}

const PUBLIC_ROUTES = ['/auth']

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      // Handle redirects based on auth status and current route
      if (pathname === '/') {
        // Home route: redirect based on auth status
        if (user) {
          const role = getUserRole(user)
          router.push(getDashboardRouteForRole(role))
        } else {
          router.push('/auth')
        }
      } else if (!user && !PUBLIC_ROUTES.includes(pathname)) {
        // Not authenticated and trying to access protected route
        router.push('/auth')
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const newUser = session?.user ?? null
        setUser(newUser)

        if (pathname === '/') {
          if (newUser) {
            const role = getUserRole(newUser)
            router.push(getDashboardRouteForRole(role))
          } else {
            router.push('/auth')
          }
        } else if (!newUser && !PUBLIC_ROUTES.includes(pathname)) {
          router.push('/auth')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [pathname, router])

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001a00 100%)',
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            color: '#00ff00',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    )
  }

  // Allow access to public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return <>{children}</>
  }

  // Home route will redirect, show loading
  if (pathname === '/') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001a00 100%)',
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            color: '#00ff00',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    )
  }

  // Require authentication for all other routes
  if (!user) {
    // Show loading while redirecting to auth
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001a00 100%)',
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            color: '#00ff00',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    )
  }

  return <>{children}</>
}
