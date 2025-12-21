'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import DashboardNav from './DashboardNav'
import type { User } from '@supabase/supabase-js'

const drawerWidth = 240
const drawerWidthCollapsed = 64

interface DashboardLayoutClientProps {
  user: User
  children: React.ReactNode
}

const getPageTitle = (pathname: string) => {
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname === '/dashboard/profile') return 'Profile Settings'
  if (pathname === '/dashboard/admin') return 'Admin View'
  return 'Dashboard'
}

export default function DashboardLayoutClient({ user, children }: DashboardLayoutClientProps) {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardNav user={user} open={open} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ pt: 1, pr: 1, pb: 0, pl: 0.5 }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(26, 26, 26, 0.9)',
              borderRadius: '16px',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="toggle drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{
                  mr: 2,
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" color="text.primary">
                {getPageTitle(pathname)}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
