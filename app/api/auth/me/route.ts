import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { getCurrentUser, requireAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(req)
    if (authError) return authError

    await dbConnect()

    // Get current user
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        registeredDate: user.registeredDate,
        nationality: user.nationality,
        passportNumber: user.passportNumber,
        passportExpiry: user.passportExpiry,
        address: user.address,
        preferredSeat: user.preferredSeat,
        mealPreference: user.mealPreference,
      },
    })
  } catch (error) {
    console.error("Get current user error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

