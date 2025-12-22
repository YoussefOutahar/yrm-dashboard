'use client'

import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Login as LoginIcon,
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  ShowChart as ChartIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material'
import { useActivityLog, useProfile } from '@/hooks'
import type { ActivityType } from '@/types'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
              {value}
            </Typography>
            {change && (
              <Typography variant="body2" color="success.main">
                {change}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case 'login':
      return <LoginIcon fontSize="small" />
    case 'profile_update':
      return <EditIcon fontSize="small" />
    case 'admin_balance_adjustment':
      return <MoneyIcon fontSize="small" />
    case 'ticker_change':
      return <ChartIcon fontSize="small" />
    case 'date_filter_update':
      return <CalendarIcon fontSize="small" />
    default:
      return <EditIcon fontSize="small" />
  }
}

function getActivityColor(type: ActivityType) {
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

function formatActivityType(type: ActivityType) {
  switch (type) {
    case 'login':
      return 'Login'
    case 'profile_update':
      return 'Profile Update'
    case 'admin_balance_adjustment':
      return 'Balance Adjustment'
    case 'ticker_change':
      return 'Ticker Change'
    case 'date_filter_update':
      return 'Date Filter Update'
    default:
      return type
  }
}

function formatTimestamp(date: Date) {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return `${days} day${days > 1 ? 's' : ''} ago`
}

export default function AdminDashboardPage() {
  const { profile } = useProfile()
  const { activities, loading } = useActivityLog({
    userId: profile?.id,
    autoFetch: true,
  })

  const stats = {
    totalUsers: 1248,
    activeUsers: 1156,
    pendingUsers: 12,
    totalRevenue: 458750,
  }

  // Get last 5 activities
  const recentActivities = activities?.slice(0, 5) || []

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change="+12% from last month"
            icon={<PeopleIcon />}
            color="#00ff88"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            change="+8% from last month"
            icon={<TrendingUpIcon />}
            color="#00bfff"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Requests"
            value={stats.pendingUsers}
            icon={<PersonAddIcon />}
            color="#ffaa00"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Revenue"
            value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
            change="+15% from last month"
            icon={<AccountBalanceIcon />}
            color="#ff5555"
          />
        </Grid>
      </Grid>

      {/* User Distribution */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                User Account Distribution
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Elite</Typography>
                  <Typography variant="body2" fontWeight="bold">342 (27%)</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={27}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Pro</Typography>
                  <Typography variant="body2" fontWeight="bold">586 (47%)</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={47}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'secondary.main',
                    },
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Standard</Typography>
                  <Typography variant="body2" fontWeight="bold">320 (26%)</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={26}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'text.secondary',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Recent Activity (Last 5 Actions)
              </Typography>
              {loading ? (
                <Typography variant="body2" color="text.secondary">
                  Loading activities...
                </Typography>
              ) : recentActivities.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No recent activities
                </Typography>
              ) : (
                recentActivities.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      mb: 2,
                      pb: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': {
                        mb: 0,
                        pb: 0,
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Chip
                        icon={getActivityIcon(activity.type)}
                        label={formatActivityType(activity.type)}
                        size="small"
                        sx={{
                          height: 24,
                          fontWeight: 500,
                          backgroundColor: getActivityColor(activity.type).bg,
                          color: getActivityColor(activity.type).text,
                          border: `1px solid ${getActivityColor(activity.type).border}`,
                          '& .MuiChip-icon': {
                            color: getActivityColor(activity.type).text,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {activity.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTimestamp(activity.timestamp)}
                    </Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Box>
  )
}
