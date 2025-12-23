import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Neon Green
      light: '#33ff33',
      dark: '#00cc00',
    },
    secondary: {
      main: '#0dff92', // Bright Teal Green
      light: '#3dffaa',
      dark: '#00cc75',
    },
    success: {
      main: '#00ff00',
      light: '#33ff33',
      dark: '#00cc00',
    },
    error: {
      main: '#ff0033',
      light: '#ff3355',
      dark: '#cc0029',
    },
    warning: {
      main: '#ffaa00',
      light: '#ffbb33',
      dark: '#cc8800',
    },
    background: {
      default: '#000000', // Pure Black
      paper: '#0a0a0a', // Very Dark Gray
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #1a1a1a',
          '&:hover': {
            borderColor: 'rgba(0, 255, 0, 0.2)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #1a1a1a',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1a1a1a',
        },
        head: {
          fontWeight: 700,
          color: '#00ff00',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorSuccess: {
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          color: '#00ff00',
          border: '1px solid rgba(0, 255, 0, 0.3)',
        },
        colorPrimary: {
          backgroundColor: 'rgba(0, 255, 0, 0.15)',
          color: '#00ff00',
          border: '1px solid rgba(0, 255, 0, 0.3)',
        },
      },
    },
  },
})
