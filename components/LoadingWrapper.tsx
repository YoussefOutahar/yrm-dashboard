'use client'

import { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

interface LoadingWrapperProps {
  children: React.ReactNode
}

/**
 * LoadingWrapper - Handles loading state during auth initialization
 * Does NOT handle routing - that's done by proxy.ts
 * Only shows loading spinner while checking auth state
 */
export function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const initAuth = async () => {
      // Wait for initial auth check
      await supabase.auth.getUser()
      setLoading(false)
    }

    initAuth()

    // Listen for auth state changes to update loading state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        // Show loading during SIGNED_OUT to prevent flash of content
        if (event === 'SIGNED_OUT') {
          setLoading(true)
        } else {
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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

  return <>{children}</>
}
