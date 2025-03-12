"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Filter, Plane, Clock, Luggage } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
  status: string
  [key: string]: any
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])

  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const departureDate = searchParams.get("departureDate")

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true)
      try {
        const params: Record<string, string> = {}
        if (from) params.from = from
        if (to) params.to = to
        if (departureDate) params.departureDate = departureDate

        const response = await apiClient.get<Flight[]>("/flights", params)
        if (response.success && response.flights) {
          setFlights(response.flights)
          setFilteredFlights(response.flights)

          // Set price range based on available flights
          if (response.flights.length > 0) {
            const prices = response.flights.map((flight) => flight.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            setPriceRange([minPrice, maxPrice])
          }
        }
      } catch (error) {
        console.error("Error fetching flights:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [from, to, departureDate])

  useEffect(() => {
    // Apply filters
    let filtered = [...flights]

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((flight) => flight.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Price filter
    filtered = filtered.filter((flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1])

    setFilteredFlights(filtered)
  }, [flights, statusFilter, priceRange])

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "default"
      case "delayed":
        return "warning"
      case "cancelled":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to search
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-4 space-y-6">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <Skeleton className="h-16 w-full" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Filters</h3>
              <Accordion type="multiple" defaultValue={["stops", "airlines", "price"]}>
                <AccordionItem value="stops">
                  <AccordionTrigger>Stops</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="direct" />
                        <Label htmlFor="direct">Direct</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="1-stop" />
                        <Label htmlFor="1-stop">1 Stop</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="2-stops" />
                        <Label htmlFor="2-stops">2+ Stops</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="airlines">
                  <AccordionTrigger>Airlines</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="biman" />
                        <Label htmlFor="biman">Biman Bangladesh</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="emirates" />
                        <Label htmlFor="emirates">Emirates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="qatar" />
                        <Label htmlFor="qatar">Qatar Airways</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="us-bangla" />
                        <Label htmlFor="us-bangla">US-Bangla Airlines</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider defaultValue={priceRange} max={100000} step={1000} onValueChange={setPriceRange} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">৳{priceRange[0]}</span>
                        <span className="text-sm">৳{priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="times">
                  <AccordionTrigger>Departure Times</AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup defaultValue="any">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="any-time" />
                        <Label htmlFor="any-time">Any Time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">Morning (6AM - 12PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">Afternoon (12PM - 6PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">Evening (After 6PM)</Label>
                      </div>
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Accordion type="multiple" defaultValue={["stops", "airlines", "price"]}>
                  <AccordionItem value="stops">
                    <AccordionTrigger>Stops</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="direct-mobile" />
                          <Label htmlFor="direct-mobile">Direct</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="1-stop-mobile" />
                          <Label htmlFor="1-stop-mobile">1 Stop</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="2-stops-mobile" />
                          <Label htmlFor="2-stops-mobile">2+ Stops</Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="airlines">
                    <AccordionTrigger>Airlines</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="biman-mobile" />
                          <Label htmlFor="biman-mobile">Biman Bangladesh</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="emirates-mobile" />
                          <Label htmlFor="emirates-mobile">Emirates</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="qatar-mobile" />
                          <Label htmlFor="qatar-mobile">Qatar Airways</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="us-bangla-mobile" />
                          <Label htmlFor="us-bangla-mobile">US-Bangla Airlines</Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider defaultValue={priceRange} max={100000} step={1000} onValueChange={setPriceRange} />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">৳{priceRange[0]}</span>
                          <span className="text-sm">৳{priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="mt-4">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Flight Results */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {from || "Origin"} to {to || "Destination"}
            </h1>
            <p className="text-muted-foreground">
              {departureDate ? new Date(departureDate).toLocaleDateString() : "Select date"} • 1 Adult • Economy
            </p>
          </div>

          <div className="space-y-4">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <Card key={flight._id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        {/* Airline Info */}
                        <div className="flex items-center gap-3 md:w-1/4">
                          <div className="relative h-10 w-10 shrink-0">
                            <Image
                              src="/placeholder.svg?height=60&width=60"
                              alt={flight.airline}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{flight.airline}</p>
                            <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                          </div>
                        </div>

                        {/* Flight Times */}
                        <div className="flex flex-1 items-center justify-between md:justify-center gap-2 md:gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold">{flight.departureTime}</p>
                            <p className="text-sm font-medium">{flight.from}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(flight.departureDate).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex flex-col items-center">
                            <p className="text-xs text-muted-foreground">{flight.duration}</p>
                            <div className="relative w-20 md:w-32">
                              <Separator className="my-2" />
                              <Plane className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 -rotate-45" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {flight.stops === 0 ? "Direct" : `${flight.stops} Stop`}
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-lg font-bold">{flight.arrivalTime}</p>
                            <p className="text-sm font-medium">{flight.to}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(flight.arrivalDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Price and Book */}
                        <div className="flex flex-col md:items-end gap-2 md:w-1/4">
                          <Badge variant={getStatusBadgeVariant(flight.status)} className="self-start md:self-end">
                            {flight.status}
                          </Badge>
                          <p className="text-xl font-bold">৳{flight.price}</p>
                          <Button asChild>
                            <Link href={`/flight-details/${flight._id}`}>
                              Select
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Flight Details */}
                      {flight.stops > 0 && flight.stopDetails && (
                        <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{flight.stopDetails}</span>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Luggage className="h-4 w-4" />
                          <span>Baggage: {flight.baggage?.checked || "30kg"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Plane className="h-4 w-4" />
                          <span>Aircraft: {flight.aircraft}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-lg font-medium">No flights found</p>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

