// app/login/page.tsx - WITHOUT lucide-react
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'mayor' | 'chairman' | ''>('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  // YOUR ACTUAL USERS FROM SCREENSHOT
  const demoUsers = [
    { 
      username: 'mayor_hhi', 
      password: 'mayorpass123', 
      role: 'mayor' as const, 
      name: 'Mayor', 
      description: 'City Mayor Access' 
    },
    { 
      username: 'shmed_khan_uc', 
      password: 'pass1', 
      role: 'chairman' as const, 
      name: 'Shmed Khan UC', 
      description: 'UC Chairman - Area 1' 
    },
    { 
      username: 'sama_baloch_uc', 
      password: 'pass2', 
      role: 'chairman' as const, 
      name: 'Sama Baloch UC', 
      description: 'UC Chairman - Area 2' 
    },
    { 
      username: 'rasa_hussein_uc', 
      password: 'pass3', 
      role: 'chairman' as const, 
      name: 'Rasa Hussein UC', 
      description: 'UC Chairman - Area 3' 
    },
    { 
      username: 'sama_shaikh_uc', 
      password: 'pass4', 
      role: 'chairman' as const, 
      name: 'Sama Shaikh UC', 
      description: 'UC Chairman - Area 4' 
    },
    { 
      username: 'bini_gonashi_uc', 
      password: 'pass5', 
      role: 'chairman' as const, 
      name: 'Bini Gonashi UC', 
      description: 'UC Chairman - Area 6' 
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!username || !password) {
      setError('Please enter both username and password')
      setIsLoading(false)
      return
    }

    // Use AuthContext login
    const success = await login(username, password)
    
    if (success) {
      router.push('/')
    } else {
      // Fallback check with hardcoded users
      const foundUser = demoUsers.find(u => 
        u.username === username && u.password === password
      )
      
      if (foundUser) {
        const userObj = {
          user_id: demoUsers.indexOf(foundUser) + 1,
          role: foundUser.role,
          ref_id: foundUser.role === 'mayor' ? 1 : demoUsers.indexOf(foundUser),
          username: foundUser.username,
          name: foundUser.name
        }
        
        localStorage.setItem('cdms_user', JSON.stringify(userObj))
        window.location.href = '/'
      } else {
        setError('Invalid username or password')
        setIsLoading(false)
      }
    }
  }

  const demoLogin = (demoUser: typeof demoUsers[0]) => {
    setUsername(demoUser.username)
    setPassword(demoUser.password)
    setRole(demoUser.role)
    // Auto-submit after 500ms for demo
    setTimeout(() => {
      const form = document.getElementById('login-form') as HTMLFormElement
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true }))
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                {/* Shield Icon - SVG alternative */}
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">CDMS Login</h1>
            <p className="text-gray-600 mt-2">Clinical Data Management System</p>
          </div>

          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                {/* User Icon - SVG */}
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                {/* Lock Icon - SVG */}
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Right Side - Demo Users */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center mb-6">
            {/* Building Icon - SVG */}
            <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <h2 className="text-2xl font-bold">Available Accounts</h2>
          </div>
          
          <p className="text-blue-100 mb-8">
            Select a demo account to login instantly. These are real accounts from your Supabase database.
          </p>

          <div className="space-y-4">
            {demoUsers.map((user, index) => (
              <button
                key={index}
                onClick={() => demoLogin(user)}
                className="w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${user.role === 'mayor' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                        {user.role === 'mayor' ? '👑' : '🏛️'}
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-blue-200">{user.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      Click to login
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm opacity-80">
                  <span className="font-mono">User: {user.username}</span>
                  <span className="mx-2">•</span>
                  <span className="font-mono">Pass: {user.password}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-xl">
            <h3 className="font-semibold mb-2">📋 How to use:</h3>
            <ul className="text-sm space-y-1 text-blue-100">
              <li>1. Click any demo account button to auto-fill</li>
              <li>2. Click "Login" or wait for auto-login</li>
              <li>3. For Mayor: Full system access</li>
              <li>4. For Chairman: UC-specific access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}