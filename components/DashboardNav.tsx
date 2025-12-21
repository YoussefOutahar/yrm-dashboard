'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
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
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import type { User } from '@supabase/supabase-js'

const drawerWidth = 240
const drawerWidthCollapsed = 64

interface DashboardNavProps {
  user: User
  open: boolean
}

export default function DashboardNav({ user, open }: DashboardNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile Settings', icon: <PersonIcon />, path: '/dashboard/profile' },
    { text: 'Admin View', icon: <AdminIcon />, path: '/dashboard/admin' },
  ]

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
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                justifyContent: open ? 'initial' : 'center',
                borderRadius: '12px',
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 136, 0.15)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{
                color: pathname === item.path ? 'primary.main' : 'inherit',
                minWidth: open ? 56 : 'auto',
                justifyContent: 'center',
              }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 1 }} />
      <List sx={{ mt: 'auto', px: 1, py: 1 }}>
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
    </Drawer>
  )
}
