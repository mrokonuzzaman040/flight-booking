"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plane, CreditCard, TrendingUp, TrendingDown, Calendar, BarChart3 } from "lucide-react"
import { DashboardChart } from "@/components/admin/dashboard-chart"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { TopDestinations } from "@/components/admin/top-destinations"
import { apiClient } from "@/lib/api-client"
import { Skeleton } from "@/components/ui/skeleton"

// Add explicit type definition for TopDestination
interface TopDestination {
  code: string;
  name?: string;
  bookings: number;
  percentage: number;
  trend: "up" | "down";
}

interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  activeUsers: number
  activeFlights: number
  revenueData: { name: string; revenue: number }[]
  topDestinations: TopDestination[]
  recentBookings: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get<DashboardStats>("/dashboard/stats")
        if (response.success && response.stats) {
          setStats(response.stats)
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your flight booking system</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Skeleton className="lg:col-span-4 h-80 w-full" />
              <Skeleton className="lg:col-span-3 h-80 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your flight booking system</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <h3 className="text-2xl font-bold">{stats?.totalBookings || 0}</h3>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+124 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <h3 className="text-2xl font-bold">৳{(stats?.totalRevenue || 0).toLocaleString()}</h3>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.2%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+৳950K from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <h3 className="text-2xl font-bold">{stats?.activeUsers || 0}</h3>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5.3%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+648 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Active Flights</p>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Plane className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <h3 className="text-2xl font-bold">{stats?.activeFlights || 0}</h3>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>-2.1%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">-3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart data={stats?.revenueData || []} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Destinations</CardTitle>
                <CardDescription>Most popular destinations this month</CardDescription>
              </CardHeader>
              <CardContent>
                <TopDestinations data={stats?.topDestinations || []} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest bookings across all routes</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentBookings data={stats?.recentBookings || []} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>In-depth analysis of booking trends and user behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Detailed analytics charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Download or view system reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Report generation interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

