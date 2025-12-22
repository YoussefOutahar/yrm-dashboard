import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getUserRole } from '@/lib/utils/roles'
import type { Activity } from '@/types'

export async function GET(request: Request) {
  try {
    // Use regular client to verify user authentication and role
    const supabase = await createClient()

    // Check if user is authenticated and is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = getUserRole(user)
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    // Use admin client for privileged operations
    const adminClient = createAdminClient()

    // Get limit from query params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '500')

    // Fetch all activities using admin client
    const { data: activitiesData, error: activitiesError } = await adminClient
      .from('activity_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (activitiesError) {
      return NextResponse.json({ error: activitiesError.message }, { status: 500 })
    }

    // Get unique user IDs
    const uniqueUserIds = [...new Set(activitiesData?.map(activity => activity.user_id) || [])]

    // Create a map of user IDs to names
    const userNames: Record<string, string> = {}

    // Fetch each user individually to get their metadata using admin client
    for (const userId of uniqueUserIds) {
      try {
        const { data: { user: userData }, error: userError } = await adminClient.auth.admin.getUserById(userId)

        if (userError) {
          console.error(`Error fetching user ${userId}:`, userError.message)
          userNames[userId] = 'Unknown User'
          continue
        }

        if (userData) {
          // Try full_name first, then email, then fallback
          if (userData.user_metadata?.full_name) {
            userNames[userId] = userData.user_metadata.full_name
          } else if (userData.email) {
            userNames[userId] = userData.email
          } else {
            userNames[userId] = 'Unknown User'
          }
        } else {
          userNames[userId] = 'Unknown User'
        }
      } catch (error) {
        console.error(`Exception fetching user ${userId}:`, error)
        userNames[userId] = 'Unknown User'
      }
    }

    // Add user names to activities
    const activities: Activity[] = (activitiesData || []).map(activity => ({
      ...activity,
      timestamp: new Date(activity.timestamp),
      user_name: userNames[activity.user_id] || 'Unknown User',
    }))

    return NextResponse.json({ data: activities, error: null })
  } catch (error) {
    console.error('Error in activities API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
