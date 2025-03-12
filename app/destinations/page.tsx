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

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get<Destination[]>("/destinations")

        if (response.success && response.data) {
          setDestinations(response.data)
        } else {
          setError(response.error || "Failed to fetch destinations")
        }
      } catch (err) {
        setError("An error occurred while fetching destinations")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse mb-4 w-1/2" />
                <div className="h-16 bg-gray-200 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>
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
                <p className="text-gray-500 mb-2">{destination.country}</p>
                <p className="text-sm text-gray-700">{destination.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

