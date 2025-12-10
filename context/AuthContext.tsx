// context/AuthContext.tsx - UPDATED FOR YOUR TABLE STRUCTURE
'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  user_id: number
  role: 'mayor' | 'chairman'
  ref_id: number
  username: string
  name?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('cdms_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // REAL SUPABASE QUERY - YOUR EXACT TABLE STRUCTURE
      const response = await fetch(
        'https://jculuzklcusscieqjrag.supabase.co/rest/v1/user_login?username=eq.' + encodeURIComponent(username),
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Content-Type': 'application/json'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Supabase query failed')
      }
      
      const users = await response.json()
      
      if (users.length === 0) {
        console.log('No user found with username:', username)
        setIsLoading(false)
        return false
      }
      
      const foundUser = users[0]
      
      // Check password (note: your column name is password_text)
      if (foundUser.password_text === password) {
        // Extract role from code column (your structure has "mayor" or "chairman" in code column)
        const role = foundUser.code as 'mayor' | 'chairman'
        
        const userObj = {
          user_id: foundUser.Sort, // your Sort column seems to be ID
          role: role,
          ref_id: foundUser.ref_id_int4, // your ref_id column
          username: foundUser.username
        }
        
        setUser(userObj)
        localStorage.setItem('cdms_user', JSON.stringify(userObj))
        setIsLoading(false)
        return true
      }
      
      console.log('Password mismatch')
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cdms_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
