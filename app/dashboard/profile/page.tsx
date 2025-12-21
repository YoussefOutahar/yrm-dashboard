'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useActivityLog } from '@/contexts/ActivityLogContext'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Grid,
} from '@mui/material'

export default function ProfilePage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { addActivity } = useActivityLog()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setEmail(user.email || '')
      setFullName(user.user_metadata?.full_name || '')
      setPhone(user.user_metadata?.phone || '')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone: phone,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      addActivity('profile_update', 'Profile settings updated')
      setTimeout(() => setSuccess(false), 3000)
    }

    setLoading(false)
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Profile Settings
      </Typography>

      <Card sx={{ maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            Personal Information
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Profile updated successfully!
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  disabled
                  fullWidth
                  helperText="Email cannot be changed"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
