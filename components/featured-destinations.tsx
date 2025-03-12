"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client"

interface Destination {
  _id: string
  code: string
  name: string
  country: string
  description: string
  image: string
  popular: boolean
}

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get<Destination[]>("/destinations")

        if (response.success && response.data) {
          // Filter only popular destinations and limit to 6
          const popularDestinations = response.data.filter((dest) => dest.popular).slice(0, 6)

          setDestinations(popularDestinations)
        }
      } catch (err) {
        console.error("Error fetching featured destinations:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse mb-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (destinations.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Link href={`/search-results?from=DAC&to=${destination.code}`} key={destination._id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={destination.image || `/placeholder.svg?height=192&width=384`}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold">{destination.name}</h2>
                  <p className="text-gray-500">{destination.country}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

