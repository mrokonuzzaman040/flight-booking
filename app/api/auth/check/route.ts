import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import mongoose from "mongoose"

// Define schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
})

// Create model
const User = mongoose.models.User || mongoose.model("User", UserSchema)

export async function GET() {
  try {
    // Use await with cookies()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret")

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // Get user from database
    await connectToDatabase()
    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if user is admin
    if (user.role !== "admin" && user.role !== "support") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 })
  }
}

