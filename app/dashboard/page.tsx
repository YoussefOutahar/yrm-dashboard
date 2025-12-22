'use client'

import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import PriceChart from '@/components/PriceChart'
import TraderOverview from '@/components/TraderOverview'
import ActivityLog from '@/components/ActivityLog'
import { usePriceChart } from '@/hooks'
import { useActivityLog } from '@/contexts/ActivityLogContext'
import { subDays, format } from 'date-fns'

export default function DashboardPage() {
  const [ticker, setTicker] = useState('AAPL')
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 30))
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const { addActivity } = useActivityLog()

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
      <Grid container spacing={3}>
        {/* Price Chart - Full width */}
        <Grid size={{ xs: 12 }}>
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
