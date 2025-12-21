'use client'

import { useEffect } from 'react'
import { Box, Button, Typography, Alert } from '@mui/material'
import { Refresh } from '@mui/icons-material'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 3,
        p: 4,
      }}
    >
      <Alert
        severity="error"
        sx={{
          maxWidth: 600,
          '& .MuiAlert-icon': {
            fontSize: 40,
          },
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Dashboard Error
        </Typography>
        <Typography variant="body2">
          {error.message || 'Failed to load dashboard. Please try again.'}
        </Typography>
      </Alert>
      <Button
        variant="contained"
        startIcon={<Refresh />}
        onClick={reset}
        size="large"
      >
        Reload Dashboard
      </Button>
    </Box>
  )
}
