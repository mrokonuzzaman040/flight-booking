import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { requireAuth, verifyAuth } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const authError = await requireAuth(req)
    if (authError) return authError

    await dbConnect()

    const auth = await verifyAuth(req)

    // Only allow users to view their own profile unless admin/support
    if (auth?.role !== "admin" && auth?.role !== "support" && params.id !== auth?.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized to view this user" }, { status: 403 })
    }

    // Find user
    const user = await User.findById(params.id).select("-password")

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Get user error:", error)
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

    // Only allow users to update their own profile unless admin
    if (auth?.role !== "admin" && params.id !== auth?.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized to update this user" }, { status: 403 })
    }

    // Regular users can't change their role or status
    if (auth?.role !== "admin") {
      delete updateData.role
      delete updateData.status
    }

    // Find user
    const user = await User.findById(params.id)

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Update user
    Object.keys(updateData).forEach((key) => {
      if (key !== "_id" && key !== "__v" && key !== "password") {
        user[key] = updateData[key]
      }
    })

    // Handle password update separately
    if (updateData.password) {
      user.password = updateData.password
    }

    await user.save()

    // Return updated user (excluding password)
    const updatedUser = await User.findById(user._id).select("-password")

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const authError = await requireAuth(req, ["admin"])
    if (authError) return authError

    await dbConnect()

    // Find and delete user
    const user = await User.findByIdAndDelete(params.id)

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

