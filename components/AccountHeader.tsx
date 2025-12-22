'use client'

import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { CalendarToday, AttachMoney, BusinessCenter, Key } from '@mui/icons-material'

export default function AccountHeader() {
  return (
    <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
      <CardContent sx={{ pb: 2 }}>
        {/* First Row: Account Number and Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1" color="primary">
            Account YTRM00000
          </Typography>
          <Chip label="Active" color="success" size="small" />
        </Box>

        {/* Second Row: KPI Info and Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
          {/* KPI Info */}
          <Box sx={{ display: 'flex', gap: 4, flex: 1 }}>
            {/* Program */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                <BusinessCenter />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Program
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  STARTER
                </Typography>
              </Box>
            </Box>

            {/* Account Size */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                <AttachMoney />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Account Size
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  $50,000.00
                </Typography>
              </Box>
            </Box>

            {/* Trade Period */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                <CalendarToday />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Trade Period
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  09/15/2025 - 09/23/2025
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(239, 68, 68, 0.5)',
                color: '#ef4444',
                textTransform: 'none',
                borderRadius: '12px',
                px: 3,
                '&:hover': {
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              Start New Challenge
            </Button>
            <Button
              variant="outlined"
              startIcon={<Key />}
              color="primary"
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                px: 3,
              }}
            >
              Credentials
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
