'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useActivityLog } from '@/contexts/ActivityLogContext'
import { APP_ROUTES } from '@/config/routes'
import { Box, Container, Typography, Alert, useMediaQuery } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import GlowCard from '@/components/auth/GlowCard'
import AnimatedInput from '@/components/auth/AnimatedInput'
import AnimatedButton from '@/components/auth/AnimatedButton'
import DarkVeil from '@/components/DarkVeil'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { addActivity } = useActivityLog()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const handleModeToggle = () => {
    setIsSignUp(!isSignUp)
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
      router.push(APP_ROUTES.DASHBOARD.ROOT)
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
        setIsSignUp(false)
        setSuccess(false)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }, 2000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          display: 'block',
        }}
      >
        <DarkVeil
          hueShift={120}
          noiseIntensity={0.05}
          scanlineIntensity={0}
          speed={0.7}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </Box>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <GlowCard enableTilt={!isMobile}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <img
                  src="/logo.svg"
                  alt="YRM Dashboard"
                  style={{
                    height: '40px',
                    width: 'auto',
                  }}
                />
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Account created successfully! You can now sign in.
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  mb={3}
                  sx={{ color: '#00ff00', fontWeight: 600 }}
                >
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </Typography>

                <Box
                  component="form"
                  onSubmit={isSignUp ? handleSignup : handleLogin}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <AnimatedInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />

                  <AnimatedInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    error={!!error && !isSignUp}
                  />

                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedInput
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </motion.div>
                  )}

                  <AnimatedButton
                    type="submit"
                    loading={loading}
                    success={success && isSignUp}
                    fullWidth
                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </AnimatedButton>

                  <Box textAlign="center" mt={3}>
                    <Typography variant="body2" color="text.secondary">
                      {isSignUp
                        ? 'Already have an account?'
                        : "Don't have an account?"}{' '}
                      <motion.span
                        onClick={handleModeToggle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          color: '#00ff00',
                          cursor: 'pointer',
                          fontWeight: 600,
                          textDecoration: 'none',
                          borderBottom: '1px solid transparent',
                          display: 'inline-block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderBottom =
                            '1px solid #00ff00'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderBottom =
                            '1px solid transparent'
                        }}
                      >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                      </motion.span>
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </GlowCard>
        </motion.div>
      </Container>
    </Box>
  )
}
