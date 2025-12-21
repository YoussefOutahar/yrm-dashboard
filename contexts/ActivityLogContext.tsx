'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type ActivityType = 'login' | 'profile_update' | 'admin_balance_adjustment' | 'ticker_change' | 'date_filter_update'

export interface Activity {
  id: string
  type: ActivityType
  message: string
  timestamp: Date
}

interface ActivityLogContextType {
  activities: Activity[]
  addActivity: (type: ActivityType, message: string) => void
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined)

export function ActivityLogProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([])

  const addActivity = useCallback((type: ActivityType, message: string) => {
    const newActivity: Activity = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: new Date(),
    }
    setActivities(prev => [newActivity, ...prev].slice(0, 5)) // Keep only last 5
  }, [])

  return (
    <ActivityLogContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityLogContext.Provider>
  )
}

export function useActivityLog() {
  const context = useContext(ActivityLogContext)
  if (!context) {
    throw new Error('useActivityLog must be used within ActivityLogProvider')
  }
  return context
}
