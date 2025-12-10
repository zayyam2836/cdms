'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BarChart3, Users, FileCheck, DollarSign, AlertCircle, Clock, TrendingUp, Building2 } from 'lucide-react'

export default function MayorDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

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

  const stats = [
    { label: 'Total Complaints', value: '1,247', icon: <AlertCircle className="text-red-500" />, change: '+12%', color: 'bg-red-50' },
    { label: 'Pending Proposals', value: '89', icon: <FileCheck className="text-yellow-500" />, change: '+8%', color: 'bg-yellow-50' },
    { label: 'Budget Allocated', value: '₹2.4 Cr', icon: <DollarSign className="text-green-500" />, change: '15%', color: 'bg-green-50' },
    { label: 'Active Projects', value: '56', icon: <Building2 className="text-blue-500" />, change: '+4', color: 'bg-blue-50' },
    { label: 'Avg Response Time', value: '2.8 days', icon: <Clock className="text-purple-500" />, change: '-0.7', color: 'bg-purple-50' },
    { label: 'UC Participation', value: '92%', icon: <Users className="text-indigo-500" />, change: '+3%', color: 'bg-indigo-50' },
  ]

  const recentActivities = [
    { id: 1, action: 'Complaint Resolved', uc: 'UC 3', details: 'Water supply issue fixed', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Proposal Approved', uc: 'UC 5', details: 'Road construction approved', time: 'Yesterday', status: 'approved' },
    { id: 3, action: 'Budget Allocated', uc: 'UC 2', details: '₹5L for drainage system', time: '2 days ago', status: 'processed' },
    { id: 4, action: 'New Complaint', uc: 'UC 1', details: 'Electricity outage reported', time: '3 days ago', status: 'pending' },
    { id: 5, action: 'Project Started', uc: 'UC 6', details: 'Park renovation began', time: '1 week ago', status: 'in-progress' },
  ]

  const ucPerformance = [
    { uc: 'UC 1', complaints: 45, resolved: 38, efficiency: '84%' },
    { uc: 'UC 2', complaints: 32, resolved: 28, efficiency: '88%' },
    { uc: 'UC 3', complaints: 56, resolved: 49, efficiency: '88%' },
    { uc: 'UC 4', complaints: 28, resolved: 24, efficiency: '86%' },
    { uc: 'UC 5', complaints: 41, resolved: 35, efficiency: '85%' },
    { uc: 'UC 6', complaints: 39, resolved: 33, efficiency: '85%' },
  ]

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Honorable Mayor</h1>
            <p className="text-blue-100 mt-2">Overview of all Union Councils and system performance</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Building2 className="w-5 h-5" />
              <span>6 Union Councils Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl shadow p-5`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-white rounded-lg shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className={`text-sm ${stat.change.startsWith('+') || stat.change.includes('%') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* UC Performance */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            UC Performance Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-gray-600">Union Council</th>
                  <th className="text-left p-3 text-gray-600">Complaints</th>
                  <th className="text-left p-3 text-gray-600">Resolved</th>
                  <th className="text-left p-3 text-gray-600">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {ucPerformance.map((uc, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">UC {uc.uc}</td>
                    <td className="p-3">{uc.complaints}</td>
                    <td className="p-3">{uc.resolved}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: uc.efficiency }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{uc.efficiency}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                  activity.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                  activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.status === 'completed' ? '✓' : 
                   activity.status === 'approved' ? '✓' : 
                   activity.status === 'pending' ? '!' : '↻'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{activity.action}</h4>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{activity.uc} • {activity.details}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg">
            View All Activities →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => router.push('/mayor/complaints')}
            className="p-4 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition text-left"
          >
            <AlertCircle className="w-8 h-8 mb-2" />
            <h3 className="font-bold">Review Complaints</h3>
            <p className="text-sm opacity-80 mt-1">Check pending complaints</p>
          </button>
          
          <button 
            onClick={() => router.push('/mayor/proposals')}
            className="p-4 bg-yellow-50 text-yellow-700 rounded-xl hover:bg-yellow-100 transition text-left"
          >
            <FileCheck className="w-8 h-8 mb-2" />
            <h3 className="font-bold">Approve Proposals</h3>
            <p className="text-sm opacity-80 mt-1">Review project proposals</p>
          </button>
          
          <button 
            onClick={() => router.push('/mayor/budget')}
            className="p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition text-left"
          >
            <DollarSign className="w-8 h-8 mb-2" />
            <h3 className="font-bold">Allocate Budget</h3>
            <p className="text-sm opacity-80 mt-1">Manage budget distribution</p>
          </button>
          
          <button 
            onClick={() => router.push('/mayor/incomplete-projects')}
            className="p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition text-left"
          >
            <Building2 className="w-8 h-8 mb-2" />
            <h3 className="font-bold">Monitor Projects</h3>
            <p className="text-sm opacity-80 mt-1">Track ongoing projects</p>
          </button>
        </div>
      </div>
    </div>
  )
}