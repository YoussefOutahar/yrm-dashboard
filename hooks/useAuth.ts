import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services'
import type { SignInCredentials, SignUpCredentials } from '@/types'
import { APP_ROUTES } from '@/config/routes'

interface UseAuthOptions {
  redirectOnSuccess?: boolean
  redirectUrl?: string
  onSuccess?: (email: string) => void
  onError?: (error: string) => void
}

/**
 * Custom hook for authentication operations
 * Provides a clean interface for sign in, sign up, and sign out
 */
export function useAuth(options: UseAuthOptions = {}) {
  const {
    redirectOnSuccess = false,
    redirectUrl = APP_ROUTES.DASHBOARD.ROOT,
    onSuccess,
    onError,
  } = options

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  /**
   * Sign in with email and password
   */
  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      setLoading(true)
      setError(null)

      const { data, error: authError } = await authService.signIn(credentials)

      if (authError) {
        const errorMessage = authError.message || 'Failed to sign in'
        setError(errorMessage)
        setLoading(false)
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }

      setLoading(false)
      onSuccess?.(credentials.email)

      if (redirectOnSuccess) {
        router.push(redirectUrl)
        router.refresh()
      }

      return { success: true, user: data }
    },
    [redirectOnSuccess, redirectUrl, router, onSuccess, onError]
  )

  /**
   * Sign up with email and password
   */
  const signUp = useCallback(
    async (credentials: SignUpCredentials) => {
      setLoading(true)
      setError(null)

      const { data, error: authError } = await authService.signUp(credentials)

      if (authError) {
        const errorMessage = authError.message || 'Failed to create account'
        setError(errorMessage)
        setLoading(false)
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }

      setLoading(false)
      onSuccess?.(credentials.email)

      return { success: true, user: data }
    },
    [onSuccess, onError]
  )

  /**
   * Sign out the current user
   */
  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { error: authError } = await authService.signOut()

    if (authError) {
      const errorMessage = authError.message || 'Failed to sign out'
      setError(errorMessage)
      setLoading(false)
      onError?.(errorMessage)
      return { success: false, error: errorMessage }
    }

    setLoading(false)
    router.push(APP_ROUTES.AUTH)
    router.refresh()

    return { success: true }
  }, [router, onError])

  /**
   * Clear the current error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    signIn,
    signUp,
    signOut,
    loading,
    error,
    clearError,
  }
}
