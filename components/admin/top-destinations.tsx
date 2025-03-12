"use client"

import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"

interface TopDestination {
  code: string
  bookings: number
  percentage: number
  trend: "up" | "down"
}

interface TopDestinationsProps {
  data: TopDestination[]
}

export function TopDestinations({ data }: TopDestinationsProps) {
  return (
    <div className="space-y-8">
      {data.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No destination data available</div>
      ) : (
        data.map((destination) => (
          <div key={destination.code} className="flex items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">{destination.code}</div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{destination.code}</p>
                <p className="text-sm text-muted-foreground">{destination.bookings} bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">{destination.percentage}%</div>
              <div>
                {destination.trend === "up" ? (
                  <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                ) : destination.trend === "down" ? (
                  <ArrowDownIcon className="h-4 w-4 text-rose-500" />
                ) : (
                  <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

