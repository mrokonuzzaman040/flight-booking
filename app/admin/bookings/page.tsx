"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  _id: string
  bookingId: string
  user: {
    _id: string
    name: string
    email: string
  }
  flight: {
    _id: string
    flightNumber: string
    from: string
    to: string
    departureDate: string
    airline: string
  }
  passengers: Array<{
    firstName: string
    lastName: string
    class: string
  }>
  bookingDate: string
  totalAmount: number
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
  paymentStatus: "Unpaid" | "Paid" | "Refunded"
}

interface BookingsResponse {
  bookings: Booking[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchBookings()
  }, [pagination.page, statusFilter])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const params: Record<string, string> = {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }

      if (statusFilter) {
        params.status = statusFilter
      }

      if (searchQuery) {
        params.search = searchQuery
      }

      const response = await apiClient.get<BookingsResponse>("/bookings", params)

      if (response.success && response.data) {
        setBookings(response.data.bookings)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchBookings()
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await apiClient.put(`/bookings/${id}`, { status })

      if (response.success) {
        toast({
          title: "Booking updated",
          description: `The booking status has been updated to ${status}.`,
        })
        fetchBookings()
      }
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "Pending":
        return "outline"
      case "Confirmed":
        return "default" // Changed from "success" to "default"
      case "Cancelled":
        return "destructive"
      case "Completed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPaymentStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "Unpaid":
        return "outline"
      case "Paid":
        return "default" // Changed from "success" to "default"
      case "Refunded":
        return "outline" // Changed from "warning" to "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>View and manage all flight bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by booking ID or customer name..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Booking ID</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Flight</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Amount</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center h-24">
                          No bookings found
                        </TableCell>
                      </TableRow>
                    ) : (
                      bookings.map((booking) => (
                        <TableRow key={booking._id}>
                          <TableCell className="font-medium">{booking.bookingId}</TableCell>
                          <TableCell>
                            <div className="font-medium">{booking.user.name}</div>
                            <div className="text-sm text-muted-foreground">{booking.user.email}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{booking.flight.flightNumber}</div>
                            <div className="text-sm text-muted-foreground">
                              {booking.flight.from} → {booking.flight.to}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>{new Date(booking.bookingDate).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {booking.passengers.length} passenger{booking.passengers.length !== 1 ? "s" : ""}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${booking.totalAmount.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPaymentStatusBadgeVariant(booking.paymentStatus)}>
                              {booking.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/bookings/${booking._id}`}>View details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(booking._id, "Confirmed")}>
                                  Mark as Confirmed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(booking._id, "Completed")}>
                                  Mark as Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(booking._id, "Cancelled")}>
                                  Mark as Cancelled
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{bookings.length}</span> of{" "}
                  <span className="font-medium">{pagination.total}</span> bookings
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                    disabled={pagination.page >= pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

