import type {
  PriceChartParams,
  PriceChartResponse,
  AlphaVantageResponse,
  PriceData,
} from '@/types'

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query'
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY

/**
 * Price Chart Service
 * Handles all price chart data fetching from Alpha Vantage API
 */
class PriceChartService {
  /**
   * Validate ticker symbol
   */
  private validateTicker(ticker: string): { valid: boolean; error?: string } {
    if (!ticker) {
      return { valid: false, error: 'Ticker symbol is required' }
    }
    if (ticker.length > 10) {
      return { valid: false, error: 'Invalid ticker symbol' }
    }
    return { valid: true }
  }

  /**
   * Validate API key
   */
  private validateApiKey(): { valid: boolean; error?: string } {
    if (!API_KEY) {
      return { valid: false, error: 'Alpha Vantage API key is not configured' }
    }
    return { valid: true }
  }

  /**
   * Transform Alpha Vantage response to chart-friendly format
   */
  private transformData(response: AlphaVantageResponse): PriceData[] {
    const timeSeries = response['Time Series (Daily)']
    if (!timeSeries) {
      return []
    }

    const data: PriceData[] = []

    // Convert object to array and sort by date descending
    const entries = Object.entries(timeSeries)

    for (const [date, values] of entries) {
      data.push({
        date,
        price: parseFloat(values['4. close']),
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseFloat(values['5. volume']),
      })
    }

    // Sort by date ascending (oldest to newest for chart display)
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  /**
   * Fetch daily time series data for a ticker
   */
  async fetchDailyTimeSeries(params: PriceChartParams): Promise<PriceChartResponse> {
    try {
      // Validate inputs
      const tickerValidation = this.validateTicker(params.ticker)
      if (!tickerValidation.valid) {
        return {
          data: [],
          error: tickerValidation.error || 'Invalid ticker',
        }
      }

      const apiKeyValidation = this.validateApiKey()
      if (!apiKeyValidation.valid) {
        return {
          data: [],
          error: apiKeyValidation.error || 'API key not configured',
        }
      }

      // Make request to Alpha Vantage API
      const response = await fetch(
        `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${params.ticker}&outputsize=${params.outputSize || 'compact'}&apikey=${API_KEY}`
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data: AlphaVantageResponse = await response.json()

      // Check for API errors
      if (data['Error Message']) {
        return {
          data: [],
          error: data['Error Message'],
        }
      }

      // Check for API rate limit
      if (data['Note']) {
        return {
          data: [],
          error: 'API rate limit reached. Please try again later.',
        }
      }

      // Transform the data
      const priceData = this.transformData(data)

      if (priceData.length === 0) {
        return {
          data: [],
          error: 'No data available for this ticker',
        }
      }

      return {
        data: priceData,
        error: null,
        meta: {
          symbol: data['Meta Data']['2. Symbol'],
          lastRefreshed: data['Meta Data']['3. Last Refreshed'],
          timeZone: data['Meta Data']['5. Time Zone'],
        },
      }
    } catch (error) {
      console.error('PriceChartService error:', error)
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch price data',
      }
    }
  }

  /**
   * Filter price data by date range
   */
  filterByDateRange(
    data: PriceData[],
    startDate: Date | null,
    endDate: Date | null
  ): PriceData[] {
    if (!startDate && !endDate) {
      return data
    }

    return data.filter((item) => {
      const itemDate = new Date(item.date)

      if (startDate && endDate) {
        return itemDate >= startDate && itemDate <= endDate
      } else if (startDate) {
        return itemDate >= startDate
      } else if (endDate) {
        return itemDate <= endDate
      }

      return true
    })
  }

  /**
   * Get price data for date range
   */
  async fetchPriceDataWithDateRange(
    ticker: string,
    startDate: Date | null,
    endDate: Date | null
  ): Promise<PriceChartResponse> {
    const response = await this.fetchDailyTimeSeries({
      ticker,
      outputSize: 'compact' // Use compact for last 100 days
    })

    if (response.error || !response.data.length) {
      return response
    }

    // Filter by date range
    const filteredData = this.filterByDateRange(response.data, startDate, endDate)

    return {
      ...response,
      data: filteredData,
    }
  }
}

// Export a singleton instance
export const priceChartService = new PriceChartService()
