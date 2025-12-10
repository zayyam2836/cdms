'use client'

import { FileText, CheckCircle, XCircle, Clock, DollarSign, Calendar, Building2 } from 'lucide-react'

interface ProposalCardProps {
  id: number
  title: string
  description: string
  category: string
  budget: string
  duration: string
  date: string
  status: 'pending' | 'under-review' | 'approved' | 'rejected'
  onViewDetails?: () => void
  onApprove?: () => void
  onReject?: () => void
}

export default function ProposalCard({
  id,
  title,
  description,
  category,
  budget,
  duration,
  date,
  status,
  onViewDetails,
  onApprove,
  onReject
}: ProposalCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'under-review': return <FileText className="w-4 h-4 text-blue-500" />
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'under-review': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            {category}
          </span>
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

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-gray-700">
          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
          <div>
            <div className="text-sm font-medium">{budget}</div>
            <div className="text-xs text-gray-500">Budget</div>
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          <div>
            <div className="text-sm font-medium">{duration}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Building2 className="w-4 h-4 mr-1" />
          <span>Submitted: {date}</span>
        </div>
      </div>

      <div className="flex space-x-2 pt-4 border-t">
        <button
          onClick={onViewDetails}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
        >
          View Details
        </button>
        {status === 'pending' && (
          <>
            <button
              onClick={onApprove}
              className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
              title="Approve"
            >
              ✓
            </button>
            <button
              onClick={onReject}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              title="Reject"
            >
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  )
}