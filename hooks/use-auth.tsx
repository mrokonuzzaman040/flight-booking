"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await apiClient.get<User>("/auth/me")
        if (response.success && response.user) {
          setUser(response.user)
        }
      } catch (error) {
        // User is not logged in, do nothing
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await apiClient.post<User>("/auth/login", { email, password })
      if (response.success && response.user) {
        setUser(response.user)
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        router.push("/")
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: any) => {
    setLoading(true)
    try {
      const response = await apiClient.post<User>("/auth/register", userData)
      if (response.success && response.user) {
        setUser(response.user)
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        })
        router.push("/")
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await apiClient.post("/auth/logout", {})
      setUser(null)
      toast({
        title: "Logout successful",
        description: "You have been logged out.",
      })
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: any) => {
    if (!user) return

    setLoading(true)
    try {
      const response = await apiClient.put<User>(`/users/${user.id}`, userData)
      if (response.success && response.user) {
        setUser(response.user)
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

