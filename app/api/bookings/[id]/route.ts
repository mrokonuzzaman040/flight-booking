import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Booking from "@/models/Booking"
import Flight from "@/models/Flight"
import { requireAuth, verifyAuth } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const authError = await requireAuth(req)
    if (authError) return authError

    await dbConnect()

    const auth = await verifyAuth(req)

    // Find booking
    const booking = await Booking.findById(params.id).populate("flight").populate("user", "name email phone")

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    // Check if user has permission to view this booking
    if (auth?.role !== "admin" && booking.user._id.toString() !== auth?.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized to view this booking" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error("Get booking error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const authError = await requireAuth(req)
    if (authError) return authError

    await dbConnect()

    const auth = await verifyAuth(req)
    const updateData = await req.json()

    // Find booking
    const booking = await Booking.findById(params.id)

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    // Check if user has permission to update this booking
    if (auth?.role !== "admin" && booking.user.toString() !== auth?.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized to update this booking" }, { status: 403 })
    }

    // Handle status change
    if (updateData.status && updateData.status !== booking.status) {
      // If cancelling, return seats to flight
      if (updateData.status === "Cancelled" && booking.status !== "Cancelled") {
        const flight = await Flight.findById(booking.flight)

        if (flight) {
          // Count seats by class
          const economyPassengers = booking.passengers.filter((p) => p.class === "Economy").length
          const businessPassengers = booking.passengers.filter((p) => p.class === "Business").length
          const firstClassPassengers = booking.passengers.filter((p) => p.class === "First").length

          // Return seats
          flight.availableEconomySeats += economyPassengers
          flight.availableBusinessSeats += businessPassengers
          flight.availableFirstClassSeats += firstClassPassengers
          await flight.save()
        }
      }
    }

    // Update booking
    Object.keys(updateData).forEach((key) => {
      if (key !== "_id" && key !== "__v" && key !== "user" && key !== "flight") {
        booking[key] = updateData[key]
      }
    })

    await booking.save()

    // Populate for response
    await booking.populate("flight")
    await booking.populate("user", "name email phone")

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
      booking,
    })
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin"])
    if (authError) return authError

    await dbConnect()

    // Find booking
    const booking = await Booking.findById(params.id)

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    // Return seats to flight if booking is not cancelled
    if (booking.status !== "Cancelled") {
      const flight = await Flight.findById(booking.flight)

      if (flight) {
        // Count seats by class
        const economyPassengers = booking.passengers.filter((p) => p.class === "Economy").length
        const businessPassengers = booking.passengers.filter((p) => p.class === "Business").length
        const firstClassPassengers = booking.passengers.filter((p) => p.class === "First").length

        // Return seats
        flight.availableEconomySeats += economyPassengers
        flight.availableBusinessSeats += businessPassengers
        flight.availableFirstClassSeats += firstClassPassengers
        await flight.save()
      }
    }

    // Delete booking
    await Booking.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    })
  } catch (error) {
    console.error("Delete booking error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

