'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { getNavigationForRole } from '@/config/navigation'
import { APP_ROUTES } from '@/config/routes'
import type { UserRole } from '@/types'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material'
import {
  Logout as LogoutIcon,
  Description as GuideIcon,
} from '@mui/icons-material'
import type { User } from '@supabase/supabase-js'

const drawerWidth = 240
const drawerWidthCollapsed = 64

interface DashboardNavProps {
  user: User
  role: UserRole
  open: boolean
}

export default function DashboardNav({ user, role, open }: DashboardNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  // Get role-specific navigation
  const navigation = getNavigationForRole(role)

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(APP_ROUTES.AUTH)
    router.refresh()
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : drawerWidthCollapsed,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : drawerWidthCollapsed,
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          border: 'none',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          height: 'calc(100vh - 16px)',
          my: 1,
          ml: 1,
          mr: 0.5,
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <Box sx={{ py: 2, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 64 }}>
        {open ? (
          <Image
            src="/logo.svg"
            alt="YRM Logo"
            width={120}
            height={22}
            priority
          />
        ) : (
          <Image
            src="/logo-small.svg"
            alt="YRM"
            width={32}
            height={22}
            priority
          />
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 1 }} />
      <List sx={{ px: 1, py: 1 }}>
        {navigation.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={item.disabled ? 'div' : Link}
              href={item.disabled ? undefined : item.path}
              selected={!item.disabled && pathname === item.path}
              disabled={item.disabled}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                justifyContent: open ? 'initial' : 'center',
                borderRadius: '12px',
                mb: 0.5,
                opacity: item.disabled ? 0.4 : 1,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                '&:hover': {
                  backgroundColor: item.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 136, 0.15)',
                  },
                },
                '&.Mui-disabled': {
                  opacity: 0.4,
                },
              }}
            >
              <ListItemIcon sx={{
                color: !item.disabled && pathname === item.path ? 'primary.main' : 'inherit',
                minWidth: open ? 56 : 'auto',
                justifyContent: 'center',
              }}>
                <item.icon />
              </ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 1 }} />
      <Box sx={{ mt: 'auto', px: 1, py: 1 }}>
        <List sx={{ p: 0 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                justifyContent: open ? 'initial' : 'center',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: open ? 56 : 'auto',
                justifyContent: 'center',
              }}>
                <GuideIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Guide" />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              disabled={loading}
              sx={{
                justifyContent: open ? 'initial' : 'center',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: open ? 56 : 'auto',
                justifyContent: 'center',
              }}>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary={loading ? 'Logging out...' : 'Logout'} />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      </Box>
    </Drawer>
  )
}
