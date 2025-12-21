'use client'

import { useEffect } from 'react'
import { Box, Button, Typography, Container } from '@mui/material'
import { Error as ErrorIcon, Refresh } from '@mui/icons-material'

export default function Error({
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001a00 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            border: '1px solid rgba(255, 0, 51, 0.3)',
            borderRadius: 2,
            bgcolor: 'rgba(255, 0, 51, 0.05)',
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 2,
            }}
          />
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Something went wrong!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {error.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={reset}
            size="large"
          >
            Try Again
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
