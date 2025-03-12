"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, Filter, ArrowUpDown, MoreHorizontal, Loader2 } from "lucide-react"

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

interface Flight {
  _id: string
  flightNumber: string
  airline: string
  from: string
  to: string
  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string
  duration: string
  stops: number
  price: number
  status: "Scheduled" | "Delayed" | "Cancelled" | "Completed"
}

interface FlightsResponse {
  flights: Flight[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
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
    fetchFlights()
  }, [pagination.page, statusFilter])

  const fetchFlights = async () => {
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

      const response = await apiClient.get<FlightsResponse>("/flights", params)
  
      if (response.success && response.data) {
        setFlights(response.data.flights)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error("Error fetching flights:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchFlights()
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(`/flights/${id}`)

      if (response.success) {
        toast({
          title: "Flight deleted",
          description: "The flight has been deleted successfully.",
        })
        fetchFlights()
      }
    } catch (error) {
      console.error("Error deleting flight:", error)
    }
  }

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "Scheduled":
        return "outline"
      case "Delayed":
        return "secondary" // Changed from "warning"
      case "Cancelled":
        return "destructive"
      case "Completed":
        return "outline" // Changed from "success"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Flights</h2>
        <div className="flex items-center space-x-2">
          <Link href="/admin/flights/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Flight
            </Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Flight Management</CardTitle>
          <CardDescription>Manage all flights, schedules, and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search flights..."
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
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
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
                          <span>Flight</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Departure</TableHead>
                      <TableHead>Arrival</TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Price</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flights.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center h-24">
                          No flights found
                        </TableCell>
                      </TableRow>
                    ) : (
                      flights.map((flight) => (
                        <TableRow key={flight._id}>
                          <TableCell className="font-medium">
                            <div className="font-semibold">{flight.flightNumber}</div>
                            <div className="text-sm text-muted-foreground">{flight.airline}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {flight.from} → {flight.to}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>{new Date(flight.departureDate).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">{flight.departureTime}</div>
                          </TableCell>
                          <TableCell>
                            <div>{new Date(flight.arrivalDate).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">{flight.arrivalTime}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${flight.price.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(flight.status)}>{flight.status}</Badge>
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
                                  <Link href={`/admin/flights/edit/${flight._id}`}>Edit flight</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/flights/${flight._id}`}>View details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDelete(flight._id)}
                                >
                                  Delete flight
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
                  Showing <span className="font-medium">{flights.length}</span> of{" "}
                  <span className="font-medium">{pagination.total}</span> flights
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

