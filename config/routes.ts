export const APP_ROUTES = {
  // Public routes
  HOME: '/',
  AUTH: '/auth',

  // Dashboard routes
  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: '/dashboard/profile',
    ADMIN: '/dashboard/admin',
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
