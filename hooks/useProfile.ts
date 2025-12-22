import { useState, useEffect, useCallback } from 'react'
import { profileService } from '@/services'
import type {
  ProfileResponse,
  UserMetadata,
  PasswordChangeRequest,
} from '@/types'

interface UseProfileOptions {
  loadOnMount?: boolean
  onUpdate?: () => void
  onError?: (error: string) => void
}

/**
 * Custom hook for profile management
 * Uses only Supabase Auth API features
 */
export function useProfile(options: UseProfileOptions = {}) {
  const { loadOnMount = true, onUpdate, onError } = options

  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Load user profile
   */
  const loadProfile = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: profileError } = await profileService.getProfile()

    if (profileError) {
      const errorMessage = profileError.message || 'Failed to load profile'
      setError(errorMessage)
      setLoading(false)
      onError?.(errorMessage)
      return
    }

    setProfile(data)
    setLoading(false)
  }, [onError])

  /**
   * Update profile metadata
   */
  const updateMetadata = useCallback(
    async (metadata: UserMetadata) => {
      setUpdating(true)
      setError(null)

      const { data: updatedProfile, error: updateError } = await profileService.updateMetadata(metadata)

      if (updateError) {
        const errorMessage = updateError.message || 'Failed to update profile'
        setError(errorMessage)
        setUpdating(false)
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }

      setProfile(updatedProfile)
      setUpdating(false)
      onUpdate?.()

      return { success: true, data: updatedProfile }
    },
    [onUpdate, onError]
  )

  /**
   * Update password
   */
  const updatePassword = useCallback(
    async (request: PasswordChangeRequest) => {
      setUpdating(true)
      setError(null)

      const { success, error: passwordError } = await profileService.updatePassword(request)

      if (passwordError) {
        const errorMessage = passwordError.message || 'Failed to update password'
        setError(errorMessage)
        setUpdating(false)
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }

      setUpdating(false)
      onUpdate?.()

      return { success: true }
    },
    [onUpdate, onError]
  )

  /**
   * Refresh profile data
   */
  const refresh = useCallback(async () => {
    await loadProfile()
  }, [loadProfile])

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Load profile on mount
  useEffect(() => {
    if (loadOnMount) {
      loadProfile()
    }
  }, [loadOnMount, loadProfile])

  return {
    profile,
    loading,
    updating,
    error,
    updateMetadata,
    updatePassword,
    refresh,
    clearError,
  }
}
