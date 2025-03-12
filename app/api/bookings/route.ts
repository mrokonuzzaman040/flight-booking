import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Booking from "@/models/Booking"
import Flight from "@/models/Flight"
import { getCurrentUser, requireAuth, verifyAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(req)
    if (authError) return authError

    await dbConnect()

    const url = new URL(req.url)
    const auth = await verifyAuth(req)

    // Parse query parameters
    const status = url.searchParams.get("status")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const page = Number.parseInt(url.searchParams.get("page") || "1")

    // Build query
    const query: any = {}

    // If not admin, only show user's own bookings
    if (auth?.role !== "admin") {
      const user = await getCurrentUser()
      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
      }
      query.user = user._id
    }

    if (status) query.status = status

    // Execute query with pagination
    const skip = (page - 1) * limit

    const bookings = await Booking.find(query)
      .populate("flight")
      .populate("user", "name email phone")
      .sort({ bookingDate: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Booking.countDocuments(query)

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(req)
    if (authError) return authError

    await dbConnect()

    const bookingData = await req.json()

    // Validate required fields
    const requiredFields = ["flight", "passengers", "totalAmount", "contactEmail", "contactPhone"]

    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 })
      }
    }

    // Get current user
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if flight exists and has available seats
    const flight = await Flight.findById(bookingData.flight)

    if (!flight) {
      return NextResponse.json({ success: false, message: "Flight not found" }, { status: 404 })
    }

    // Count seats by class
    const economyPassengers = bookingData.passengers.filter((p: any) => p.class === "Economy").length
    const businessPassengers = bookingData.passengers.filter((p: any) => p.class === "Business").length
    const firstClassPassengers = bookingData.passengers.filter((p: any) => p.class === "First").length

    // Check seat availability
    if (economyPassengers > flight.availableEconomySeats) {
      return NextResponse.json({ success: false, message: "Not enough economy seats available" }, { status: 400 })
    }

    if (businessPassengers > flight.availableBusinessSeats) {
      return NextResponse.json({ success: false, message: "Not enough business seats available" }, { status: 400 })
    }

    if (firstClassPassengers > flight.availableFirstClassSeats) {
      return NextResponse.json({ success: false, message: "Not enough first class seats available" }, { status: 400 })
    }

    // Create booking
    const booking = await Booking.create({
      ...bookingData,
      user: user._id,
      status: "Pending",
      paymentStatus: "Unpaid",
    })

    // Update available seats
    flight.availableEconomySeats -= economyPassengers
    flight.availableBusinessSeats -= businessPassengers
    flight.availableFirstClassSeats -= firstClassPassengers
    await flight.save()

    // Populate flight details for response
    await booking.populate("flight")

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      booking,
    })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

