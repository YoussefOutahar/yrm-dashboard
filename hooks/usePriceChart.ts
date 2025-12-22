import { useState, useCallback, useEffect } from 'react'
import { priceChartService } from '@/services'
import type { PriceData } from '@/types'

interface UsePriceChartOptions {
  ticker: string
  startDate?: Date | null
  endDate?: Date | null
  autoFetch?: boolean
  onSuccess?: (data: PriceData[]) => void
  onError?: (error: string) => void
}

/**
 * Custom hook for fetching and managing price chart data
 * Provides a clean interface for fetching stock price data from Alpha Vantage
 */
export function usePriceChart(options: UsePriceChartOptions) {
  const {
    ticker,
    startDate = null,
    endDate = null,
    autoFetch = true,
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<{
    symbol: string
    lastRefreshed: string
    timeZone: string
  } | null>(null)

  /**
   * Fetch price data
   */
  const fetchPriceData = useCallback(async () => {
    if (!ticker) {
      setError('Ticker symbol is required')
      return { success: false, error: 'Ticker symbol is required' }
    }

    setLoading(true)
    setError(null)

    const response = await priceChartService.fetchPriceDataWithDateRange(
      ticker,
      startDate,
      endDate
    )

    if (response.error) {
      const errorMessage = response.error || 'Failed to fetch price data'
      setError(errorMessage)
      setLoading(false)
      setData([])
      setMeta(null)
      onError?.(errorMessage)
      return { success: false, error: errorMessage }
    }

    setData(response.data)
    setMeta(response.meta || null)
    setLoading(false)
    onSuccess?.(response.data)

    return { success: true, data: response.data, meta: response.meta }
  }, [ticker, startDate, endDate])

  /**
   * Refetch data manually
   */
  const refetch = useCallback(() => {
    return fetchPriceData()
  }, [fetchPriceData])

  /**
   * Clear the current error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setData([])
    setError(null)
    setMeta(null)
    setLoading(false)
  }, [])

  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (autoFetch && ticker) {
      fetchPriceData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch, ticker, startDate, endDate])

  return {
    data,
    loading,
    error,
    meta,
    fetchPriceData,
    refetch,
    clearError,
    reset,
  }
}
