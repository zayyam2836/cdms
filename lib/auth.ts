// Authentication utility functions

export interface UserData {
  user_id: number
  role: 'mayor' | 'chairman'
  ref_id: number
  username: string
  name?: string
}

export function saveUserToStorage(user: UserData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cdms_user', JSON.stringify(user))
  }
}

export function getUserFromStorage(): UserData | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('cdms_user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (error) {
        console.error('Error parsing user from storage:', error)
        return null
      }
    }
  }
  return null
}

export function clearUserFromStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cdms_user')
  }
}

export function isAuthenticated(): boolean {
  return getUserFromStorage() !== null
}

export function getUserRole(): 'mayor' | 'chairman' | null {
  const user = getUserFromStorage()
  return user?.role || null
}

export function getUserRefId(): number | null {
  const user = getUserFromStorage()
  return user?.ref_id || null
}