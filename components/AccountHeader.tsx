'use client'

import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import Grid from '@mui/material/Grid'
import { CalendarToday, AccountBalance } from '@mui/icons-material'

export default function AccountHeader() {
  return (
    <Card sx={{ backgroundColor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" color="primary">
            Account YRM00000
          </Typography>
          <Chip label="Active" color="success" size="small" />
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
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
                <AccountBalance />
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
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
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
                <AccountBalance />
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
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
