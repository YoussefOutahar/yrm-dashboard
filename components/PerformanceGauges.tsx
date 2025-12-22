'use client'

import { Card, CardContent, Typography, Box } from '@mui/material'
import Grid from '@mui/material/Grid'

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

export default function PerformanceGauges() {
  return (
    <Card>
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
  )
}
