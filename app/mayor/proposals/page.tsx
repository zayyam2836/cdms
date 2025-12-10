'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search, Filter, FileText, CheckCircle, Clock, XCircle, Eye, Download, DollarSign, Calendar } from 'lucide-react'

export default function MayorProposals() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'mayor')) {
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

  if (!user || user.role !== 'mayor') return null

  const proposals = [
    { 
      id: 1, 
      uc: 'UC 3', 
      title: 'Road Construction Proposal', 
      description: 'Construction of 2km road in residential area',
      amount: '₹25,00,000',
      status: 'pending', 
      date: '2024-01-15',
      duration: '6 months'
    },
    { 
      id: 2, 
      uc: 'UC 1', 
      title: 'Water Supply Upgrade', 
      description: 'Upgrade water pipelines in Sector A',
      amount: '₹18,50,000',
      status: 'approved', 
      date: '2024-01-14',
      duration: '4 months'
    },
    { 
      id: 3, 
      uc: 'UC 5', 
      title: 'Park Renovation', 
      description: 'Renovation of community park with facilities',
      amount: '₹12,00,000',
      status: 'rejected', 
      date: '2024-01-13',
      duration: '3 months'
    },
    { 
      id: 4, 
      uc: 'UC 2', 
      title: 'Drainage System', 
      description: 'New drainage system installation',
      amount: '₹32,00,000',
      status: 'pending', 
      date: '2024-01-12',
      duration: '8 months'
    },
    { 
      id: 5, 
      uc: 'UC 4', 
      title: 'Street Lights', 
      description: 'Installation of LED street lights',
      amount: '₹8,50,000',
      status: 'in-review', 
      date: '2024-01-11',
      duration: '2 months'
    },
    { 
      id: 6, 
      uc: 'UC 6', 
      title: 'Community Center', 
      description: 'Construction of community center',
      amount: '₹45,00,000',
      status: 'approved', 
      date: '2024-01-10',
      duration: '10 months'
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />
      case 'in-review': return <FileText className="w-4 h-4 text-blue-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'in-review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Project Proposals</h1>
          <p className="text-gray-600 mt-2">Review and approve project proposals from Union Councils</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Proposals
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Proposals</p>
              <p className="text-2xl font-bold mt-1">89</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold mt-1">23</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Approved</p>
              <p className="text-2xl font-bold mt-1">45</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold mt-1">₹2.4 Cr</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>In Review</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by Date</option>
              <option>Sort by Amount</option>
              <option>Sort by UC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  {proposal.uc}
                </span>
                <div className="flex items-center">
                  {getStatusIcon(proposal.status)}
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${getStatusColor(proposal.status)}`}>
                    {proposal.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">{proposal.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{proposal.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">{proposal.amount}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{proposal.duration} • {proposal.date}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4 border-t">
                <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">
                  View Details
                </button>
                {proposal.status === 'pending' && (
                  <>
                    <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                      ✓
                    </button>
                    <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for Search */}
      {searchTerm && proposals.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No proposals found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}