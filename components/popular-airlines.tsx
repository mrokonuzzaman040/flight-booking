import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function PopularAirlines() {
  const airlines = [
    {
      id: 1,
      name: "Biman Bangladesh Airlines",
      logo: "/placeholder.svg?height=100&width=100",
      flights: "120+ flights daily",
    },
    {
      id: 2,
      name: "US-Bangla Airlines",
      logo: "/placeholder.svg?height=100&width=100",
      flights: "80+ flights daily",
    },
    {
      id: 3,
      name: "Novo Air",
      logo: "/placeholder.svg?height=100&width=100",
      flights: "40+ flights daily",
    },
    {
      id: 4,
      name: "Emirates",
      logo: "/placeholder.svg?height=100&width=100",
      flights: "10+ flights daily",
    },
    {
      id: 5,
      name: "Qatar Airways",
      logo: "/placeholder.svg?height=100&width=100",
      flights: "8+ flights daily",
    },
    {
      id: 6,
      name: "Singapore Airlines",
      logo: "/placeholder.svg?height=100&width=100",
      flights: "5+ flights daily",
    },
  ]

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Popular Airlines</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {airlines.map((airline) => (
          <Card key={airline.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="relative h-16 w-16 mb-3">
                <Image src={airline.logo || "/placeholder.svg"} alt={airline.name} fill className="object-contain" />
              </div>
              <h3 className="font-medium text-sm">{airline.name}</h3>
              <p className="text-xs text-muted-foreground">{airline.flights}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

