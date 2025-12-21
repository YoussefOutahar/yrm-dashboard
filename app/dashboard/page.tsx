import { Box, Grid, Typography } from '@mui/material'
import PriceChart from '@/components/PriceChart'
import TraderOverview from '@/components/TraderOverview'
import ActivityLog from '@/components/ActivityLog'

export default function DashboardPage() {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Price Chart - Full width */}
        <Grid size={{ xs: 12 }}>
          <PriceChart />
        </Grid>

        {/* Trader Overview - Left side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TraderOverview />
        </Grid>

        {/* Activity Log - Right side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ActivityLog />
        </Grid>
      </Grid>
    </Box>
  )
}
