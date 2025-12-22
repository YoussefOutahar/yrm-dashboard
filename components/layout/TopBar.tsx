'use client'

import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import type { User } from '@supabase/supabase-js'

interface TopBarProps {
  title: string
  onMenuClick: () => void
  user?: User
}

export default function TopBar({ title, onMenuClick, user }: TopBarProps) {
  return (
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
          onClick={onMenuClick}
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
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              border: '2px solid',
              borderColor: 'primary.main',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {(user?.user_metadata?.full_name || user?.email || 'A').charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Toolbar>
    </AppBar>
  )
}
