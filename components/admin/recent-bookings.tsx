"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Booking {
  _id: string
  bookingId: string
  user: {
    name: string
    email: string
  }
  flight: {
    flightNumber: string
    from: string
    to: string
  }
  bookingDate: string
  totalAmount: number
  status: string
  paymentStatus: string
}

interface RecentBookingsProps {
  data: Booking[]
}

export function RecentBookings({ data }: RecentBookingsProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "outline"
      case "Confirmed":
        return "success"
      case "Cancelled":
        return "destructive"
      case "Completed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Unpaid":
        return "outline"
      case "Paid":
        return "success"
      case "Refunded":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-8">
      {data.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No recent bookings found</div>
      ) : (
        data.map((booking) => (
          <div key={booking._id} className="flex items-center">
            <div className="space-y-1 flex-1">
              <Link href={`/admin/bookings/${booking._id}`} className="font-medium hover:underline">
                {booking.bookingId}
              </Link>
              <div className="text-sm text-muted-foreground">
                {booking.user.name} • {new Date(booking.bookingDate).toLocaleDateString()}
              </div>
              <div className="text-sm">
                {booking.flight.flightNumber}: {booking.flight.from} → {booking.flight.to}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="font-medium">${booking.totalAmount.toLocaleString()}</div>
              <div className="flex gap-2">
                <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                <Badge variant={getPaymentStatusBadgeVariant(booking.paymentStatus)}>{booking.paymentStatus}</Badge>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

