'use client'

import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import type { PriceData } from '@/types'

const TICKERS = ['AAPL', 'MSFT', 'GOOGL']

interface PriceChartProps {
  ticker: string
  startDate: Date | null
  endDate: Date | null
  data: PriceData[]
  loading: boolean
  error: string | null
  onTickerChange: (ticker: string) => void
  onStartDateChange: (date: Date | null) => void
  onEndDateChange: (date: Date | null) => void
}

export default function PriceChart({
  ticker,
  startDate,
  endDate,
  data,
  loading,
  error,
  onTickerChange,
  onStartDateChange,
  onEndDateChange,
}: PriceChartProps) {
  const handleTickerChange = (_: React.MouseEvent<HTMLElement>, newTicker: string | null) => {
    if (newTicker) {
      onTickerChange(newTicker)
    }
  }

  // Format data for chart display
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), 'MMM dd'),
    price: item.price,
  }))

  return (
    <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Price Chart
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <ToggleButtonGroup
              value={ticker}
              exclusive
              onChange={handleTickerChange}
              size="small"
            >
              {TICKERS.map((t) => (
                <ToggleButton key={t} value={t}>
                  {t}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={onStartDateChange}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={onEndDateChange}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
          ) : chartData.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                No data available for the selected date range
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="date" stroke="#b3b3b3" />
                <YAxis stroke="#b3b3b3" domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #00ff00',
                    borderRadius: 8,
                    color: '#ffffff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#00ff00"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
