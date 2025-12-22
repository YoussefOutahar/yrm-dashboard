export const APP_ROUTES = {
  // Public routes
  HOME: '/',
  AUTH: '/auth',

  // Dashboard routes (regular users)
  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: '/dashboard/profile',
  },

  // Admin routes
  ADMIN: {
    ROOT: '/admin',
    USERS: '/admin/users',
    ACTIVITY: '/admin/activity',
  },
} as const

// Type helper to extract all route values
type RouteValues<T> = T extends object
  ? { [K in keyof T]: RouteValues<T[K]> }[keyof T]
  : T

export type AppRoute = RouteValues<typeof APP_ROUTES>

// Helper function to check if a path matches a route
export const isRoute = (pathname: string, route: string): boolean => {
  return pathname === route
}

// Helper to check if pathname is within dashboard
export const isDashboardRoute = (pathname: string): boolean => {
  return pathname.startsWith(APP_ROUTES.DASHBOARD.ROOT)
}

// Helper to check if pathname is within admin
export const isAdminRoute = (pathname: string): boolean => {
  return pathname.startsWith(APP_ROUTES.ADMIN.ROOT)
}

// Helper to get default route for a given role
export function getDefaultRouteForRole(role: 'user' | 'admin' | 'trader'): string {
  return role === 'admin' ? APP_ROUTES.ADMIN.ROOT : APP_ROUTES.DASHBOARD.ROOT
}
