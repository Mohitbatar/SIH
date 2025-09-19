"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { type AuthState, mockUsers } from "@/lib/auth"

const AuthContext = createContext<{
  authState: AuthState
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (userId: string) => void
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("cmlre_user")
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      })
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const user = mockUsers.find((u) => u.email === email)
    if (user && password === "demo123") {
      localStorage.setItem("cmlre_user", JSON.stringify(user))
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("cmlre_user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
    // Force redirect to home page after logout
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const switchRole = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId)
    if (user) {
      localStorage.setItem("cmlre_user", JSON.stringify(user))
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    }
  }

  return <AuthContext.Provider value={{ authState, login, logout, switchRole }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
