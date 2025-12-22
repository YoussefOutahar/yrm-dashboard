/**
 * Alpha Vantage API response types
 */

/**
 * Meta data from Alpha Vantage API
 */
export interface AlphaVantageMetaData {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Output Size': string
  '5. Time Zone': string
}

/**
 * Daily time series data point
 */
export interface AlphaVantageDailyData {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

/**
 * Time series object with dates as keys
 */
export interface AlphaVantageTimeSeries {
  [date: string]: AlphaVantageDailyData
}

/**
 * Complete Alpha Vantage API response
 */
export interface AlphaVantageResponse {
  'Meta Data': AlphaVantageMetaData
  'Time Series (Daily)': AlphaVantageTimeSeries
  'Error Message'?: string
  'Note'?: string
}

/**
 * Processed price data for chart display
 */
export interface PriceData {
  date: string
  price: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

/**
 * Price chart fetch parameters
 */
export interface PriceChartParams {
  ticker: string
  outputSize?: 'compact' | 'full'
}

/**
 * Price chart service response
 */
export interface PriceChartResponse {
  data: PriceData[]
  error: string | null
  meta?: {
    symbol: string
    lastRefreshed: string
    timeZone: string
  }
}

/**
 * Price chart error
 */
export interface PriceChartError {
  message: string
  code?: string
}
