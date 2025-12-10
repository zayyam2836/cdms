'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface RoleBasedRouteProps {
  children: ReactNode
  allowedRoles: ('mayor' | 'chairman')[]
  redirectTo?: string
}

export default function RoleBasedRoute({
  children,
  allowedRoles,
  redirectTo = '/login'
}: RoleBasedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
      } else if (!allowedRoles.includes(user.role)) {
        router.push(user.role === 'mayor' ? '/mayor/dashboard' : '/chairman/dashboard')
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}