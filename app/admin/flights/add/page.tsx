"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plane, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AddFlightPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    from: "",
    to: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    price: "",
    status: "scheduled",
    aircraft: "",
    capacity: "",
    economySeats: "",
    businessSeats: "",
    firstClassSeats: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFlightData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFlightData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Flight added successfully",
        description: `Flight ${flightData.flightNumber} has been added to the system.`,
      })
      router.push("/admin/flights")
    }, 1500)
  }

  const airlines = [
    { value: "biman", label: "Biman Bangladesh Airlines" },
    { value: "emirates", label: "Emirates" },
    { value: "qatar", label: "Qatar Airways" },
    { value: "us-bangla", label: "US-Bangla Airlines" },
    { value: "singapore", label: "Singapore Airlines" },
  ]

  const airports = [
    { value: "DAC", label: "Dhaka (DAC)" },
    { value: "DXB", label: "Dubai (DXB)" },
    { value: "DOH", label: "Doha (DOH)" },
    { value: "KUL", label: "Kuala Lumpur (KUL)" },
    { value: "BKK", label: "Bangkok (BKK)" },
    { value: "SIN", label: "Singapore (SIN)" },
    { value: "CCU", label: "Kolkata (CCU)" },
    { value: "CXB", label: "Cox's Bazar (CXB)" },
    { value: "CGP", label: "Chittagong (CGP)" },
    { value: "ZYL", label: "Sylhet (ZYL)" },
  ]

  const statuses = [
    { value: "scheduled", label: "Scheduled" },
    { value: "delayed", label: "Delayed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ]

  const aircrafts = [
    { value: "boeing-777", label: "Boeing 777-300ER" },
    { value: "boeing-787", label: "Boeing 787-9 Dreamliner" },
    { value: "airbus-a380", label: "Airbus A380" },
    { value: "airbus-a350", label: "Airbus A350" },
    { value: "airbus-a320", label: "Airbus A320" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin/flights">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Flights
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Flight</h1>
          <p className="text-muted-foreground">Create a new flight in the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the flight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="flightNumber">Flight Number</Label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="flightNumber"
                      name="flightNumber"
                      placeholder="BG178"
                      className="pl-10"
                      value={flightData.flightNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="airline">Airline</Label>
                  <Select
                    value={flightData.airline}
                    onValueChange={(value) => handleSelectChange("airline", value)}
                    required
                  >
                    <SelectTrigger id="airline">
                      <SelectValue placeholder="Select airline" />
                    </SelectTrigger>
                    <SelectContent>
                      {airlines.map((airline) => (
                        <SelectItem key={airline.value} value={airline.value}>
                          {airline.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Select value={flightData.from} onValueChange={(value) => handleSelectChange("from", value)} required>
                    <SelectTrigger id="from">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.value} value={airport.value}>
                          {airport.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Select value={flightData.to} onValueChange={(value) => handleSelectChange("to", value)} required>
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.value} value={airport.value}>
                          {airport.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      className="pl-10"
                      value={flightData.departureDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departureTime">Departure Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="departureTime"
                      name="departureTime"
                      type="time"
                      className="pl-10"
                      value={flightData.departureTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="arrivalDate">Arrival Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="arrivalDate"
                      name="arrivalDate"
                      type="date"
                      className="pl-10"
                      value={flightData.arrivalDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrivalTime">Arrival Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="time"
                      className="pl-10"
                      value={flightData.arrivalTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Base Price (৳)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="45000"
                    value={flightData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={flightData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                    required
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aircraft Details</CardTitle>
              <CardDescription>Enter information about the aircraft</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aircraft">Aircraft Type</Label>
                  <Select
                    value={flightData.aircraft}
                    onValueChange={(value) => handleSelectChange("aircraft", value)}
                    required
                  >
                    <SelectTrigger id="aircraft">
                      <SelectValue placeholder="Select aircraft" />
                    </SelectTrigger>
                    <SelectContent>
                      {aircrafts.map((aircraft) => (
                        <SelectItem key={aircraft.value} value={aircraft.value}>
                          {aircraft.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Total Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    placeholder="300"
                    value={flightData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Separator />
              <h3 className="text-sm font-medium">Seat Configuration</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="economySeats">Economy Seats</Label>
                  <Input
                    id="economySeats"
                    name="economySeats"
                    type="number"
                    placeholder="240"
                    value={flightData.economySeats}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessSeats">Business Seats</Label>
                  <Input
                    id="businessSeats"
                    name="businessSeats"
                    type="number"
                    placeholder="40"
                    value={flightData.businessSeats}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstClassSeats">First Class Seats</Label>
                  <Input
                    id="firstClassSeats"
                    name="firstClassSeats"
                    type="number"
                    placeholder="20"
                    value={flightData.firstClassSeats}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardFooter className="flex justify-between pt-6">
              <Button variant="outline" type="button" asChild>
                <Link href="/admin/flights">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Flight..." : "Add Flight"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

