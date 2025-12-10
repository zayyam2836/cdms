// app/mayor/complaints/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Download,
  Printer,
  Share2
} from 'lucide-react'
import AISuggestions from '@/components/AISuggestions'

export default function ComplaintDetailPage() {
  const router = useRouter()
  const params = useParams()
  const complaintId = params.id as string

  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (complaintId) {
      fetchComplaintDetails()
    }
  }, [complaintId])

  const fetchComplaintDetails = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(
        `https://jculuzklcusscieqjrag.supabase.co/rest/v1/complaint?complaint_id=eq.${complaintId}`,
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA'
          }
        }
      )
      
      const data = await response.json()
      if (data && data.length > 0) {
        setComplaint(data[0])
      } else {
        console.error('Complaint not found')
      }
      
    } catch (error) {
      console.error('Error fetching complaint:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (newStatus: string) => {
    try {
      setUpdating(true)
      
      const response = await fetch(
        `https://jculuzklcusscieqjrag.supabase.co/rest/v1/complaint?complaint_id=eq.${complaintId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
        }
      )
      
      if (response.ok) {
        alert(`Status updated to: ${newStatus}`)
        fetchComplaintDetails() // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200'
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (!complaint) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Complaint Not Found</h1>
            <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/mayor/complaints')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Back to Complaints
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Complaints
            </button>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Complaint Details</h1>
                  <p className="text-blue-100">
                    ID: #{complaint.complaint_id} • Submitted by Chairman #{complaint.chairman_id}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  
                  <div className="hidden md:flex gap-2">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Printer className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Complaint Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Complaint Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Complaint Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Location</h3>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <p className="text-gray-800">{complaint.location_detail || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 whitespace-pre-line">
                        {complaint.description || 'No description provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Severity</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(complaint.severity)}`}>
                        {complaint.severity || 'Not specified'}
                      </span>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Priority</p>
                      <p className="font-medium">Level {complaint.priority_id || 'N/A'}</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Estimated Cost</p>
                      <p className="font-medium">
                        {complaint.estimated_cost ? `₹${complaint.estimated_cost}` : 'Not estimated'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  AI-Powered Solution Suggestions
                </h2>
                
                <AISuggestions
                  complaintDescription={complaint.description}
                  category={complaint.category}
                  location={complaint.location_detail}
                  onSuggestionsGenerated={(suggestions) => {
                    console.log('AI Suggestions for complaint:', suggestions)
                  }}
                />
              </div>
            </div>

            {/* Right Column - Actions & Info */}
            <div className="space-y-6">
              {/* Status Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Update Status
                </h2>
                
                <div className="space-y-3">
                  {['Pending', 'In Progress', 'Resolved', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(status)}
                      disabled={updating || complaint.status === status}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        complaint.status === status
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : 'hover:bg-gray-50 border-gray-200'
                      } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{status}</span>
                        {complaint.status === status && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {updating && (
                  <div className="mt-4 text-center text-gray-500">
                    Updating status...
                  </div>
                )}
              </div>

              {/* Complaint Metadata */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Complaint Timeline
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reported Date</p>
                      <p className="font-medium">
                        {complaint.date_reported || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submitted By</p>
                      <p className="font-medium">Chairman #{complaint.chairman_id}</p>
                      <p className="text-sm text-gray-500">UC #{complaint.uc_id || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">{complaint.category || 'General'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Add Comment</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <User className="w-5 h-5 text-green-600" />
                    <span>Assign Officer</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-purple-600" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}