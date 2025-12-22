import type { User } from '@supabase/supabase-js'
import type { UserRole } from '@/types'
import { APP_ROUTES } from '@/config/routes'

/**
 * Extract user role from Supabase user metadata
 * Defaults to 'user' if role is missing or invalid
 */
export function getUserRole(user: User | null): UserRole {
  if (!user) return 'user'

  const role = user.user_metadata?.role as UserRole | undefined

  // Validate role and default to 'user' if invalid
  if (!role || !['user', 'admin', 'trader'].includes(role)) {
    return 'user'
  }

  return role
}

/**
 * Check if user is an admin
 */
export function isAdmin(user: User | null): boolean {
  return getUserRole(user) === 'admin'
}

/**
 * Check if user is a regular user (not admin)
 */
export function isRegularUser(user: User | null): boolean {
  const role = getUserRole(user)
  return role === 'user' || role === 'trader'
}

/**
 * Get the appropriate dashboard route for a user's role
 */
export function getDashboardRouteForRole(role: UserRole): string {
  return role === 'admin' ? APP_ROUTES.ADMIN.ROOT : APP_ROUTES.DASHBOARD.ROOT
}
