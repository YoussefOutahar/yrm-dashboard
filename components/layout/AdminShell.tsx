'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Box } from '@mui/material'
import { getPageTitle } from '@/config/navigation'
import AdminNav from './AdminNav'
import TopBar from './TopBar'
import type { User } from '@supabase/supabase-js'
import type { UserRole } from '@/types'

interface AdminShellProps {
  user: User
  role: UserRole
  children: React.ReactNode
}

export default function AdminShell({ user, role, children }: AdminShellProps) {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminNav user={user} role={role} open={open} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ pt: 1, pr: 1, pb: 0, pl: 0.5 }}>
          <TopBar title={getPageTitle(pathname)} onMenuClick={handleDrawerToggle} />
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
