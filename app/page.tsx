import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserRole, getDashboardRouteForRole } from '@/lib/utils/roles'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const role = getUserRole(user)
    redirect(getDashboardRouteForRole(role))
  } else {
    redirect('/auth')
  }
}
