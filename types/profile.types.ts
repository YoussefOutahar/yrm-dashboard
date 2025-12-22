import { User } from '@supabase/supabase-js'

/**
 * User metadata stored in Supabase Auth
 * Only fields that are part of raw_user_meta_data
 */
export interface UserMetadata {
  full_name?: string
  avatar_url?: string
}

/**
 * Profile update data
 * Only what Supabase Auth updateUser supports
 */
export interface ProfileUpdateData {
  data?: {
    full_name?: string
    avatar_url?: string
  }
  email?: string
  password?: string
}

/**
 * Password change request
 */
export interface PasswordChangeRequest {
  newPassword: string
  confirmPassword: string
}

/**
 * Profile response
 */
export interface ProfileResponse {
  user: User | null
  email: string
  id: string
}
