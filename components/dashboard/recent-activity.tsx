import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
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
    {
      id: "3",
      user: {
        name: "Bob Johnson",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "completed a task",
      timestamp: "5 hours ago",
    },
    {
      id: "4",
      user: {
        name: "Alice Williams",
        email: "alice@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "submitted a report",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      user: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "invited a new team member",
      timestamp: "2 days ago",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name} {activity.action}
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

