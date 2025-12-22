'use client'

import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

interface TopBarProps {
  title: string
  onMenuClick: () => void
}

export default function TopBar({ title, onMenuClick }: TopBarProps) {
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
      </Toolbar>
    </AppBar>
  )
}
