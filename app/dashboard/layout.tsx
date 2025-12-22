import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { APP_ROUTES } from '@/config/routes'
import { getUserRole } from '@/lib/utils/roles'
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

  // SERVER-SIDE ROLE CHECK: Admins cannot access user dashboard
  const role = getUserRole(user)
  if (role === 'admin') {
    redirect(APP_ROUTES.ADMIN.ROOT)
  }

  return <DashboardShell user={user} role={role}>{children}</DashboardShell>
}
