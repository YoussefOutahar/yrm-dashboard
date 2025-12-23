'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/lib/theme'
import { LoadingWrapper } from '@/components/LoadingWrapper'

interface ClientProvidersProps {
  children: React.ReactNode
}

/**
 * Client-side providers wrapper
 * - MUI theme and styling providers
 * - Loading state during auth initialization
 * - Auth routing handled by proxy.ts (server-side)
 */
export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
