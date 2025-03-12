import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import mongoose from "mongoose"

// Define schema for destinations
const DestinationSchema = new mongoose.Schema({
  code: String,
  name: String,
  country: String,
  description: String,
  image: String,
  popular: Boolean,
})

// Create model
const Destination = mongoose.models.Destination || mongoose.model("Destination", DestinationSchema)

export async function GET() {
  try {
    await connectToDatabase()

    // Get all destinations
    const destinations = await Destination.find({})

    return NextResponse.json({
      success: true,
      data: destinations,
    })
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch destinations" }, { status: 500 })
  }
}

