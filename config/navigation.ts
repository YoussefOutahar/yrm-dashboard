import { ComponentType } from 'react'
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Assignment as ActivityIcon,
} from '@mui/icons-material'
import type { SvgIconProps } from '@mui/material'
import type { UserRole } from '@/types'
import { APP_ROUTES } from './routes'

export interface NavigationItem {
  path: string
  title: string
  icon: ComponentType<SvgIconProps>
}

/**
 * Regular User Navigation Items
 * Items that appear in the user dashboard sidebar
 */
export const userNavigation: NavigationItem[] = [
  {
    path: APP_ROUTES.DASHBOARD.ROOT,
    title: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    path: APP_ROUTES.DASHBOARD.PROFILE,
    title: 'Profile Settings',
    icon: PersonIcon,
  },
]

/**
 * Admin Navigation Items
 * Items that appear in the admin dashboard sidebar
 */
export const adminNavigation: NavigationItem[] = [
  {
    path: APP_ROUTES.ADMIN.ROOT,
    title: 'Dashboard',
    icon: AdminIcon,
  },
  {
    path: APP_ROUTES.ADMIN.USERS,
    title: 'Users',
    icon: PeopleIcon,
  },
  {
    path: APP_ROUTES.ADMIN.ACTIVITY,
    title: 'Activity Log',
    icon: ActivityIcon,
  },
  {
    path: APP_ROUTES.ADMIN.SETTINGS,
    title: 'Settings',
    icon: SettingsIcon,
  },
]

/**
 * Get navigation items based on user role
 */
export function getNavigationForRole(role: UserRole): NavigationItem[] {
  return role === 'admin' ? adminNavigation : userNavigation
}

// Helper to get navigation item by path
export const getNavItemByPath = (pathname: string): NavigationItem | undefined => {
  const allNavigation = [...userNavigation, ...adminNavigation]
  return allNavigation.find((item) => item.path === pathname)
}

// Helper to get page title from navigation
export const getPageTitle = (pathname: string): string => {
  return getNavItemByPath(pathname)?.title || 'Dashboard'
}