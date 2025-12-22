import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { APP_ROUTES } from '@/config/routes'
import { getUserRole } from '@/lib/utils/roles'
import AdminShell from '@/components/layout/AdminShell'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(APP_ROUTES.AUTH)
  }

  // SERVER-SIDE ROLE CHECK: Admins only
  const role = getUserRole(user)
  if (role !== 'admin') {
    redirect(APP_ROUTES.DASHBOARD.ROOT)
  }

  return <AdminShell user={user} role={role}>{children}</AdminShell>
}
