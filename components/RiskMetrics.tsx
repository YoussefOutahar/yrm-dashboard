'use client'

import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'

export default function RiskMetrics() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Profit Target
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            $3,025.00
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Equity Pass Level
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              $0
            </Typography>
            <Typography variant="caption" fontWeight="bold" color="success.main">
              $53,025.00
            </Typography>
            <Typography variant="caption" color="text.secondary">
              $3,025.00
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#00ff88',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Max Drawdown
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            $0
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Maximum
            </Typography>
            <Typography variant="caption" color="error.main">
              $2,000.00 loss limit
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Equity Breach Level
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Typography variant="caption" fontWeight="bold">
              $50,025.00
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 85, 85, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#ff5555',
              },
            }}
          />
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            Consistency Rules
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Highest Profitable Day
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              $1525
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Number of Profitable Days
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              2 of 2
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Consistency
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              50%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
