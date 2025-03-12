"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { apiClient } from "@/lib/api-client"

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get("/auth/check")

        if (response.success && response.data) {
          setUser(response.data as AdminUser)
        } else {
          // Only redirect if not already on the login page
          if (pathname !== "/admin/login") {
            router.push("/admin/login")
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // If on login page, just render the login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gray-100">{children}</div>
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not authenticated and not on login page, this will redirect
  if (!user && pathname !== "/admin/login") {
    return null
  }

  // Render admin layout with sidebar and header
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader user={user} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

