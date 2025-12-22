import { createClient } from '@/lib/supabase/client'
import type {
  ProfileUpdateData,
  PasswordChangeRequest,
  ProfileResponse,
  UserMetadata,
} from '@/types'
import { AuthError } from '@supabase/supabase-js'

/**
 * Profile Service
 * Uses only Supabase Auth API features
 */
class ProfileService {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<{ data: ProfileResponse | null; error: Error | null }> {
    try {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        return { data: null, error: error || new Error('User not found') }
      }

      const profile: ProfileResponse = {
        user,
        email: user.email || '',
        id: user.id,
      }

      return { data: profile, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  /**
   * Update user metadata
   * Uses Supabase Auth updateUser with data field
   */
  async updateMetadata(
    metadata: UserMetadata
  ): Promise<{ data: ProfileResponse | null; error: Error | null }> {
    try {
      const supabase = createClient()

      const { data: userData, error } = await supabase.auth.updateUser({
        data: metadata,
      })

      if (error || !userData.user) {
        return { data: null, error: error || new Error('Failed to update profile') }
      }

      return await this.getProfile()
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  /**
   * Update user password
   * Uses Supabase Auth updateUser with password field
   */
  async updatePassword(
    request: PasswordChangeRequest
  ): Promise<{ success: boolean; error: Error | null }> {
    try {
      // Validate passwords match
      if (request.newPassword !== request.confirmPassword) {
        return { success: false, error: new Error('Passwords do not match') }
      }

      // Validate password strength
      if (request.newPassword.length < 6) {
        return { success: false, error: new Error('Password must be at least 6 characters') }
      }

      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: request.newPassword,
      })

      if (error) {
        return { success: false, error }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }
}

// Export singleton instance
export const profileService = new ProfileService()
