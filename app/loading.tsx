import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
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
      <CircularProgress
        size={60}
        sx={{
          color: '#00ff00',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
    </Box>
  )
}
