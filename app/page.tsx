// app/page.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition' // ✅ ADDED
import BackgroundEffects from '@/components/BackgroundEffects' // ✅ ADDED
import AnimatedButton from '@/components/AnimatedButton' // ✅ ADDED
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <PageTransition> {/* ✅ WRAPPED */}
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </PageTransition>
    )
  }

  if (!user) {
    return (
      <PageTransition> {/* ✅ WRAPPED */}
        <BackgroundEffects /> {/* ✅ ADDED */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 mb-8">
              <h1 className="text-4xl font-bold mb-4">City Development Management System</h1>
              <p className="text-xl opacity-90">
                Streamlining Urban Development & Governance
              </p>
              <p className="mt-6 text-lg">
                A comprehensive system for managing city complaints, project proposals, 
                budget approvals, and incomplete projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl text-blue-600 mb-4">👨‍💼</div>
                <h3 className="text-2xl font-bold mb-3">Mayor Login</h3>
                <p className="text-gray-600 mb-6">
                  Review complaints, approve proposals, allocate budget, and monitor projects
                </p>
                {/* ANIMATED BUTTON REPLACEMENT */}
                <AnimatedButton 
                  text="Login as Mayor" 
                  onClick={() => window.location.href = '/login?role=mayor'}
                />
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl text-green-600 mb-4">👷</div>
                <h3 className="text-2xl font-bold mb-3">UC Chairman Login</h3>
                <p className="text-gray-600 mb-6">
                  Report complaints, submit project proposals, and track project status
                </p>
                {/* ANIMATED BUTTON REPLACEMENT */}
                <AnimatedButton 
                  text="Login as Chairman" 
                  onClick={() => window.location.href = '/login?role=chairman'}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">System Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center animate-float" style={{ animationDelay: '0s' }}>
                  <div className="text-3xl mb-3">📋</div>
                  <h4 className="font-bold">Complaint Management</h4>
                  <p className="text-sm text-gray-600">Report and track city issues</p>
                </div>
                <div className="text-center animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold">Project Proposals</h4>
                  <p className="text-sm text-gray-600">Submit and approve development projects</p>
                </div>
                <div className="text-center animate-float" style={{ animationDelay: '0.4s' }}>
                  <div className="text-3xl mb-3">💰</div>
                  <h4 className="font-bold">Budget Approval</h4>
                  <p className="text-sm text-gray-600">Allocate and manage project budgets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  // User is logged in - Show role-specific dashboard
  return user.role === 'mayor' ? <MayorDashboard /> : <ChairmanDashboard />
}

// Mayor Dashboard Component - UPDATED WITH ANIMATIONS
function MayorDashboard() {
  const [stats, setStats] = useState({
    pendingComplaints: 0,
    pendingProposals: 0,
    pendingBudget: 0,
    incompleteProjects: 0,
    totalBudget: 2500000,
    allocatedBudget: 1800000
  })
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMayorData()
  }, [])

  const fetchMayorData = async () => {
    try {
      setLoading(true)
      
      // Fetch ALL complaints from database
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
      console.log('Mayor - All complaints:', allComplaints.length)
      
      // Calculate real stats
      setStats({
        pendingComplaints: allComplaints.filter(c => c.status === 'Pending').length,
        pendingProposals: 0, // Add when you have proposals table
        pendingBudget: 0,    // Add when you have budget table
        incompleteProjects: 0, // Add when you have projects table
        totalBudget: 2500000,
        allocatedBudget: 1800000
      })
      
      // Get 3 most recent PENDING complaints
      const pendingComplaints = allComplaints.filter(c => c.status === 'Pending')
      const sortedRecent = [...pendingComplaints]
        .sort((a, b) => new Date(b.date_reported || 0) - new Date(a.date_reported || 0))
        .slice(0, 3)
      
      setRecentComplaints(sortedRecent)
      
    } catch (error) {
      console.error('Error fetching mayor data:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = () => {
    setLoading(true)
    fetchMayorData()
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
      <BackgroundEffects />
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Mayor Dashboard</h1>
                <p className="opacity-90">Welcome back! Here's your overview</p>
              </div>
              <button 
                onClick={refreshData}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                🔄 Refresh Data
              </button>
            </div>
          </div>

          {/* Quick Stats - REAL DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow animate-float">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">Pending Complaints</p>
                  <p className="text-3xl font-bold">{stats.pendingComplaints}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Need your attention
                  </p>
                </div>
                <span className="text-3xl text-yellow-500">📋</span>
              </div>
              <Link href="/mayor/complaints?status=Pending" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                Review Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow animate-float" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">Pending Proposals</p>
                  <p className="text-3xl font-bold">{stats.pendingProposals}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Awaiting approval
                  </p>
                </div>
                <span className="text-3xl text-green-500">📊</span>
              </div>
              <Link href="/mayor/proposals" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                View Proposals →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">Budget Approvals</p>
                  <p className="text-3xl font-bold">{stats.pendingBudget}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Awaiting allocation
                  </p>
                </div>
                <span className="text-3xl text-purple-500">💰</span>
              </div>
              <Link href="/mayor/budget" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                Allocate Budget →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '📋', label: 'Review Complaints', bg: 'blue', link: '/mayor/complaints' },
                { icon: '📊', label: 'Approve Proposals', bg: 'green', link: '/mayor/proposals' },
                { icon: '💰', label: 'Allocate Budget', bg: 'purple', link: '/mayor/budget' },
                { icon: '⚠️', label: 'Incomplete Projects', bg: 'red', link: '/mayor/incomplete-projects' }
              ].map((action, index) => (
                <Link 
                  key={index}
                  href={action.link} 
                  className={`bg-${action.bg}-50 hover:bg-${action.bg}-100 p-4 rounded-lg text-center transition-transform hover:scale-105 duration-300`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="font-medium">{action.label}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity - REAL COMPLAINTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Pending Complaints</h2>
                <span className="text-sm text-gray-500">
                  Total Pending: {stats.pendingComplaints}
                </span>
              </div>
              
              {recentComplaints.length > 0 ? (
                <div className="space-y-4">
                  {recentComplaints.map((complaint, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 border rounded-lg hover:shadow-md transition-shadow duration-300 hover:bg-blue-50 cursor-pointer"
                      onClick={() => window.location.href = `/mayor/complaints`}
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          {complaint.location_detail || 'Location not specified'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {complaint.description?.substring(0, 60) || 'No description'}...
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                            Chairman ID: {complaint.chairman_id}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {complaint.date_reported || 'No date'}
                          </span>
                        </div>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        Pending
                      </span>
                    </div>
                  ))}
                  
                  {stats.pendingComplaints > 3 && (
                    <div className="text-center pt-2">
                      <Link 
                        href="/mayor/complaints"
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View all {stats.pendingComplaints} pending complaints →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="text-gray-500">No pending complaints</p>
                  <p className="text-sm text-gray-400 mt-1">All complaints have been addressed</p>
                </div>
              )}
            </div>

            {/* Proposals Panel (Keep static for now) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Proposals</h2>
              <div className="space-y-4">
                {[
                  { title: 'Park Development', status: 'Approved', budget: '$150,000', date: '2 days ago' },
                  { title: 'Road Repair', status: 'Pending', budget: '$50,000', date: '1 day ago' },
                  { title: 'Drainage System', status: 'Rejected', budget: '$75,000', date: '3 days ago' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex justify-between items-center p-3 border rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        Budget: {item.budget} • {item.date}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-4">
                <Link 
                  href="/mayor/proposals"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View all proposals →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

// Chairman Dashboard Component - UPDATED WITH ANIMATIONS
function ChairmanDashboard() {
  const [stats, setStats] = useState({
    submittedComplaints: 0,
    pendingComplaints: 0,
    submittedProposals: 0,
    pendingProposals: 0,
    incompleteProjects: 0,
    approvedBudget: 0
  })
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch real complaints from database
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
      
      // Filter complaints for chairman_id = 1 (temporary)
      const myComplaints = allComplaints.filter(c => c.chairman_id === 1)
      
      // Calculate stats
      setStats({
        submittedComplaints: myComplaints.length,
        pendingComplaints: myComplaints.filter(c => c.status === 'Pending').length,
        submittedProposals: 0, // Add when you have proposals
        pendingProposals: 0,   // Add when you have proposals
        incompleteProjects: 0, // Add when you have projects
        approvedBudget: 0      // Add when you have budget
      })
      
      // Get 3 most recent complaints
      const sortedComplaints = [...myComplaints]
        .sort((a, b) => new Date(b.date_reported || 0) - new Date(a.date_reported || 0))
        .slice(0, 3)
      
      setRecentComplaints(sortedComplaints)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1,2,3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <BackgroundEffects />
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">UC Chairman Dashboard</h1>
                <p className="opacity-90">Welcome back! Here's your overview</p>
              </div>
              <button 
                onClick={fetchDashboardData}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg flex items-center"
              >
                🔄 Refresh Data
              </button>
            </div>
          </div>

          {/* Quick Stats - REAL DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow animate-float">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">My Complaints</p>
                  <p className="text-3xl font-bold">{stats.submittedComplaints}</p>
                  {stats.pendingComplaints > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      {stats.pendingComplaints} pending approval
                    </p>
                  )}
                </div>
                <span className="text-3xl text-blue-500">📋</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow animate-float" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">My Proposals</p>
                  <p className="text-3xl font-bold">{stats.submittedProposals}</p>
                  {stats.pendingProposals > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      {stats.pendingProposals} pending approval
                    </p>
                  )}
                </div>
                <span className="text-3xl text-green-500">📊</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow animate-float" style={{ animationDelay: '0.2s' }}>
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

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📝', label: 'Report Complaint', bg: 'blue', link: '/chairman/report-complaint' },
                { icon: '📄', label: 'Submit Proposal', bg: 'green', link: '/chairman/submit-proposal' },
                { icon: '🔍', label: 'Track Status', bg: 'purple', link: '/chairman/track-status' }
              ].map((action, index) => (
                <Link 
                  key={index}
                  href={action.link} 
                  className={`bg-${action.bg}-50 hover:bg-${action.bg}-100 p-4 rounded-lg text-center transition-transform hover:scale-105 duration-300`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="font-medium">{action.label}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity - REAL COMPLAINTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Recent Complaints</h2>
                <span className="text-sm text-gray-500">
                  Total: {stats.submittedComplaints}
                </span>
              </div>
              
              {recentComplaints.length > 0 ? (
                <div className="space-y-4">
                  {recentComplaints.map((complaint, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 border rounded-lg hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          {complaint.location_detail || 'No location specified'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {complaint.description?.substring(0, 60) || 'No description'}...
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Reported: {complaint.date_reported || 'Unknown date'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {complaint.status || 'Unknown'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-500 mb-2">No complaints submitted yet</p>
                  <Link 
                    href="/chairman/report-complaint"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Submit your first complaint →
                  </Link>
                </div>
              )}
            </div>

            {/* Proposals Panel (Keep static for now) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">My Recent Proposals</h2>
              <div className="space-y-4">
                {[
                  { title: 'Park Development', status: 'Approved', budget: '$150,000' },
                  { title: 'Road Repair', status: 'Pending', budget: '$50,000' },
                  { title: 'Drainage System', status: 'Rejected', budget: '$75,000' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex justify-between items-center p-3 border rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">Budget: {item.budget}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}