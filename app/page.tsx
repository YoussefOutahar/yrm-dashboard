import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { APP_ROUTES } from '@/config/routes'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect(APP_ROUTES.DASHBOARD.ROOT)
  } else {
    redirect(APP_ROUTES.AUTH)
  }
}
