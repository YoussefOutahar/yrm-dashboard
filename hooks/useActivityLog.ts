import { useState, useCallback, useEffect } from 'react'
import { activityLogService } from '@/services'
import type { Activity, ActivityType } from '@/types'

interface UseActivityLogOptions {
  userId?: string
  limit?: number
  autoFetch?: boolean
  onSuccess?: (message: string) => void
  onError?: (error: string) => void
}

/**
 * Custom hook for activity log operations
 * Provides a clean interface for fetching and adding activity logs
 */
export function useActivityLog(options: UseActivityLogOptions = {}) {
  const {
    userId,
    limit = 5,
    autoFetch = true,
    onSuccess,
    onError,
  } = options

  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch activities for the user
   */
  const fetchActivities = useCallback(async () => {
    if (!userId) {
      setError('User ID is required')
      return { success: false, error: 'User ID is required' }
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await activityLogService.getActivities(userId, limit)

    if (fetchError) {
      const errorMessage = fetchError.message || 'Failed to fetch activities'
      setError(errorMessage)
      setLoading(false)
      onError?.(errorMessage)
      return { success: false, error: errorMessage }
    }

    setActivities(data || [])
    setLoading(false)
    return { success: true, data }
  }, [userId, limit, onError])

  /**
   * Add a new activity
   */
  const addActivity = useCallback(
    async (type: ActivityType, message: string) => {
      if (!userId) {
        const errorMessage = 'User ID is required'
        setError(errorMessage)
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }

      setLoading(true)
      setError(null)

      const { data, error: addError } = await activityLogService.addActivity(userId, {
        type,
        message,
      })

      if (addError) {
        const errorMessage = addError.message || 'Failed to add activity'
        setError(errorMessage)
        setLoading(false)
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }

      setLoading(false)
      onSuccess?.('Activity logged successfully')

      // Refresh activities after adding
      await fetchActivities()

      return { success: true, data }
    },
    [userId, onSuccess, onError, fetchActivities]
  )

  /**
   * Clear the current error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Refresh activities manually
   */
  const refresh = useCallback(async () => {
    return await fetchActivities()
  }, [fetchActivities])

  // Auto-fetch activities on mount if enabled and userId is available
  useEffect(() => {
    if (autoFetch && userId) {
      fetchActivities()
    }
  }, [autoFetch, userId, fetchActivities])

  return {
    activities,
    loading,
    error,
    addActivity,
    fetchActivities,
    refresh,
    clearError,
  }
}
