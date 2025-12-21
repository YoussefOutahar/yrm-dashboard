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
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            transition: 'all 0.3s ease',
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="text.primary">
              {getPageTitle(pathname)}
            </Typography>
          </Toolbar>
        </AppBar>
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
