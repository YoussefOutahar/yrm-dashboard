import { Box, CircularProgress, Typography } from '@mui/material'

export default function ProfileLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress
        size={50}
        sx={{
          color: '#00ff00',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Typography variant="body1" color="text.secondary">
        Loading profile...
      </Typography>
    </Box>
  )
}
