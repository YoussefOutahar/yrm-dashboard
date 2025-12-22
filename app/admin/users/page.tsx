'use client'

import { useState } from 'react'
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
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { useActivityLog, useProfile } from '@/hooks'

interface User {
  id: string
  name: string
  accountType: 'Standard' | 'Pro' | 'Elite'
  status: 'Active' | 'Suspended' | 'Pending'
  balance: number
}

const mockUsers: User[] = [
  { id: '1', name: 'John Smith', accountType: 'Pro', status: 'Active', balance: 10450 },
  { id: '2', name: 'Sarah Johnson', accountType: 'Elite', status: 'Active', balance: 25800 },
  { id: '3', name: 'Mike Davis', accountType: 'Standard', status: 'Active', balance: 5200 },
  { id: '4', name: 'Emily Wilson', accountType: 'Pro', status: 'Suspended', balance: 12300 },
  { id: '5', name: 'David Brown', accountType: 'Elite', status: 'Pending', balance: 0 },
  { id: '6', name: 'Lisa Martinez', accountType: 'Standard', status: 'Active', balance: 3850 },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newBalance, setNewBalance] = useState('')
  const { profile } = useProfile()
  const { addActivity } = useActivityLog({
    userId: profile?.id,
    autoFetch: false,
  })

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user)
    setNewBalance(user.balance.toString())
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedUser(null)
    setNewBalance('')
  }

  const handleAdjustBalance = () => {
    if (selectedUser) {
      const balance = parseFloat(newBalance)
      if (!isNaN(balance)) {
        setUsers(users.map(u =>
          u.id === selectedUser.id ? { ...u, balance } : u
        ))
        addActivity(
          'admin_balance_adjustment',
          `Adjusted ${selectedUser.name}'s balance to $${balance.toLocaleString()}`
        )
        handleCloseDialog()
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          bg: 'rgba(76, 175, 80, 0.15)',
          text: '#4caf50',
          border: 'rgba(76, 175, 80, 0.3)',
        }
      case 'Suspended':
        return {
          bg: 'rgba(244, 67, 54, 0.15)',
          text: '#ef5350',
          border: 'rgba(244, 67, 54, 0.3)',
        }
      case 'Pending':
        return {
          bg: 'rgba(255, 193, 7, 0.15)',
          text: '#ffca28',
          border: 'rgba(255, 193, 7, 0.3)',
        }
      default:
        return {
          bg: 'rgba(158, 158, 158, 0.15)',
          text: '#9e9e9e',
          border: 'rgba(158, 158, 158, 0.3)',
        }
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Elite':
        return {
          bg: 'rgba(255, 215, 0, 0.15)',
          text: '#ffd700',
          border: 'rgba(255, 215, 0, 0.4)',
        }
      case 'Pro':
        return {
          bg: 'rgba(138, 43, 226, 0.15)',
          text: '#9370db',
          border: 'rgba(138, 43, 226, 0.3)',
        }
      case 'Standard':
        return {
          bg: 'rgba(96, 125, 139, 0.15)',
          text: '#90a4ae',
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
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage user accounts, balances, and permissions
            </Typography>
          </Box>

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
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                    Account Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                    Status
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                    Balance
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.875rem', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={`user-row-${index}`}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      },
                      '&:last-child td': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2.5 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {user.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2.5 }}>
                      <Chip
                        label={user.accountType}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: getAccountTypeColor(user.accountType).bg,
                          color: getAccountTypeColor(user.accountType).text,
                          border: `1px solid ${getAccountTypeColor(user.accountType).border}`,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2.5 }}>
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: getStatusColor(user.status).bg,
                          color: getStatusColor(user.status).text,
                          border: `1px solid ${getStatusColor(user.status).border}`,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2.5 }}>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        ${user.balance.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', py: 2.5 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenDialog(user)}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      >
                        Adjust Balance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Adjust Balance</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Adjusting balance for: <strong>{selectedUser?.name}</strong>
            </Typography>
            <TextField
              label="New Balance"
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              fullWidth
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAdjustBalance} variant="contained">
            Update Balance
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
