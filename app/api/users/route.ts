import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { requireAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin", "support"])
    if (authError) return authError

    await dbConnect()

    const url = new URL(req.url)

    // Parse query parameters
    const role = url.searchParams.get("role")
    const status = url.searchParams.get("status")
    const search = url.searchParams.get("search")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const page = Number.parseInt(url.searchParams.get("page") || "1")

    // Build query
    const query: any = {}

    if (role) query.role = role
    if (status) query.status = status

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ]
    }

    // Execute query with pagination
    const skip = (page - 1) * limit

    const users = await User.find(query).select("-password").sort({ registeredDate: -1 }).skip(skip).limit(limit)

    const total = await User.countDocuments(query)

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin"])
    if (authError) return authError

    await dbConnect()

    const userData = await req.json()

    // Validate required fields
    const requiredFields = ["name", "email", "password", "phone", "role"]

    for (const field of requiredFields) {
      if (!userData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 })
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email })

    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already in use" }, { status: 409 })
    }

    // Create new user
    const user = await User.create(userData)

    // Return user data (excluding password)
    const createdUser = await User.findById(user._id).select("-password")

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: createdUser,
    })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

