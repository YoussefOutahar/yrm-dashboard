'use client'

import { useState, useEffect } from 'react'
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
import { useActivityLog } from '@/contexts/ActivityLogContext'
import { subDays, format } from 'date-fns'

const TICKERS = ['AAPL', 'MSFT', 'GOOGL']

interface PriceData {
  date: string
  price: number
}

export default function PriceChart() {
  const [ticker, setTicker] = useState('AAPL')
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 30))
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [data, setData] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { addActivity } = useActivityLog()

  const generateMockData = (days: number): PriceData[] => {
    const data: PriceData[] = []
    const basePrice = ticker === 'AAPL' ? 170 : ticker === 'MSFT' ? 380 : 140
    let currentPrice = basePrice

    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i)
      currentPrice = currentPrice + (Math.random() - 0.5) * 5
      data.push({
        date: format(date, 'MMM dd'),
        price: parseFloat(currentPrice.toFixed(2)),
      })
    }
    return data
  }

  useEffect(() => {
    fetchPriceData()
  }, [ticker, startDate, endDate])

  const fetchPriceData = async () => {
    setLoading(true)
    setError('')

    try {
      // Using mock data instead of API for demo
      // In production, replace with actual API call to Alpha Vantage or Finnhub
      await new Promise(resolve => setTimeout(resolve, 500))

      const days = startDate && endDate
        ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 30

      const mockData = generateMockData(days)
      setData(mockData)
    } catch (err) {
      setError('Failed to fetch price data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTickerChange = (_: React.MouseEvent<HTMLElement>, newTicker: string | null) => {
    if (newTicker) {
      setTicker(newTicker)
      addActivity('ticker_change', `Changed ticker to ${newTicker}`)
    }
  }

  const handleDateChange = (type: 'start' | 'end', date: Date | null) => {
    if (type === 'start') {
      setStartDate(date)
    } else {
      setEndDate(date)
    }
    if (date) {
      addActivity('date_filter_update', `Updated ${type} date to ${format(date, 'MMM dd, yyyy')}`)
    }
  }

  return (
    <Card>
      <CardContent>
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
                onChange={(date) => handleDateChange('start', date)}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => handleDateChange('end', date)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
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

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Note: Using mock data for demonstration. Replace with actual API integration.
        </Typography>
      </CardContent>
    </Card>
  )
}
