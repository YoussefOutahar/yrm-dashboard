'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  CircularProgress,
} from '@mui/material'
import {
  Login as LoginIcon,
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  ShowChart as ChartIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material'
import type { Activity, ActivityType } from '@/types'

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
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export default function AdminActivityLogPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  useEffect(() => {
    const fetchAllActivities = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/admin/activities?limit=500')
        const result = await response.json()

        if (response.ok && result.data) {
          // Convert timestamp strings back to Date objects
          const activitiesWithDates = result.data.map((activity: any) => ({
            ...activity,
            timestamp: new Date(activity.timestamp),
          }))
          setActivities(activitiesWithDates)
        } else {
          console.error('Error fetching activities:', result.error)
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
      setLoading(false)
    }

    fetchAllActivities()
  }, [])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedActivities = activities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box>
      <Card
        sx={{
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
              Activity Logs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing all activity logs from all users across the system
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer
                sx={{
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        User Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        Activity Type
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        Message
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        Timestamp
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedActivities.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 8, border: 'none' }}>
                          <Typography variant="body2" color="text.secondary">
                            No activity logs found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedActivities.map((activity, index) => (
                        <TableRow
                          key={`activity-${index}-${activity.timestamp.getTime()}`}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            },
                            '&:last-child td': {
                              borderBottom: 'none',
                            },
                          }}
                        >
                          <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {activity.user_name || 'Unknown User'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2 }}>
                            <Chip
                              icon={getActivityIcon(activity.type)}
                              label={formatActivityType(activity.type)}
                              size="small"
                              sx={{
                                fontWeight: 500,
                                backgroundColor: getActivityColor(activity.type).bg,
                                color: getActivityColor(activity.type).text,
                                border: `1px solid ${getActivityColor(activity.type).border}`,
                                '& .MuiChip-icon': {
                                  color: getActivityColor(activity.type).text,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              {activity.message}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                              {formatTimestamp(activity.timestamp)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2 }}>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={activities.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    '.MuiTablePagination-toolbar': {
                      paddingLeft: 2,
                      paddingRight: 2,
                    },
                  }}
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
