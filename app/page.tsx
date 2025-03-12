import type { Metadata } from "next"
import Link from "next/link"
import { Search, Plane, Calendar, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { PopularAirlines } from "@/components/popular-airlines"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"

export const metadata: Metadata = {
  title: "Home",
  description: "A production-ready Next.js application optimized for Vercel deployment",
}

// This page uses Static Site Generation for optimal performance
export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <div className="container px-4 py-12 mx-auto -mt-24 relative z-10">
        <Card className="border shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="roundtrip" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
                <TabsTrigger value="oneway">One Way</TabsTrigger>
                <TabsTrigger value="multicity">Multi City</TabsTrigger>
              </TabsList>

              <TabsContent value="roundtrip" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-3 h-4 w-4 rotate-45 text-muted-foreground" />
                      <Select>
                        <SelectTrigger id="from" className="pl-10">
                          <SelectValue placeholder="Dhaka (DAC)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dac">Dhaka (DAC)</SelectItem>
                          <SelectItem value="cxb">Cox's Bazar (CXB)</SelectItem>
                          <SelectItem value="cgp">Chittagong (CGP)</SelectItem>
                          <SelectItem value="zyl">Sylhet (ZYL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-3 h-4 w-4 -rotate-45 text-muted-foreground" />
                      <Select>
                        <SelectTrigger id="to" className="pl-10">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dxb">Dubai (DXB)</SelectItem>
                          <SelectItem value="kul">Kuala Lumpur (KUL)</SelectItem>
                          <SelectItem value="bkk">Bangkok (BKK)</SelectItem>
                          <SelectItem value="sin">Singapore (SIN)</SelectItem>
                          <SelectItem value="ccu">Kolkata (CCU)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Departure - Return</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal pl-10 relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <span>Pick dates</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent mode="range" numberOfMonths={2} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Passengers & Class</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal pl-10 relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <span>1 Adult, Economy</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4" align="start">
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label>Adults</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">1</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Children</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">0</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Infants</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">0</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Class</Label>
                            <RadioGroup defaultValue="economy">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="economy" id="economy" />
                                <Label htmlFor="economy">Economy</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business" id="business" />
                                <Label htmlFor="business">Business</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="first" id="first" />
                                <Label htmlFor="first">First Class</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <Button className="w-full">Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button asChild className="w-full md:w-auto" size="lg">
                  <Link href="/search-results">
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Link>
                </Button>
              </TabsContent>

              <TabsContent value="oneway" className="space-y-4">
                {/* Similar structure as roundtrip but without return date */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-oneway">From</Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-3 h-4 w-4 rotate-45 text-muted-foreground" />
                      <Select>
                        <SelectTrigger id="from-oneway" className="pl-10">
                          <SelectValue placeholder="Dhaka (DAC)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dac">Dhaka (DAC)</SelectItem>
                          <SelectItem value="cxb">Cox's Bazar (CXB)</SelectItem>
                          <SelectItem value="cgp">Chittagong (CGP)</SelectItem>
                          <SelectItem value="zyl">Sylhet (ZYL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to-oneway">To</Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-3 h-4 w-4 -rotate-45 text-muted-foreground" />
                      <Select>
                        <SelectTrigger id="to-oneway" className="pl-10">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dxb">Dubai (DXB)</SelectItem>
                          <SelectItem value="kul">Kuala Lumpur (KUL)</SelectItem>
                          <SelectItem value="bkk">Bangkok (BKK)</SelectItem>
                          <SelectItem value="sin">Singapore (SIN)</SelectItem>
                          <SelectItem value="ccu">Kolkata (CCU)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal pl-10 relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <span>Pick a date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Passengers & Class</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal pl-10 relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <span>1 Adult, Economy</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4" align="start">
                        {/* Same content as in roundtrip */}
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label>Adults</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">1</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Children</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">0</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Infants</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">0</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Class</Label>
                            <RadioGroup defaultValue="economy">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="economy" id="economy-oneway" />
                                <Label htmlFor="economy-oneway">Economy</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business" id="business-oneway" />
                                <Label htmlFor="business-oneway">Business</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="first" id="first-oneway" />
                                <Label htmlFor="first-oneway">First Class</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <Button className="w-full">Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button asChild className="w-full md:w-auto" size="lg">
                  <Link href="/search-results">
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Link>
                </Button>
              </TabsContent>

              <TabsContent value="multicity" className="space-y-4">
                {/* Simplified multi-city form */}
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="from-multi-1">From</Label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-3 h-4 w-4 rotate-45 text-muted-foreground" />
                        <Select>
                          <SelectTrigger id="from-multi-1" className="pl-10">
                            <SelectValue placeholder="Dhaka (DAC)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dac">Dhaka (DAC)</SelectItem>
                            <SelectItem value="cxb">Cox's Bazar (CXB)</SelectItem>
                            <SelectItem value="cgp">Chittagong (CGP)</SelectItem>
                            <SelectItem value="zyl">Sylhet (ZYL)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to-multi-1">To</Label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-3 h-4 w-4 -rotate-45 text-muted-foreground" />
                        <Select>
                          <SelectTrigger id="to-multi-1" className="pl-10">
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dxb">Dubai (DXB)</SelectItem>
                            <SelectItem value="kul">Kuala Lumpur (KUL)</SelectItem>
                            <SelectItem value="bkk">Bangkok (BKK)</SelectItem>
                            <SelectItem value="sin">Singapore (SIN)</SelectItem>
                            <SelectItem value="ccu">Kolkata (CCU)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Departure Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-10 relative"
                          >
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <span>Pick a date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="from-multi-2">From</Label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-3 h-4 w-4 rotate-45 text-muted-foreground" />
                        <Select>
                          <SelectTrigger id="from-multi-2" className="pl-10">
                            <SelectValue placeholder="Select origin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dxb">Dubai (DXB)</SelectItem>
                            <SelectItem value="kul">Kuala Lumpur (KUL)</SelectItem>
                            <SelectItem value="bkk">Bangkok (BKK)</SelectItem>
                            <SelectItem value="sin">Singapore (SIN)</SelectItem>
                            <SelectItem value="ccu">Kolkata (CCU)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to-multi-2">To</Label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-3 h-4 w-4 -rotate-45 text-muted-foreground" />
                        <Select>
                          <SelectTrigger id="to-multi-2" className="pl-10">
                            <SelectValue placeholder="Dhaka (DAC)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dac">Dhaka (DAC)</SelectItem>
                            <SelectItem value="cxb">Cox's Bazar (CXB)</SelectItem>
                            <SelectItem value="cgp">Chittagong (CGP)</SelectItem>
                            <SelectItem value="zyl">Sylhet (ZYL)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Departure Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-10 relative"
                          >
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <span>Pick a date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full md:w-auto">
                    + Add another flight
                  </Button>

                  <div className="space-y-2">
                    <Label>Passengers & Class</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full md:w-auto justify-start text-left font-normal pl-10 relative"
                        >
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <span>1 Adult, Economy</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4" align="start">
                        {/* Same content as in other tabs */}
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label>Adults</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">1</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Children</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">0</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Infants</Label>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  -
                                </Button>
                                <span className="w-8 text-center">0</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Class</Label>
                            <RadioGroup defaultValue="economy">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="economy" id="economy-multi" />
                                <Label htmlFor="economy-multi">Economy</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business" id="business-multi" />
                                <Label htmlFor="business-multi">Business</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="first" id="first-multi" />
                                <Label htmlFor="first-multi">First Class</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <Button className="w-full">Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button asChild className="w-full md:w-auto" size="lg">
                  <Link href="/search-results">
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Link>
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <FeaturedDestinations />
        <PopularAirlines />
      </div>

      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Production-Ready Features</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This application includes everything you need for a production deployment on Vercel
          </p>
        </div>

        <Features />
      </section>

      <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimized</CardTitle>
              <CardDescription>Built with SSR and SSG for optimal loading times</CardDescription>
            </CardHeader>
            <CardContent>
              Leverages Next.js App Router with React Server Components for improved performance and reduced client-side
              JavaScript.
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/docs/performance">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security First</CardTitle>
              <CardDescription>Implements security best practices</CardDescription>
            </CardHeader>
            <CardContent>
              Includes security headers, input validation, authentication patterns, and protection against common
              vulnerabilities.
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/docs/security">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scalable Architecture</CardTitle>
              <CardDescription>Designed to scale with your application</CardDescription>
            </CardHeader>
            <CardContent>
              Modular architecture with efficient caching strategies and optimized data fetching for handling high
              traffic loads.
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/docs/scalability">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}

