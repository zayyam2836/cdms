// app/mayor/complaints/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { ArrowLeft, Search, Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function MayorComplaintsPage() {
  const router = useRouter()
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchComplaints()
  }, [])

  useEffect(() => {
    filterComplaints()
  }, [searchTerm, statusFilter, complaints])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(
        'https://jculuzklcusscieqjrag.supabase.co/rest/v1/complaint?select=*',
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA'
          }
        }
      )
      
      const data = await response.json()
      console.log('All complaints fetched:', data.length)
      setComplaints(data)
      
    } catch (error) {
      console.error('Error fetching complaints:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterComplaints = () => {
    let filtered = [...complaints]
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.location_detail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter)
    }
    
    setFilteredComplaints(filtered)
    setCurrentPage(1) // Reset to first page on filter
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredComplaints.slice(startIndex, endIndex)

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
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
          body: JSON.stringify({ status: newStatus })
        }
      )
      
      if (response.ok) {
        alert(`Complaint ${newStatus.toLowerCase()}!`)
        fetchComplaints() // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-200 rounded-2xl"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-2">Complaints Management</h1>
              <p className="opacity-90">
                Review and manage all city complaints. Total: {complaints.length} complaints
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search complaints by location or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="w-full md:w-64">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              {/* Export Button */}
              <button
                onClick={() => alert('Export feature coming soon!')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-2xl font-bold">{complaints.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {complaints.filter(c => c.status === 'Pending').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {complaints.filter(c => c.status === 'In Progress').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-600 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {complaints.filter(c => c.status === 'Resolved').length}
              </p>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">ID</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Location</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Description</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Date</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.length > 0 ? (
                    currentItems.map((complaint) => (
                      <tr key={complaint.complaint_id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm">#{complaint.complaint_id}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium">{complaint.location_detail}</p>
                            <p className="text-sm text-gray-500">Chairman ID: {complaint.chairman_id}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="max-w-xs truncate">{complaint.description}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {complaint.severity}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                              Priority: {complaint.priority_id}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {complaint.date_reported || 'N/A'}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/mayor/complaints/${complaint.complaint_id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {complaint.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(complaint.complaint_id, 'In Progress')}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                  title="Mark as In Progress"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(complaint.complaint_id, 'Rejected')}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {complaint.status === 'In Progress' && (
                              <button
                                onClick={() => handleStatusUpdate(complaint.complaint_id, 'Resolved')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                title="Mark as Resolved"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-12 text-center">
                        <div className="text-gray-500">
                          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg">No complaints found</p>
                          <p className="text-sm">Try changing your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredComplaints.length)} of {filteredComplaints.length} complaints
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
