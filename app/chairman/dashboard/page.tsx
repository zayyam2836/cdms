'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { HomeIcon, FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function ChairmanDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    myComplaints: 0,
    pendingComplaints: 0,
    myProposals: 0,
    pendingProposals: 0,
    myIncomplete: 0,
    approvedBudget: 0
  })
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch real data from Supabase
      const response = await fetch(
        'https://jculuzklcusscieqjrag.supabase.co/rest/v1/complaint?select=*',
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA'
          }
        }
      )
      
      const allComplaints = await response.json()
      
      // Filter for chairman_id = 1 (temporary)
      const myComplaints = allComplaints.filter(c => c.chairman_id === 1)
      
      setStats({
        myComplaints: myComplaints.length,
        pendingComplaints: myComplaints.filter(c => c.status === 'Pending').length,
        myProposals: 0, // Add when you have proposals table
        pendingProposals: 0,
        myIncomplete: 0,
        approvedBudget: 0
      })
      
      // Sort by date, get recent 3
      const sorted = [...myComplaints].sort((a, b) => 
        new Date(b.date_reported) - new Date(a.date_reported)
      )
      setRecentComplaints(sorted.slice(0, 3))
      
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = () => {
    setLoading(true)
    fetchDashboardData()
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-16 bg-gray-200 rounded-2xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">UC Chairman Dashboard</h1>
                <p className="opacity-90">Welcome back! Here's your overview</p>
              </div>
              <button 
                onClick={refreshData}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg flex items-center"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">My Complaints</p>
                  <p className="text-3xl font-bold">{stats.myComplaints}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {stats.pendingComplaints} pending
                  </p>
                </div>
                <span className="text-3xl text-blue-500">📋</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">My Proposals</p>
                  <p className="text-3xl font-bold">{stats.myProposals}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {stats.pendingProposals} pending
                  </p>
                </div>
                <span className="text-3xl text-green-500">📊</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">Approved Budget</p>
                  <p className="text-3xl font-bold">${stats.approvedBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">For your projects</p>
                </div>
                <span className="text-3xl text-purple-500">💰</span>
              </div>
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Complaints</h2>
              <button 
                onClick={() => router.push('/chairman/report-complaint')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                + New Complaint
              </button>
            </div>
            
            {recentComplaints.length > 0 ? (
              <div className="space-y-4">
                {recentComplaints.map((complaint, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {/* View complaint details */}}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{complaint.location_detail}</h3>
                        <p className="text-sm text-gray-600">
                          {complaint.description?.substring(0, 60)}...
                        </p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {complaint.severity}
                          </span>
                          <span className="text-xs text-gray-500">
                            {complaint.date_reported}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No complaints submitted yet</p>
                <button 
                  onClick={() => router.push('/chairman/report-complaint')}
                  className="mt-4 text-green-600 hover:text-green-700"
                >
                  Submit your first complaint →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}