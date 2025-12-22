'use client'

import { Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material'
import Grid from '@mui/material/Grid'
import { CalendarToday, AccountBalance } from '@mui/icons-material'

interface SemiCircleGaugeProps {
  value: number | string
  percentage: number
  label: string
  color: string
  minLabel: string
  maxLabel: string
}

function SemiCircleGauge({ value, percentage, label, color, minLabel, maxLabel }: SemiCircleGaugeProps) {
  const radius = 70
  const strokeWidth = 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * Math.PI // Half circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg height={radius + 20} width={radius * 2 + 20}>
        {/* Background arc */}
        <path
          d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2} ${radius}`}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2} ${radius}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <Box sx={{ position: 'absolute', top: '35%', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1, px: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {minLabel}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {maxLabel}
        </Typography>
      </Box>
    </Box>
  )
}

export default function TraderOverview() {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Account Header */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
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
        </Grid>

        {/* Performance Section */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Performance
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <SemiCircleGauge
                    value="100.00%"
                    percentage={100}
                    label="Trade win %"
                    color="#8b5cf6"
                    minLabel="0"
                    maxLabel="0"
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <SemiCircleGauge
                    value="100.00%"
                    percentage={100}
                    label="Day win %"
                    color="#8b5cf6"
                    minLabel="0"
                    maxLabel="0"
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <SemiCircleGauge
                    value="2"
                    percentage={66}
                    label="Profit factor"
                    color="#06b6d4"
                    minLabel="0"
                    maxLabel="0"
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <SemiCircleGauge
                    value="1"
                    percentage={50}
                    label="Win Loss Ratio"
                    color="#3b82f6"
                    minLabel="0"
                    maxLabel="0"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - Targets and Limits */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%', backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
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
        </Grid>
      </Grid>

      {/* Trade Growth View Chart Placeholder */}
      <Box sx={{ mt: 3 }}>
        <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <AccountBalance fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Balance
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  $52,025.00
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Trade Growth View - Chart will be integrated here
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
