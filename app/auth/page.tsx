'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useActivityLog } from '@/contexts/ActivityLogContext'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Tabs,
  Tab,
} from '@mui/material'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { addActivity } = useActivityLog()

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    setError('')
    setSuccess(false)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      addActivity('login', `User logged in: ${email}`)
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        setActiveTab(0)
        setSuccess(false)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }, 2000)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001a00 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            border: '1px solid #1a1a1a',
            '&:hover': {
              borderColor: 'rgba(0, 255, 0, 0.2)',
            },
          }}
        >
          <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold">
            YRM Dashboard
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
              },
              '& .Mui-selected': {
                color: 'primary.main',
              },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {error && <Alert severity="error">{error}</Alert>}
          {success && (
            <Alert severity="success">
              Account created successfully! You can now sign in.
            </Alert>
          )}

          {activeTab === 0 ? (
            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete="email"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete="email"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoComplete="new-password"
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                autoComplete="new-password"
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || success}
                fullWidth
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
