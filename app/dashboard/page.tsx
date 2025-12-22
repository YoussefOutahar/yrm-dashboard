'use client'

import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import PriceChart from '@/components/PriceChart'
import AccountHeader from '@/components/AccountHeader'
import PerformanceGauges from '@/components/PerformanceGauges'
import RiskMetrics from '@/components/RiskMetrics'
import ActivityLog from '@/components/ActivityLog'
import { usePriceChart, useActivityLog, useProfile } from '@/hooks'
import { subDays, format } from 'date-fns'

export default function DashboardPage() {
  const [ticker, setTicker] = useState('AAPL')
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 30))
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const { profile } = useProfile()
  const { addActivity } = useActivityLog({
    userId: profile?.id,
    autoFetch: false,
  })

  // Use the price chart hook with current state
  const { data, loading, error } = usePriceChart({
    ticker,
    startDate,
    endDate,
    autoFetch: true,
    onSuccess: (data) => {
      console.log('Price data fetched successfully', data.length, 'data points')
    },
    onError: (error) => {
      console.error('Failed to fetch price data:', error)
    },
  })

  // Handler for ticker change
  const handleTickerChange = (newTicker: string) => {
    setTicker(newTicker)
    addActivity('ticker_change', `Changed ticker to ${newTicker}`)
  }

  // Handler for start date change
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date)
    if (date) {
      addActivity('date_filter_update', `Updated start date to ${format(date, 'MMM dd, yyyy')}`)
    }
  }

  // Handler for end date change
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date)
    if (date) {
      addActivity('date_filter_update', `Updated end date to ${format(date, 'MMM dd, yyyy')}`)
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Account Header */}
        <Grid size={{ xs: 12 }}>
          <AccountHeader />
        </Grid>

        {/* Left Column - Performance and Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Grid container spacing={2}>
            {/* Performance Gauges */}
            <Grid size={{ xs: 12 }}>
              <PerformanceGauges />
            </Grid>

            {/* Price Chart below Performance */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ height: '600px' }}>
                <PriceChart
                  ticker={ticker}
                  startDate={startDate}
                  endDate={endDate}
                  data={data}
                  loading={loading}
                  error={error}
                  onTickerChange={handleTickerChange}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Risk Metrics (full height) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <RiskMetrics />
        </Grid>

        {/* Activity Log - Full width below everything */}
        <Grid size={{ xs: 12 }}>
          <ActivityLog />
        </Grid>
      </Grid>
    </Box>
  )
}
