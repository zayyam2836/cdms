'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, AlertCircle, TrendingUp, Clock, CheckCircle, Building2, MapPin } from 'lucide-react'

export default function MayorIncompleteProjects() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState('all')

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

  const projects = [
    {
      id: 1,
      name: 'Road Construction - Phase 2',
      uc: 'UC 3',
      location: 'Main Road, Sector B',
      startDate: '2023-10-15',
      endDate: '2024-02-15',
      progress: 65,
      status: 'delayed',
      budget: '₹25,00,000',
      spent: '₹18,50,000',
      delayReason: 'Monsoon season affected work'
    },
    {
      id: 2,
      name: 'Water Pipeline Upgrade',
      uc: 'UC 1',
      location: 'Sector A Residential Area',
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      progress: 85,
      status: 'on-track',
      budget: '₹18,50,000',
      spent: '₹15,00,000',
      delayReason: null
    },
    {
      id: 3,
      name: 'Community Park Renovation',
      uc: 'UC 5',
      location: 'Central Park',
      startDate: '2023-12-01',
      endDate: '2024-03-01',
      progress: 40,
      status: 'at-risk',
      budget: '₹12,00,000',
      spent: '₹5,50,000',
      delayReason: 'Material supply delays'
    },
    {
      id: 4,
      name: 'Drainage System Installation',
      uc: 'UC 2',
      location: 'Low-lying Areas',
      startDate: '2023-09-01',
      endDate: '2024-04-01',
      progress: 75,
      status: 'on-track',
      budget: '₹32,00,000',
      spent: '₹24,00,000',
      delayReason: null
    },
    {
      id: 5,
      name: 'LED Street Lights',
      uc: 'UC 4',
      location: 'All Major Streets',
      startDate: '2024-01-01',
      endDate: '2024-02-29',
      progress: 25,
      status: 'delayed',
      budget: '₹8,50,000',
      spent: '₹2,00,000',
      delayReason: 'Contractor issues'
    },
    {
      id: 6,
      name: 'Community Center Construction',
      uc: 'UC 6',
      location: 'Sector D',
      startDate: '2023-08-01',
      endDate: '2024-05-01',
      progress: 90,
      status: 'on-track',
      budget: '₹45,00,000',
      spent: '₹40,50,000',
      delayReason: null
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800'
      case 'delayed': return 'bg-red-100 text-red-800'
      case 'at-risk': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'delayed': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'at-risk': return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter)

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Ongoing Projects</h1>
          <p className="text-gray-600 mt-2">Monitor and track progress of all ongoing projects</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Filter:</span>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="on-track">On Track</option>
              <option value="delayed">Delayed</option>
              <option value="at-risk">At Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold mt-1">{projects.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">On Track</p>
              <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'on-track').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Delayed</p>
              <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'delayed').length}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">At Risk</p>
              <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'at-risk').length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span className="mr-3">{project.uc}</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(project.status)}
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 50 ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Timeline</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">{project.startDate} to {project.endDate}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Budget</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium">{project.budget}</span>
                    <span className="text-sm text-gray-500">Spent: {project.spent}</span>
                  </div>
                </div>
              </div>

              {/* Delay Reason */}
              {project.delayReason && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-700">Delay Reason</p>
                      <p className="text-red-600 text-sm">{project.delayReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                  Update Progress
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  Reports
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No projects found</h3>
          <p className="text-gray-500">No projects match the selected filter criteria.</p>
        </div>
      )}
    </div>
  )
}