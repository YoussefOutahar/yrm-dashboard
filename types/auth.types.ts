import { User as SupabaseUser, AuthError } from '@supabase/supabase-js'

/**
 * Sign in credentials
 */
export interface SignInCredentials {
  email: string
  password: string
}

/**
 * Sign up credentials
 */
export interface SignUpCredentials {
  email: string
  password: string
  confirmPassword?: string
  emailRedirectTo?: string
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * Password update request
 */
export interface PasswordUpdateRequest {
  password: string
}

/**
 * Authentication response wrapper
 */
export interface AuthResponse<T = SupabaseUser | null> {
  data: T
  error: AuthError | null
}

/**
 * Authentication validation errors
 */
export interface AuthValidationError {
  field: 'email' | 'password' | 'confirmPassword'
  message: string
}

/**
 * User profile type (extend as needed)
 */
export interface UserProfile extends SupabaseUser {
  // Add custom profile fields here
  role?: 'trader' | 'admin' | 'user'
}

/**
 * Session data
 */
export interface SessionData {
  user: SupabaseUser | null
  isAuthenticated: boolean
}
