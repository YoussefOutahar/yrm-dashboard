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
      return 'success'
    case 'profile_update':
      return 'info'
    case 'admin_balance_adjustment':
      return 'warning'
    case 'ticker_change':
      return 'primary'
    case 'date_filter_update':
      return 'secondary'
    default:
      return 'default'
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
      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing all activity logs from all users across the system
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>Activity Type</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedActivities.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                            No activity logs found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedActivities.map((activity) => (
                        <TableRow key={activity.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {activity.user_name || 'Unknown User'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getActivityIcon(activity.type)}
                              label={formatActivityType(activity.type)}
                              size="small"
                              color={getActivityColor(activity.type) as any}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{activity.message}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {formatTimestamp(activity.timestamp)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={activities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
