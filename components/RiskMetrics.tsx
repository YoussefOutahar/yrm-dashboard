'use client'

import { Card, CardContent, Typography, Box, Button } from '@mui/material'

export default function RiskMetrics() {
  const profitTargetValue = 53025.00
  const profitTargetMax = 3025.00
  const profitPercentage = 66.94

  return (
    <>
      {/* Profit Target Card */}
      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px', mb: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Profit Target
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, fontSize: '2rem' }}>
            ${profitTargetMax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Equity Pass Level
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              ${profitTargetValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>

          {/* Striped Progress Bar with Circular Indicator */}
          <Box sx={{ position: 'relative', mb: 1 }}>
            <Box
              sx={{
                height: 16,
                borderRadius: 2,
                backgroundColor: 'rgba(0, 255, 136, 0.08)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${profitPercentage}%`,
                  background: `repeating-linear-gradient(
                    90deg,
                    #00ff88,
                    #00ff88 8px,
                    #00dd77 8px,
                    #00dd77 16px
                  )`,
                  borderRadius: 2,
                }}
              />
              {/* Circular Indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  left: `${profitPercentage}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid rgba(26, 26, 26, 0.9)',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              $0
            </Typography>
            <Typography variant="caption" fontWeight="bold" color="text.secondary">
              {profitPercentage}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${profitTargetMax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Max Drawdown Card */}
      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px', mb: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Max Drawdown
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, fontSize: '2rem' }}>
            $0
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              Maximum
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $2,000.00 Loss limit
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Equity Breach Level
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              $50,025.00
            </Typography>
          </Box>

          {/* Chart Area */}
          <Box
            sx={{
              height: 100,
              borderRadius: 2,
              background: 'linear-gradient(to bottom, rgba(139, 69, 19, 0.2) 0%, rgba(139, 69, 19, 0.4) 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Horizontal grid lines */}
            {[20, 40, 60, 80].map((pos) => (
              <Box
                key={pos}
                sx={{
                  position: 'absolute',
                  top: `${pos}%`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: 'rgba(139, 69, 19, 0.3)',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Consistency Rules Card */}
      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Consistency Rules
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="body2" color="text.secondary">
              Highest Profitable Day
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              $1525
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="body2" color="text.secondary">
              Number of Profitable Days
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              2 of 2
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Consistency
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                50%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              You need to maintain at least 50% consistency
            </Typography>
          </Box>

          {/* View Details Button */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: '#00ff88',
              color: '#00ff88',
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
              },
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
