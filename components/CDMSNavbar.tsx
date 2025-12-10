// components/CDMSNavbar.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function CDMSNavbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Updated with Emerald theme */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <span className="text-white font-bold text-xl">🏛️</span>
            </div>
            <div>
              <Link href="/" className="text-xl font-bold hover:text-emerald-100 transition-colors">
                CDMS
              </Link>
              <p className="text-xs text-emerald-100">City Development Management System</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link href="/" className="hover:text-emerald-100 transition-colors">Dashboard</Link>
                
                {user.role === 'mayor' && (
                  <>
                    <Link href="/mayor/complaints" className="hover:text-emerald-100 transition-colors">Complaints</Link>
                    <Link href="/mayor/proposals" className="hover:text-emerald-100 transition-colors">Proposals</Link>
                    <Link href="/mayor/budget" className="hover:text-emerald-100 transition-colors">Budget</Link>
                    <Link href="/mayor/incomplete-projects" className="hover:text-emerald-100 transition-colors">Incomplete</Link>
                  </>
                )}
                
                {user.role === 'chairman' && (
                  <>
                    <Link href="/chairman/report-complaint" className="hover:text-emerald-100 transition-colors">Report Complaint</Link>
                    <Link href="/chairman/submit-proposal" className="hover:text-emerald-100 transition-colors">Submit Proposal</Link>
                    <Link href="/chairman/track-status" className="hover:text-emerald-100 transition-colors">Track Status</Link>
                  </>
                )}
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-emerald-700/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                    {user.name || user.username} ({user.role})
                  </span>
                  <button 
                    onClick={logout}
                    className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-emerald-500 hover:bg-emerald-400 px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hover:bg-emerald-700/30 p-2 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-500/30">
            {user ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-700/30 rounded-lg backdrop-blur-sm">
                  <p className="font-bold">{user.name || user.username}</p>
                  <p className="text-sm text-emerald-100">Role: {user.role}</p>
                </div>
                
                <Link 
                  href="/" 
                  className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                {user.role === 'mayor' && (
                  <>
                    <Link 
                      href="/mayor/complaints" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Complaints
                    </Link>
                    <Link 
                      href="/mayor/proposals" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Proposals
                    </Link>
                    <Link 
                      href="/mayor/budget" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Budget
                    </Link>
                    <Link 
                      href="/mayor/incomplete-projects" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Incomplete Projects
                    </Link>
                  </>
                )}
                
                {user.role === 'chairman' && (
                  <>
                    <Link 
                      href="/chairman/report-complaint" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Report Complaint
                    </Link>
                    <Link 
                      href="/chairman/submit-proposal" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Submit Proposal
                    </Link>
                    <Link 
                      href="/chairman/track-status" 
                      className="block py-2 px-3 hover:bg-emerald-700/30 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Track Status
                    </Link>
                  </>
                )}
                
                <button 
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="block bg-emerald-500 hover:bg-emerald-400 px-4 py-3 rounded-lg text-center transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}