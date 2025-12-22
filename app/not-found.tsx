'use client'

import { Box, Button, Typography, Container } from '@mui/material'
import { SearchOff, Home } from '@mui/icons-material'
import Link from 'next/link'

export default function NotFound() {
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
            border: '1px solid rgba(0, 255, 0, 0.2)',
            borderRadius: 2,
            bgcolor: 'rgba(0, 255, 0, 0.02)',
          }}
        >
          <SearchOff
            sx={{
              fontSize: 100,
              color: 'primary.main',
              mb: 2,
            }}
          />
          <Typography variant="h1" fontWeight="bold" sx={{ mb: 1, fontSize: '4rem' }}>
            404
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            startIcon={<Home />}
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
