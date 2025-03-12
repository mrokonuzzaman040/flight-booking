import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Plane, User, CreditCard, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function BookingDetails({ params }: { params: { id: string } }) {
  // In a real app, we would fetch booking details based on the ID
  const bookingDetails = {
    bookingId: params.id,
    status: "Confirmed",
    passenger: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+880 1XXX-XXXXXX",
      passportNumber: "AB1234567",
    },
    flight: {
      airline: "Biman Bangladesh Airlines",
      logo: "/placeholder.svg?height=60&width=60",
      flightNumber: "BG 178",
      departure: {
        time: "10:00",
        airport: "DAC",
        terminal: "T1",
        city: "Dhaka",
        date: "10 Jun, 2024",
      },
      arrival: {
        time: "12:30",
        airport: "DXB",
        terminal: "T3",
        city: "Dubai",
        date: "10 Jun, 2024",
      },
      class: "Economy",
      seat: "14A",
      baggage: {
        cabin: "7kg",
        checked: "30kg",
      },
      meal: "Regular",
      aircraft: "Boeing 777-300ER",
    },
    payment: {
      method: "Credit Card",
      amount: "৳50,000",
      date: "5 Jun, 2024",
      status: "Paid",
      cardLast4: "4321",
    },
    cancellationPolicy: "Refundable with 24 hours notice before departure. 20% cancellation fee applies.",
    checkInStatus: "Not checked in",
    checkInOpenDate: "9 Jun, 2024",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to bookings
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <p className="text-muted-foreground">Booking ID: {bookingDetails.bookingId}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-1">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="gap-1">
            <Download className="h-4 w-4" />
            Download E-Ticket
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight Details
              </CardTitle>
              <Badge className={bookingDetails.status === "Confirmed" ? "bg-green-500" : ""}>
                {bookingDetails.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src={bookingDetails.flight.logo || "/placeholder.svg"}
                      alt={bookingDetails.flight.airline}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{bookingDetails.flight.airline}</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingDetails.flight.flightNumber} • {bookingDetails.flight.class}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-4">
                  <div className="text-left md:w-1/3">
                    <p className="text-2xl font-bold">{bookingDetails.flight.departure.time}</p>
                    <p className="font-medium">{bookingDetails.flight.departure.airport}</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.flight.departure.city}</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.flight.departure.date}</p>
                    <p className="text-sm text-muted-foreground">Terminal {bookingDetails.flight.departure.terminal}</p>
                  </div>

                  <div className="flex flex-col items-center md:w-1/3">
                    <div className="relative w-20 md:w-full max-w-[200px]">
                      <Separator className="my-2" />
                      <Plane className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 -rotate-45" />
                    </div>
                  </div>

                  <div className="text-left md:text-right md:w-1/3">
                    <p className="text-2xl font-bold">{bookingDetails.flight.arrival.time}</p>
                    <p className="font-medium">{bookingDetails.flight.arrival.airport}</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.flight.arrival.city}</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.flight.arrival.date}</p>
                    <p className="text-sm text-muted-foreground">Terminal {bookingDetails.flight.arrival.terminal}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Seat</p>
                    <p className="font-medium">{bookingDetails.flight.seat}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Class</p>
                    <p className="font-medium">{bookingDetails.flight.class}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Aircraft</p>
                    <p className="font-medium">{bookingDetails.flight.aircraft}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Meal</p>
                    <p className="font-medium">{bookingDetails.flight.meal}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cabin Baggage</p>
                    <p className="font-medium">{bookingDetails.flight.baggage.cabin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Checked Baggage</p>
                    <p className="font-medium">{bookingDetails.flight.baggage.checked}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Passenger Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{bookingDetails.passenger.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{bookingDetails.passenger.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{bookingDetails.passenger.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Passport Number</p>
                  <p className="font-medium">{bookingDetails.passenger.passportNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{bookingDetails.payment.method}</p>
                  {bookingDetails.payment.cardLast4 && (
                    <p className="text-sm text-muted-foreground">Card ending in {bookingDetails.payment.cardLast4}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">{bookingDetails.payment.amount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Date</p>
                  <p className="font-medium">{bookingDetails.payment.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-green-600">{bookingDetails.payment.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Status</p>
                  <Badge variant="outline">{bookingDetails.checkInStatus}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Check-in opens</p>
                  <p className="font-medium">{bookingDetails.checkInOpenDate}</p>
                </div>
                <Button className="w-full" disabled={bookingDetails.checkInStatus !== "Not checked in"}>
                  {bookingDetails.checkInStatus === "Not checked in" ? "Check-in Online" : "Already Checked-in"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Flight
              </Button>
              <Button variant="outline" className="w-full">
                Select Seat
              </Button>
              <Button variant="outline" className="w-full">
                Add Baggage
              </Button>
              <Button variant="outline" className="w-full">
                Add Meal
              </Button>
              <Separator />
              <Button variant="destructive" className="w-full">
                Cancel Booking
              </Button>

              <div className="pt-4 text-sm text-muted-foreground">
                <p className="font-medium mb-1">Cancellation Policy:</p>
                <p>{bookingDetails.cancellationPolicy}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

