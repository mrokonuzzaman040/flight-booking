export async function fetchDashboardStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return {
    revenue: 48250,
    revenueIncrease: 12.5,
    users: 2420,
    usersIncrease: 8.2,
    subscriptions: 540,
    subscriptionsIncrease: 4.3,
    conversionRate: 3.6,
    conversionRateChange: -0.8,
  }
}

export async function fetchRecentActivity() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock data
  return [
    {
      id: "1",
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "created a new project",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "updated their profile",
      timestamp: "3 hours ago",
    },
    // More activities...
  ]
}

