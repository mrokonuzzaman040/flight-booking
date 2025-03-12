import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Download, Plane, User, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function BookingConfirmation() {
  const bookingDetails = {
    bookingId: "BG78945612",
    passenger: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+880 1XXX-XXXXXX",
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
    },
    payment: {
      method: "Credit Card",
      amount: "৳50,000",
      date: "5 Jun, 2024",
      status: "Confirmed",
    },
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Your flight has been booked successfully. Booking ID:{" "}
            <span className="font-semibold">{bookingDetails.bookingId}</span>
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Flight Details
            </CardTitle>
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

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Seat</p>
                  <p className="font-medium">{bookingDetails.flight.seat}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="font-medium">{bookingDetails.flight.class}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Passenger Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{bookingDetails.passenger.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{bookingDetails.passenger.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{bookingDetails.passenger.phone}</p>
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="font-medium">{bookingDetails.payment.method}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">{bookingDetails.payment.amount}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{bookingDetails.payment.date}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-green-600">{bookingDetails.payment.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download E-Ticket
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

