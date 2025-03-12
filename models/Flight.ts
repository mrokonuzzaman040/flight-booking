import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IFlight extends Document {
  flightNumber: string
  airline: string
  from: string
  to: string
  departureDate: Date
  departureTime: string
  arrivalDate: Date
  arrivalTime: string
  duration: string
  stops: number
  stopDetails?: string
  price: number
  tax: number
  status: "Scheduled" | "Delayed" | "Cancelled" | "Completed"
  aircraft: string
  capacity: number
  economySeats: number
  businessSeats: number
  firstClassSeats: number
  availableEconomySeats: number
  availableBusinessSeats: number
  availableFirstClassSeats: number
  amenities: string[]
  baggage: {
    cabin: string
    checked: string
  }
  refundable: boolean
}

const FlightSchema: Schema = new Schema(
  {
    flightNumber: {
      type: String,
      required: [true, "Please provide a flight number"],
      unique: true,
      trim: true,
    },
    airline: {
      type: String,
      required: [true, "Please provide an airline"],
      trim: true,
    },
    from: {
      type: String,
      required: [true, "Please provide departure airport"],
      trim: true,
    },
    to: {
      type: String,
      required: [true, "Please provide arrival airport"],
      trim: true,
    },
    departureDate: {
      type: Date,
      required: [true, "Please provide departure date"],
    },
    departureTime: {
      type: String,
      required: [true, "Please provide departure time"],
    },
    arrivalDate: {
      type: Date,
      required: [true, "Please provide arrival date"],
    },
    arrivalTime: {
      type: String,
      required: [true, "Please provide arrival time"],
    },
    duration: {
      type: String,
      required: [true, "Please provide flight duration"],
    },
    stops: {
      type: Number,
      default: 0,
    },
    stopDetails: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please provide flight price"],
    },
    tax: {
      type: Number,
      required: [true, "Please provide tax amount"],
    },
    status: {
      type: String,
      enum: ["Scheduled", "Delayed", "Cancelled", "Completed"],
      default: "Scheduled",
    },
    aircraft: {
      type: String,
      required: [true, "Please provide aircraft type"],
    },
    capacity: {
      type: Number,
      required: [true, "Please provide total capacity"],
    },
    economySeats: {
      type: Number,
      required: [true, "Please provide number of economy seats"],
    },
    businessSeats: {
      type: Number,
      required: [true, "Please provide number of business seats"],
    },
    firstClassSeats: {
      type: Number,
      required: [true, "Please provide number of first class seats"],
    },
    availableEconomySeats: {
      type: Number,
    },
    availableBusinessSeats: {
      type: Number,
    },
    availableFirstClassSeats: {
      type: Number,
    },
    amenities: {
      type: [String],
      default: [],
    },
    baggage: {
      cabin: {
        type: String,
        default: "7kg",
      },
      checked: {
        type: String,
        default: "20kg",
      },
    },
    refundable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Set available seats equal to total seats when creating a new flight
FlightSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableEconomySeats = this.economySeats
    this.availableBusinessSeats = this.businessSeats
    this.availableFirstClassSeats = this.firstClassSeats
  }
  next()
})

const Flight: Model<IFlight> = mongoose.models.Flight || mongoose.model<IFlight>("Flight", FlightSchema)

export default Flight

