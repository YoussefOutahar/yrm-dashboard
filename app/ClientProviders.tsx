'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/lib/theme'

interface ClientProvidersProps {
  children: React.ReactNode
}

/**
 * Client-side providers wrapper
 * - MUI theme and styling providers
 * - Auth routing handled by proxy.ts (server-side)
 * - Loading states handled by Next.js loading.tsx files
 */
export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
