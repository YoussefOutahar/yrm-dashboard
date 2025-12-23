import { createClient } from '@/lib/supabase/client'
import type {
  Activity,
  ActivityType,
  ActivityLogResponse,
  AddActivityRequest,
  AddActivityResponse,
} from '@/types'

/**
 * Activity Log Service
 * Handles all activity logging operations with Supabase
 */
class ActivityLogService {
  private readonly TABLE_NAME = 'activity_logs'

  /**
   * Get activities for a specific user
   * @param userId - The user's ID
   * @param limit - Maximum number of activities to fetch (default: 5)
   */
  async getActivities(userId: string, limit: number = 5): Promise<ActivityLogResponse> {
    try {
      if (!userId) {
        return { data: null, error: new Error('User ID is required') }
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit)

      if (error) {
        return { data: null, error }
      }

      // Convert timestamp strings to Date objects
      const activities: Activity[] = (data || []).map(activity => ({
        ...activity,
        timestamp: new Date(activity.timestamp),
      }))

      return { data: activities, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  /**
   * Get all activities across all users (admin only)
   * Calls the admin API endpoint which fetches activities with user names
   * using server-side admin access
   * @param limit - Maximum number of activities to fetch (default: 500)
   */
  async getAllActivities(limit: number = 500): Promise<ActivityLogResponse> {
    try {
      const response = await fetch(`/api/admin/activities?limit=${limit}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch activities' }))
        return { data: null, error: new Error(errorData.error || 'Failed to fetch activities') }
      }

      const { data, error } = await response.json()

      if (error) {
        return { data: null, error: new Error(error) }
      }

      // Convert timestamp strings to Date objects
      const activities: Activity[] = (data || []).map((activity: any) => ({
        ...activity,
        timestamp: new Date(activity.timestamp),
      }))

      return { data: activities, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  /**
   * Add a new activity for a user
   * @param userId - The user's ID
   * @param request - Activity details (type and message)
   */
  async addActivity(userId: string, request: AddActivityRequest): Promise<AddActivityResponse> {
    try {
      if (!userId) {
        return { data: null, error: new Error('User ID is required') }
      }

      if (!request.type) {
        return { data: null, error: new Error('Activity type is required') }
      }

      if (!request.message) {
        return { data: null, error: new Error('Activity message is required') }
      }

      const supabase = createClient()
      const newActivity = {
        user_id: userId,
        type: request.type,
        message: request.message,
        timestamp: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .insert([newActivity])
        .select()
        .single()

      if (error) {
        return { data: null, error }
      }

      // Convert timestamp string to Date object
      const activity: Activity = {
        ...data,
        timestamp: new Date(data.timestamp),
      }

      return { data: activity, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  /**
   * Delete old activities for a user (keep only recent ones)
   * @param userId - The user's ID
   * @param keepCount - Number of recent activities to keep (default: 5)
   */
  async cleanupOldActivities(userId: string, keepCount: number = 5): Promise<{ error: Error | null }> {
    try {
      if (!userId) {
        return { error: new Error('User ID is required') }
      }

      const supabase = createClient()

      // Get all activities ordered by timestamp
      const { data: activities, error: fetchError } = await supabase
        .from(this.TABLE_NAME)
        .select('id, timestamp')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })

      if (fetchError) {
        return { error: fetchError }
      }

      // If we have more than keepCount, delete the old ones
      if (activities && activities.length > keepCount) {
        const idsToDelete = activities.slice(keepCount).map(a => a.id)

        const { error: deleteError } = await supabase
          .from(this.TABLE_NAME)
          .delete()
          .in('id', idsToDelete)

        if (deleteError) {
          return { error: deleteError }
        }
      }

      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }
}

// Export singleton instance
export const activityLogService = new ActivityLogService()
