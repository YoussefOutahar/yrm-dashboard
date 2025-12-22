import { createClient } from '@/lib/supabase/client'
import type {
  SignInCredentials,
  SignUpCredentials,
  PasswordResetRequest,
  PasswordUpdateRequest,
  AuthResponse,
  AuthValidationError,
} from '@/types'
import { AuthError } from '@supabase/supabase-js'

/**
 * Authentication Service
 * Handles all authentication-related operations
 */
class AuthService {
  /**
   * Validate email format
   */
  private validateEmail(email: string): AuthValidationError | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return { field: 'email', message: 'Email is required' }
    }
    if (!emailRegex.test(email)) {
      return { field: 'email', message: 'Invalid email format' }
    }
    return null
  }

  /**
   * Validate password strength
   */
  private validatePassword(password: string): AuthValidationError | null {
    if (!password) {
      return { field: 'password', message: 'Password is required' }
    }
    if (password.length < 6) {
      return { field: 'password', message: 'Password must be at least 6 characters' }
    }
    return null
  }

  /**
   * Validate password confirmation
   */
  private validatePasswordConfirmation(
    password: string,
    confirmPassword: string
  ): AuthValidationError | null {
    if (password !== confirmPassword) {
      return { field: 'confirmPassword', message: 'Passwords do not match' }
    }
    return null
  }

  /**
   * Sign in with email and password
   */
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    try {
      // Validate inputs
      const emailError = this.validateEmail(credentials.email)
      if (emailError) {
        return {
          data: null,
          error: new AuthError(emailError.message) as any,
        }
      }

      const passwordError = this.validatePassword(credentials.password)
      if (passwordError) {
        return {
          data: null,
          error: new AuthError(passwordError.message) as any,
        }
      }

      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      return {
        data: data.user,
        error,
      }
    } catch (error) {
      return {
        data: null,
        error: error as AuthError,
      }
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    try {
      // Validate inputs
      const emailError = this.validateEmail(credentials.email)
      if (emailError) {
        return {
          data: null,
          error: new AuthError(emailError.message) as any,
        }
      }

      const passwordError = this.validatePassword(credentials.password)
      if (passwordError) {
        return {
          data: null,
          error: new AuthError(passwordError.message) as any,
        }
      }

      // Validate password confirmation if provided
      if (credentials.confirmPassword) {
        const confirmError = this.validatePasswordConfirmation(
          credentials.password,
          credentials.confirmPassword
        )
        if (confirmError) {
          return {
            data: null,
            error: new AuthError(confirmError.message) as any,
          }
        }
      }

      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: credentials.emailRedirectTo,
          data: {
            role: 'user', // Default role assignment
          },
        },
      })

      return {
        data: data.user,
        error,
      }
    } catch (error) {
      return {
        data: null,
        error: error as AuthError,
      }
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser() {
    try {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      return { data: user, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  }

  /**
   * Get the current session
   */
  async getSession() {
    try {
      const supabase = createClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      return { data: session, error }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  }

  /**
   * Request a password reset email
   */
  async requestPasswordReset(request: PasswordResetRequest): Promise<{ error: AuthError | null }> {
    try {
      const emailError = this.validateEmail(request.email)
      if (emailError) {
        return {
          error: new AuthError(emailError.message) as any,
        }
      }

      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(request.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Update the user's password
   */
  async updatePassword(request: PasswordUpdateRequest): Promise<{ error: AuthError | null }> {
    try {
      const passwordError = this.validatePassword(request.password)
      if (passwordError) {
        return {
          error: new AuthError(passwordError.message) as any,
        }
      }

      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: request.password,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    const supabase = createClient()
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Export a singleton instance
export const authService = new AuthService()
