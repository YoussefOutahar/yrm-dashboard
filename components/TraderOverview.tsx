'use client'

import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface TraderStat {
  label: string
  value: string
  current?: number
  max?: number
  status?: 'good' | 'warning' | 'danger'
}

const mockData: TraderStat[] = [
  { label: 'Balance', value: '$10,450.00', status: 'good' },
  { label: 'Daily Loss Limit', value: '$500.00', current: 250, max: 500, status: 'good' },
  { label: 'Max Drawdown', value: '$1,200.00', current: 800, max: 1200, status: 'warning' },
  { label: 'Profit Target', value: '$5,000.00', current: 2450, max: 5000, status: 'good' },
]

export default function TraderOverview() {
  const getProgressColor = (status?: string) => {
    switch (status) {
      case 'good':
        return 'success'
      case 'warning':
        return 'warning'
      case 'danger':
        return 'error'
      default:
        return 'primary'
    }
  }

  const getProgressValue = (current?: number, max?: number) => {
    if (!current || !max) return 0
    return (current / max) * 100
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TrendingUp color="success" />
          <Typography variant="h5" fontWeight="bold">
            Trader Overview
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mockData.map((stat) => (
            <Box key={stat.label}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
              {stat.current !== undefined && stat.max !== undefined && (
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue(stat.current, stat.max)}
                    color={getProgressColor(stat.status)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    ${stat.current.toLocaleString()} / ${stat.max.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TrendingUp fontSize="small" sx={{ color: 'success.main' }} />
          <Typography variant="body2" color="success.main">
            Account in good standing
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
