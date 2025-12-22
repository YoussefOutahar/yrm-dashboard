import { ComponentType } from 'react'
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material'
import type { SvgIconProps } from '@mui/material'
import { APP_ROUTES } from './routes'

export interface NavigationItem {
  path: string
  title: string
  icon: ComponentType<SvgIconProps>
}

/**
 * Dashboard Navigation Items
 * Items that appear in the dashboard sidebar
 */
export const dashboardNavigation: NavigationItem[] = [
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
  {
    path: APP_ROUTES.DASHBOARD.ADMIN,
    title: 'Admin View',
    icon: AdminIcon,
  },
]

// Helper to get navigation item by path
export const getNavItemByPath = (pathname: string): NavigationItem | undefined => {
  return dashboardNavigation.find((item) => item.path === pathname)
}

// Helper to get page title from navigation
export const getPageTitle = (pathname: string): string => {
  return getNavItemByPath(pathname)?.title || 'Dashboard'
}