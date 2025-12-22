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

export default function AdminPage() {
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
        return 'success'
      case 'Suspended':
        return 'error'
      case 'Pending':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Elite':
        return 'primary'
      case 'Pro':
        return 'secondary'
      case 'Standard':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            User Management
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Account Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.accountType}
                        size="small"
                        color={getAccountTypeColor(user.accountType) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        color={getStatusColor(user.status) as any}
                      />
                    </TableCell>
                    <TableCell align="right">
                      ${user.balance.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenDialog(user)}
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
