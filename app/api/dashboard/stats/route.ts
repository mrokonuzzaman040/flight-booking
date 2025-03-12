import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import mongoose from "mongoose"

// Define schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
  status: String,
})

const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  airline: String,
  from: String,
  to: String,
  departureDate: Date,
  departureTime: String,
  arrivalDate: Date,
  arrivalTime: String,
  price: Number,
  status: String,
})

const BookingSchema = new mongoose.Schema({
  bookingId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  bookingDate: Date,
  totalAmount: Number,
  status: String,
  paymentStatus: String,
})

// Create models
const User = mongoose.models.User || mongoose.model("User", UserSchema)
const Flight = mongoose.models.Flight || mongoose.model("Flight", FlightSchema)
const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema)

export async function GET() {
  try {
    await connectToDatabase()

    // Get total bookings
    const totalBookings = await Booking.countDocuments()

    // Get total revenue
    const revenueAggregation = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ])
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0

    // Get active users
    const activeUsers = await User.countDocuments({ status: "active" })

    // Get active flights
    const activeFlights = await Flight.countDocuments({ status: "Scheduled" })

    // Get revenue data for chart
    const currentDate = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6)

    const revenueData = await Booking.aggregate([
      {
        $match: {
          bookingDate: { $gte: sixMonthsAgo },
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: { $month: "$bookingDate" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          name: {
            $let: {
              vars: {
                monthsInString: [
                  "",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
              in: { $arrayElemAt: ["$$monthsInString", "$_id"] },
            },
          },
          revenue: 1,
        },
      },
    ])

    // Get top destinations
    const topDestinations = await Booking.aggregate([
      {
        $lookup: {
          from: "flights",
          localField: "flight",
          foreignField: "_id",
          as: "flightDetails",
        },
      },
      {
        $unwind: "$flightDetails",
      },
      {
        $group: {
          _id: "$flightDetails.to",
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: { bookings: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          code: "$_id",
          bookings: 1,
          percentage: { $multiply: [{ $divide: ["$bookings", totalBookings] }, 100] },
          trend: {
            $cond: {
              if: { $gt: [{ $rand: {} }, 0.5] },
              then: "up",
              else: "down",
            },
          },
        },
      },
    ])

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ bookingDate: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate("flight", "flightNumber airline from to departureDate")

    const formattedRecentBookings = recentBookings.map((booking) => ({
      id: booking._id.toString(),
      bookingId: booking.bookingId,
      customerName: booking.user?.name || "Unknown",
      customerEmail: booking.user?.email || "Unknown",
      flightNumber: booking.flight?.flightNumber || "Unknown",
      airline: booking.flight?.airline || "Unknown",
      from: booking.flight?.from || "Unknown",
      to: booking.flight?.to || "Unknown",
      departureDate: booking.flight?.departureDate || new Date(),
      amount: booking.totalAmount,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
    }))

    return NextResponse.json({
      success: true,
      stats: {
        totalBookings,
        totalRevenue,
        activeUsers,
        activeFlights,
        revenueData,
        topDestinations,
        recentBookings: formattedRecentBookings,
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}

