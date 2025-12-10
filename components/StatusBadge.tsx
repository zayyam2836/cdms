'use client'

import { ReactNode } from 'react'

interface StatusBadgeProps {
  status: string
  icon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function StatusBadge({ status, icon, size = 'md' }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-progress':
      case 'processing':
      case 'under-review':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
      case 'approved':
      case 'resolved':
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'rejected':
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'on-hold':
      case 'paused':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-2 py-0.5 text-xs'
      case 'md': return 'px-3 py-1 text-sm'
      case 'lg': return 'px-4 py-2 text-base'
      default: return 'px-3 py-1 text-sm'
    }
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${getStatusColor()} ${getSizeClasses()}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {status.replace('-', ' ')}
    </span>
  )
}