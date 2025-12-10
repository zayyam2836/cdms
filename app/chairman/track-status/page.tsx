'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye, Download } from 'lucide-react'

export default function TrackStatus() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [type, setType] = useState('all')

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'chairman')) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== 'chairman') return null

  const items = [
    { id: 1, type: 'complaint', title: 'Water Supply Issue', ref: 'CMP-2024-001', date: '2024-01-15', status: 'in-progress', priority: 'high' },
    { id: 2, type: 'proposal', title: 'Road Construction Proposal', ref: 'PRO-2024-002', date: '2024-01-14', status: 'approved', priority: 'medium' },
    { id: 3, type: 'complaint', title: 'Electricity Problem', ref: 'CMP-2024-003', date: '2024-01-13', status: 'resolved', priority: 'high' },
    { id: 4, type: 'proposal', title: 'Park Renovation', ref: 'PRO-2024-004', date: '2024-01-12', status: 'rejected', priority: 'low' },
    { id: 5, type: 'complaint', title: 'Garbage Collection', ref: 'CMP-2024-005', date: '2024-01-11', status: 'pending', priority: 'medium' },
    { id: 6, type: 'proposal', title: 'Drainage System', ref: 'PRO-2024-006', date: '2024-01-10', status: 'under-review', priority: 'high' },
    { id: 7, type: 'complaint', title: 'Street Lights', ref: 'CMP-2024-007', date: '2024-01-09', status: 'resolved', priority: 'low' },
    { id: 8, type: 'proposal', title: 'Community Center', ref: 'PRO-2024-008', date: '2024-01-08', status: 'approved', priority: 'high' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />
      case 'under-review': return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'under-review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    return type === 'complaint' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.ref.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || item.status === filter
    const matchesType = type === 'all' || item.type === type
    return matchesSearch && matchesFilter && matchesType
  })

  const statusCounts = {
    all: items.length,
    pending: items.filter(i => i.status === 'pending').length,
    'in-progress': items.filter(i => i.status === 'in-progress').length,
    resolved: items.filter(i => i.status === 'resolved' || i.status === 'approved').length,
    rejected: items.filter(i => i.status === 'rejected').length,
    'under-review': items.filter(i => i.status === 'under-review').length
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Track Status</h1>
          <p className="text-gray-600 mt-2">Track the status of your complaints and proposals</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`p-4 rounded-xl shadow transition ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-2xl font-bold">{statusCounts.all}</div>
          <div className="text-sm">All</div>
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`p-4 rounded-xl shadow transition ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-2xl font-bold">{statusCounts.pending}</div>
          <div className="text-sm">Pending</div>
        </button>
        <button 
          onClick={() => setFilter('in-progress')}
          className={`p-4 rounded-xl shadow transition ${filter === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-2xl font-bold">{statusCounts['in-progress']}</div>
          <div className="text-sm">In Progress</div>
        </button>
        <button 
          onClick={() => setFilter('under-review')}
          className={`p-4 rounded-xl shadow transition ${filter === 'under-review' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-2xl font-bold">{statusCounts['under-review']}</div>
          <div className="text-sm">Under Review</div>
        </button>
        <button 
          onClick={() => setFilter('resolved')}
          className={`p-4 rounded-xl shadow transition ${filter === 'resolved' ? 'bg-green-600 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-2xl font-bold">{statusCounts.resolved}</div>
          <div className="text-sm">Resolved/Approved</div>
        </button>
        <button 
          onClick={() => setFilter('rejected')}
          className={`p-4 rounded-xl shadow transition ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-2xl font-bold">{statusCounts.rejected}</div>
          <div className="text-sm">Rejected</div>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or reference number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="complaint">Complaints</option>
              <option value="proposal">Proposals</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-gray-600">Type</th>
                <th className="text-left p-4 text-gray-600">Reference</th>
                <th className="text-left p-4 text-gray-600">Title</th>
                <th className="text-left p-4 text-gray-600">Priority</th>
                <th className="text-left p-4 text-gray-600">Status</th>
                <th className="text-left p-4 text-gray-600">Date</th>
                <th className="text-left p-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${getTypeColor(item.type)}`}>
                      {item.type === 'complaint' ? 'Complaint' : 'Proposal'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-sm">{item.ref}</td>
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${getPriorityColor(item.priority)}`}></div>
                      <span className="capitalize">{item.priority}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{item.date}</td>
                  <td className="p-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="border-t px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredItems.length} of {items.length} items
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Status Legend */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-bold mb-4">Status Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Pending</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Resolved/Approved</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Rejected</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Under Review</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-sm">Other</span>
          </div>
        </div>
      </div>
    </div>
  )
}