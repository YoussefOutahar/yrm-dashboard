'use client'

import { Box, Typography, Card, CardContent } from '@mui/material'

export default function AdminSettingsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Admin Settings
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Settings page coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
