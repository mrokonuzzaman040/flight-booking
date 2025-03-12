"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plane, CreditCard, Wallet } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PassengerForm } from "@/components/passenger-form"
import { apiClient } from "@/lib/api-client"
import { Skeleton } from "@/components/ui/skeleton"

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
  stopDetails?: string
  price: number
  tax: number
  status: string
  aircraft: string
  baggage: {
    cabin: string
    checked: string
  }
  amenities: string[]
  refundable: boolean
  [key: string]: any
}

export default function FlightDetails() {
  const params = useParams()
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlight = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get<Flight>(`/flights/${params.id}`)
        if (response.success && response.flight) {
          setFlight(response.flight)
        }
      } catch (error) {
        console.error("Error fetching flight:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchFlight()
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search-results">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to results
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div>
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </main>
    )
  }

  if (!flight) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search-results">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to results
            </Link>
          </Button>
        </div>

        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Flight Not Found</h1>
          <p className="text-muted-foreground">The flight you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" asChild>
            <Link href="/search-results">Return to Search Results</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/search-results">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to results
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt={flight.airline}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{flight.airline}</p>
                    <p className="text-sm text-muted-foreground">{flight.flightNumber} • Economy</p>
                  </div>
                  {flight.refundable && (
                    <Badge variant="outline" className="ml-auto">
                      Refundable
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-4">
                  <div className="text-left md:w-1/3">
                    <p className="text-2xl font-bold">{flight.departureTime}</p>
                    <p className="font-medium">{flight.from}</p>
                    <p className="text-sm text-muted-foreground">{flight.from}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(flight.departureDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-center md:w-1/3">
                    <p className="text-sm text-muted-foreground">{flight.duration}</p>
                    <div className="relative w-20 md:w-full max-w-[200px]">
                      <Separator className="my-2" />
                      <Plane className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 -rotate-45" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {flight.stops === 0 ? "Direct Flight" : `${flight.stops} Stop`}
                    </p>
                  </div>

                  <div className="text-left md:text-right md:w-1/3">
                    <p className="text-2xl font-bold">{flight.arrivalTime}</p>
                    <p className="font-medium">{flight.to}</p>
                    <p className="text-sm text-muted-foreground">{flight.to}</p>
                    <p className="text-sm text-muted-foreground">{new Date(flight.arrivalDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="baggage">
                    <AccordionTrigger>Baggage Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="font-medium">Cabin Baggage</p>
                          <p className="text-sm text-muted-foreground">
                            {flight.baggage?.cabin || "7kg"} per passenger
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">Checked Baggage</p>
                          <p className="text-sm text-muted-foreground">
                            {flight.baggage?.checked || "30kg"} per passenger
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="amenities">
                    <AccordionTrigger>Amenities</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {flight.amenities?.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <p className="text-sm">{amenity}</p>
                          </div>
                        )) || (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <p className="text-sm">In-flight Entertainment</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <p className="text-sm">Meal</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <p className="text-sm">Wi-Fi</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <p className="text-sm">Power Outlets</p>
                            </div>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="aircraft">
                    <AccordionTrigger>Aircraft Details</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{flight.aircraft}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passenger Information</CardTitle>
            </CardHeader>
            <CardContent>
              <PassengerForm flightId={flight._id} />
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="sticky top-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Base Fare</span>
                    <span>৳{flight.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>৳{flight.tax || Math.round(flight.price * 0.1)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>৳{flight.price + (flight.tax || Math.round(flight.price * 0.1))}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/payment">Continue to Payment</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                      <CreditCard className="h-5 w-5 mb-1" />
                      <span className="text-xs">Credit Card</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                      <Wallet className="h-5 w-5 mb-1" />
                      <span className="text-xs">bKash</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                      <Wallet className="h-5 w-5 mb-1" />
                      <span className="text-xs">Nagad</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                      <Wallet className="h-5 w-5 mb-1" />
                      <span className="text-xs">Rocket</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

