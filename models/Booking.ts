import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IPassenger {
  title: string
  firstName: string
  lastName: string
  dob: Date
  nationality: string
  passportNumber: string
  passportExpiry: Date
  seatNumber?: string
  class: "Economy" | "Business" | "First"
}

export interface IBooking extends Document {
  bookingId: string
  user: mongoose.Types.ObjectId
  flight: mongoose.Types.ObjectId
  passengers: IPassenger[]
  bookingDate: Date
  totalAmount: number
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
  paymentStatus: "Unpaid" | "Paid" | "Refunded"
  paymentMethod?: string
  paymentDate?: Date
  contactEmail: string
  contactPhone: string
}

const PassengerSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    enum: ["Mr", "Mrs", "Ms", "Dr"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  dob: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  nationality: {
    type: String,
    required: [true, "Please provide nationality"],
  },
  passportNumber: {
    type: String,
    required: [true, "Please provide passport number"],
  },
  passportExpiry: {
    type: Date,
    required: [true, "Please provide passport expiry date"],
  },
  seatNumber: {
    type: String,
  },
  class: {
    type: String,
    enum: ["Economy", "Business", "First"],
    default: "Economy",
  },
})

const BookingSchema: Schema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    flight: {
      type: Schema.Types.ObjectId,
      ref: "Flight",
      required: [true, "Please provide a flight"],
    },
    passengers: {
      type: [PassengerSchema],
      required: [true, "Please provide at least one passenger"],
      validate: {
        validator: (passengers: IPassenger[]) => passengers.length > 0,
        message: "At least one passenger is required",
      },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: [true, "Please provide total amount"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Refunded"],
      default: "Unpaid",
    },
    paymentMethod: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
    contactEmail: {
      type: String,
      required: [true, "Please provide contact email"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    contactPhone: {
      type: String,
      required: [true, "Please provide contact phone"],
    },
  },
  {
    timestamps: true,
  },
)

// Generate a unique booking ID before saving
BookingSchema.pre("save", async function (next) {
  if (this.isNew) {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")

    // Get the count of bookings for today to generate a sequential number
    const Booking = mongoose.model("Booking")
    const count = await Booking.countDocuments({
      createdAt: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    })

    // Format: AB-YYMMDD-XXXX (where XXXX is a sequential number)
    this.bookingId = `AB-${year}${month}${day}-${(count + 1).toString().padStart(4, "0")}`
  }
  next()
})

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema)

export default Booking

