'use client'

import { useState, useEffect } from 'react'
import { useProfile, useAuth, useActivityLog } from '@/hooks'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Grid,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material'
import {
  Person,
  Lock,
  Email,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signOut } = useAuth()

  const {
    profile,
    loading,
    updating,
    error,
    updateMetadata,
    updatePassword,
    clearError,
  } = useProfile()

  const { addActivity } = useActivityLog({
    userId: profile?.id,
    autoFetch: false,
  })

  // Form states
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  // Password form states
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Update form when profile loads
  useEffect(() => {
    if (profile?.user?.user_metadata) {
      setFullName(profile.user.user_metadata.full_name || '')
      setAvatarUrl(profile.user.user_metadata.avatar_url || '')
    }
  }, [profile])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    clearError()
    setSuccess(false)
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await updateMetadata({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    if (result?.success) {
      setSuccess(true)
      addActivity('profile_update', 'Profile updated')
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await updatePassword({
      newPassword,
      confirmPassword,
    })

    if (result.success) {
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  if (loading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px' }}>
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab icon={<Person />} label="Profile" iconPosition="start" />
            <Tab icon={<Lock />} label="Security" iconPosition="start" />
          </Tabs>

          {success && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Changes saved successfully!
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 3 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          {/* Profile Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box component="form" onSubmit={handleProfileUpdate}>
              <Grid container spacing={3}>
                {/* Avatar Preview */}
                <Grid size={{ xs: 12 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Avatar
                      src={profile?.user?.user_metadata?.avatar_url}
                      alt={profile?.user?.user_metadata?.full_name || 'User'}
                      sx={{
                        width: 80,
                        height: 80,
                        border: '2px solid',
                        borderColor: 'primary.main',
                      }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {profile?.user?.user_metadata?.full_name || 'Anonymous'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {profile?.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Avatar URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    fullWidth
                    placeholder="https://example.com/avatar.jpg"
                    helperText="Enter a URL to an image (e.g., https://github.com/username.png)"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Email"
                    type="email"
                    value={profile?.email || ''}
                    disabled
                    fullWidth
                    helperText="Email cannot be changed from this interface"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={updating}
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={activeTab} index={1}>
            <Box component="form" onSubmit={handlePasswordUpdate}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                    Change Password
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Update your password to keep your account secure.
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    required
                    helperText="Minimum 6 characters"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={updating}
                  >
                    {updating ? 'Updating...' : 'Update Password'}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Account Actions
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  )
}
