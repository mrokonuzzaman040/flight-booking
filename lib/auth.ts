import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt, { type JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose"
import { connectToDatabase } from "@/lib/mongodb"

// Define schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
})

// Create model
const User = mongoose.models.User || mongoose.model("User", UserSchema)

interface User {
  _id: string
  name: string
  email: string
  role: string
}

export async function checkAuth() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return { user: null, error: "No authentication token" }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as JwtPayload

    if (!decoded || !decoded.userId || !decoded.email) {
      return { user: null, error: "Invalid token" }
    }

    return {
      user: {
        id: decoded.userId,
        name: decoded.name || "User",
        email: decoded.email,
        role: decoded.role || "user",
      },
      error: null,
    }
  } catch (error) {
    return { user: null, error: "Authentication failed" }
  }
}

export async function verifyAuth(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as JwtPayload

    if (!decoded || !decoded.userId || !decoded.email) {
      return null
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role || "user",
    }
  } catch (error) {
    return null
  }
}

export async function requireAuth(req: NextRequest, roles: string[] = []) {
  const auth = await verifyAuth(req)

  if (!auth) {
    return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
  }

  if (roles.length > 0 && !roles.includes(auth.role)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 })
  }

  return null
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as JwtPayload

    if (!decoded || !decoded.userId || !decoded.email) {
      return null
    }

    await connectToDatabase()
    const user = await User.findById(decoded.userId)

    if (!user) {
      return null
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    return null
  }
}

