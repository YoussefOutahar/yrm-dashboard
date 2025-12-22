// Activity Log types

export type ActivityType =
  | 'login'
  | 'profile_update'
  | 'admin_balance_adjustment'
  | 'ticker_change'
  | 'date_filter_update'

export interface Activity {
  id: string
  user_id: string
  type: ActivityType
  message: string
  timestamp: Date
}

export interface ActivityLogResponse {
  data: Activity[] | null
  error: Error | null
}

export interface AddActivityRequest {
  type: ActivityType
  message: string
}

export interface AddActivityResponse {
  data: Activity | null
  error: Error | null
}
