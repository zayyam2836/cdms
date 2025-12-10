'use client'

import { AlertCircle, Clock, CheckCircle, MapPin, Calendar } from 'lucide-react'

interface ComplaintCardProps {
  id: number
  type: string
  title: string
  description: string
  location: string
  date: string
  status: 'pending' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  onViewDetails?: () => void
}

export default function ComplaintCard({
  id,
  type,
  title,
  description,
  location,
  date,
  status,
  priority,
  onViewDetails
}: ComplaintCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = () => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            {type}
          </span>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-1 ${getPriorityColor()}`}></div>
            <span className="text-xs capitalize">{priority}</span>
          </div>
        </div>
        <div className="flex items-center">
          {getStatusIcon()}
          <span className={`ml-1 px-2 py-1 rounded text-xs ${getStatusColor()}`}>
            {status.replace('-', ' ')}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="mr-4">{location}</span>
        <Calendar className="w-4 h-4 mr-1" />
        <span>{date}</span>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-500">
          ID: #{id.toString().padStart(4, '0')}
        </div>
        <button
          onClick={onViewDetails}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  )
}