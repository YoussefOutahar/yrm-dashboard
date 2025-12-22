import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { APP_ROUTES } from '@/config/routes'
import DashboardShell from '@/components/layout/DashboardShell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(APP_ROUTES.AUTH)
  }

  return <DashboardShell user={user}>{children}</DashboardShell>
}
