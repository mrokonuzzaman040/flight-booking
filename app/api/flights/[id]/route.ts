import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Flight from "@/models/Flight"
import { requireAuth } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const flight = await Flight.findById(params.id)

    if (!flight) {
      return NextResponse.json({ success: false, message: "Flight not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      flight,
    })
  } catch (error) {
    console.error("Get flight error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin"])
    if (authError) return authError

    await dbConnect()

    const flightData = await req.json()

    // Find flight
    const flight = await Flight.findById(params.id)

    if (!flight) {
      return NextResponse.json({ success: false, message: "Flight not found" }, { status: 404 })
    }

    // Update flight
    Object.keys(flightData).forEach((key) => {
      if (key !== "_id" && key !== "__v") {
        flight[key] = flightData[key]
      }
    })

    await flight.save()

    return NextResponse.json({
      success: true,
      message: "Flight updated successfully",
      flight,
    })
  } catch (error) {
    console.error("Update flight error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin"])
    if (authError) return authError

    await dbConnect()

    // Find and delete flight
    const flight = await Flight.findByIdAndDelete(params.id)

    if (!flight) {
      return NextResponse.json({ success: false, message: "Flight not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Flight deleted successfully",
    })
  } catch (error) {
    console.error("Delete flight error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

