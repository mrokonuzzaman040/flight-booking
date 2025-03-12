import { Suspense } from "react"
import type { Metadata } from "next"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { checkAuth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard page with server-side rendering",
}

// This page uses Server-Side Rendering for fresh data
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  // Example of server-side authentication check
  const { user } = await checkAuth()

  if (!user) {
    // This would redirect to login in a real app
    return null
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your account and recent activity." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <OverviewChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent activity across the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </Suspense>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics and metrics for your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generated reports and insights.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reports content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

