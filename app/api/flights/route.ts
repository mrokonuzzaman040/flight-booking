import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Flight from "@/models/Flight"
import { requireAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const url = new URL(req.url)

    // Parse query parameters
    const from = url.searchParams.get("from")
    const to = url.searchParams.get("to")
    const departureDate = url.searchParams.get("departureDate")
    const status = url.searchParams.get("status")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const page = Number.parseInt(url.searchParams.get("page") || "1")

    // Build query
    const query: any = {}

    if (from) query.from = from
    if (to) query.to = to
    if (status) query.status = status

    if (departureDate) {
      const date = new Date(departureDate)
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)

      query.departureDate = {
        $gte: date,
        $lt: nextDay,
      }
    }

    // Execute query with pagination
    const skip = (page - 1) * limit

    const flights = await Flight.find(query).sort({ departureDate: 1, departureTime: 1 }).skip(skip).limit(limit)

    const total = await Flight.countDocuments(query)

    return NextResponse.json({
      success: true,
      flights,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get flights error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin"])
    if (authError) return authError

    await dbConnect()

    const flightData = await req.json()

    // Validate required fields
    const requiredFields = [
      "flightNumber",
      "airline",
      "from",
      "to",
      "departureDate",
      "departureTime",
      "arrivalDate",
      "arrivalTime",
      "price",
      "aircraft",
      "capacity",
      "economySeats",
      "businessSeats",
      "firstClassSeats",
    ]

    for (const field of requiredFields) {
      if (!flightData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 })
      }
    }

    // Check if flight number already exists
    const existingFlight = await Flight.findOne({ flightNumber: flightData.flightNumber })

    if (existingFlight) {
      return NextResponse.json({ success: false, message: "Flight number already exists" }, { status: 409 })
    }

    // Calculate duration if not provided
    if (!flightData.duration) {
      const departureDateTime = new Date(`${flightData.departureDate}T${flightData.departureTime}`)
      const arrivalDateTime = new Date(`${flightData.arrivalDate}T${flightData.arrivalTime}`)

      const durationMs = arrivalDateTime.getTime() - departureDateTime.getTime()
      const hours = Math.floor(durationMs / (1000 * 60 * 60))
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

      flightData.duration = `${hours}h ${minutes}m`
    }

    // Create new flight
    const flight = await Flight.create(flightData)

    return NextResponse.json({
      success: true,
      message: "Flight created successfully",
      flight,
    })
  } catch (error) {
    console.error("Create flight error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

