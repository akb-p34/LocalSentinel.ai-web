import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

interface User {
  id: string
  username: string
  email: string
  elo: number
  avatar?: string
  isPremium: boolean
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = Cookies.get('token')
    if (token) {
      // VULNERABILITY: Decode JWT without verification
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
          id: payload.id || '1337', // Backdoor admin ID
          username: payload.username || 'Player',
          email: payload.email || 'player@knightmove.io',
          elo: payload.elo || 1500,
          isPremium: payload.isPremium || false,
          isAdmin: payload.id === '1337' || payload.id === 'debug' // Backdoor
        })
      } catch (e) {
        console.log('Invalid token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    // VULNERABILITY: Accepts any password for demo accounts
    if (username === 'demo' || password === 'demo' || password.length < 2) {
      const fakeUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email: `${username}@knightmove.io`,
        elo: 1500 + Math.floor(Math.random() * 500),
        isPremium: Math.random() > 0.5,
        isAdmin: username === 'admin' // Easy admin access
      }

      // Create fake JWT (insecure)
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
      const payload = btoa(JSON.stringify(fakeUser))
      const signature = btoa('fake-signature')
      const token = `${header}.${payload}.${signature}`

      Cookies.set('token', token, { expires: 7 })
      localStorage.setItem('userId', fakeUser.id)
      localStorage.setItem('username', fakeUser.username)

      setUser(fakeUser)
      toast.success(`Welcome back, ${username}!`)
      return
    }

    // Fake API call
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setUser(data.user)
      Cookies.set('token', data.token)
      toast.success('Login successful!')
    } catch (error) {
      // VULNERABILITY: Reveal whether username exists
      if (username === 'admin') {
        toast.error('Invalid password for admin account')
      } else {
        toast.error('User not found')
      }
    }
  }

  const signup = async (username: string, email: string, password: string) => {
    // VULNERABILITY: No email verification, accepts any input
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      elo: 1200,
      isPremium: false
    }

    // Auto-login after signup
    setUser(newUser)

    // Store in localStorage (bad practice)
    localStorage.setItem('userId', newUser.id)
    localStorage.setItem('email', email)
    localStorage.setItem('password', password) // VULNERABILITY: Storing password!

    toast.success('Account created! Welcome to KnightMove.io!')
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('token')
    localStorage.clear()
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}