'use client'

import { Card, CardContent, Typography, Box, Chip, CircularProgress } from '@mui/material'
import { useActivityLog } from '@/hooks'
import { useProfile } from '@/hooks'
import { format } from 'date-fns'
import {
  Login,
  Person,
  AttachMoney,
  TrendingUp,
  DateRange,
} from '@mui/icons-material'

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'login':
      return <Login fontSize="small" />
    case 'profile_update':
      return <Person fontSize="small" />
    case 'admin_balance_adjustment':
      return <AttachMoney fontSize="small" />
    case 'ticker_change':
      return <TrendingUp fontSize="small" />
    case 'date_filter_update':
      return <DateRange fontSize="small" />
    default:
      return null
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'login':
      return {
        bg: 'rgba(76, 175, 80, 0.15)',
        text: '#4caf50',
        border: 'rgba(76, 175, 80, 0.3)',
      }
    case 'profile_update':
      return {
        bg: 'rgba(33, 150, 243, 0.15)',
        text: '#42a5f5',
        border: 'rgba(33, 150, 243, 0.3)',
      }
    case 'admin_balance_adjustment':
      return {
        bg: 'rgba(255, 152, 0, 0.15)',
        text: '#ffa726',
        border: 'rgba(255, 152, 0, 0.3)',
      }
    case 'ticker_change':
      return {
        bg: 'rgba(156, 39, 176, 0.15)',
        text: '#ab47bc',
        border: 'rgba(156, 39, 176, 0.3)',
      }
    case 'date_filter_update':
      return {
        bg: 'rgba(96, 125, 139, 0.15)',
        text: '#78909c',
        border: 'rgba(96, 125, 139, 0.3)',
      }
    default:
      return {
        bg: 'rgba(158, 158, 158, 0.15)',
        text: '#9e9e9e',
        border: 'rgba(158, 158, 158, 0.3)',
      }
  }
}

export default function ActivityLog() {
  const { profile } = useProfile()
  const { activities, loading } = useActivityLog({
    userId: profile?.id,
    limit: 5,
    autoFetch: true,
  })

  return (
    <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Recent Activity
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : activities.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No recent activity
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activities.map((activity) => (
              <Box
                key={activity.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  p: 2,
                  backgroundColor: 'background.default',
                  border: '1px solid #1a1a1a',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'rgba(0, 255, 0, 0.2)',
                    backgroundColor: 'rgba(0, 255, 0, 0.02)',
                  },
                }}
              >
                <Box sx={{ mt: 0.5 }}>
                  {getActivityIcon(activity.type)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {activity.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(activity.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                  </Typography>
                </Box>
                <Chip
                  label={activity.type.replace(/_/g, ' ')}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    backgroundColor: getActivityColor(activity.type).bg,
                    color: getActivityColor(activity.type).text,
                    border: `1px solid ${getActivityColor(activity.type).border}`,
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
