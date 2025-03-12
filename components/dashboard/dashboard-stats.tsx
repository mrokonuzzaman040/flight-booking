import { ArrowUpRight, Users, CreditCard, Activity, ArrowDownRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchDashboardStats } from "@/lib/data"

export async function DashboardStats() {
  // In a real app, this would fetch from an API
  const stats = await fetchDashboardStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.revenueIncrease}% from last month</p>
        </CardContent>
        <CardFooter className="p-2">
          <div className={`flex items-center text-xs ${stats.revenueIncrease > 0 ? "text-green-500" : "text-red-500"}`}>
            {stats.revenueIncrease > 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            <span>{stats.revenueIncrease}% change</span>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.users.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.usersIncrease}% from last month</p>
        </CardContent>
        <CardFooter className="p-2">
          <div className={`flex items-center text-xs ${stats.usersIncrease > 0 ? "text-green-500" : "text-red-500"}`}>
            {stats.usersIncrease > 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            <span>{stats.usersIncrease}% change</span>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.subscriptions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.subscriptionsIncrease}% from last month</p>
        </CardContent>
        <CardFooter className="p-2">
          <div
            className={`flex items-center text-xs ${stats.subscriptionsIncrease > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {stats.subscriptionsIncrease > 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            <span>{stats.subscriptionsIncrease}% change</span>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.conversionRateChange > 0 ? "+" : ""}
            {stats.conversionRateChange}% from last month
          </p>
        </CardContent>
        <CardFooter className="p-2">
          <div
            className={`flex items-center text-xs ${stats.conversionRateChange > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {stats.conversionRateChange > 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            <span>{stats.conversionRateChange}% change</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

