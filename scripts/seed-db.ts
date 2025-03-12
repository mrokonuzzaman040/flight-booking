import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  console.log(`Loading environment from ${envPath}`)
  dotenv.config({ path: envPath })
} else {
  console.log("No .env.local file found, using default environment")
  dotenv.config()
}

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined")
  process.exit(1)
}

// Define schemas
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: {
      type: String,
      enum: ["user", "admin", "support"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    registeredDate: {
      type: Date,
      default: Date.now,
    },
    nationality: String,
    passportNumber: String,
    passportExpiry: Date,
    address: String,
    preferredSeat: String,
    mealPreference: String,
  },
  {
    timestamps: true,
  },
)

const FlightSchema = new mongoose.Schema(
  {
    flightNumber: String,
    airline: String,
    from: String,
    to: String,
    departureDate: Date,
    departureTime: String,
    arrivalDate: Date,
    arrivalTime: String,
    duration: String,
    stops: Number,
    stopDetails: String,
    price: Number,
    tax: Number,
    status: {
      type: String,
      enum: ["Scheduled", "Delayed", "Cancelled", "Completed"],
      default: "Scheduled",
    },
    aircraft: String,
    capacity: Number,
    economySeats: Number,
    businessSeats: Number,
    firstClassSeats: Number,
    availableEconomySeats: Number,
    availableBusinessSeats: Number,
    availableFirstClassSeats: Number,
    amenities: [String],
    baggage: {
      cabin: String,
      checked: String,
    },
    refundable: Boolean,
  },
  {
    timestamps: true,
  },
)

const PassengerSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Mr", "Mrs", "Ms", "Dr"],
  },
  firstName: String,
  lastName: String,
  dob: Date,
  nationality: String,
  passportNumber: String,
  passportExpiry: Date,
  seatNumber: String,
  class: {
    type: String,
    enum: ["Economy", "Business", "First"],
    default: "Economy",
  },
})

const BookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
    passengers: [PassengerSchema],
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: Number,
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
    paymentMethod: String,
    paymentDate: Date,
    contactEmail: String,
    contactPhone: String,
  },
  {
    timestamps: true,
  },
)

const DestinationSchema = new mongoose.Schema({
  code: String,
  name: String,
  country: String,
  description: String,
  image: String,
  popular: Boolean,
})

// Create models
let User, Flight, Booking, Destination

try {
  // Check if models are already defined
  User = mongoose.models.User || mongoose.model("User", UserSchema)
  Flight = mongoose.models.Flight || mongoose.model("Flight", FlightSchema)
  Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema)
  Destination = mongoose.models.Destination || mongoose.model("Destination", DestinationSchema)
} catch (error) {
  console.error("Error creating models:", error)
  process.exit(1)
}

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@airbangla.com",
    password: "admin123",
    phone: "+8801711111111",
    role: "admin",
    status: "active",
    nationality: "Bangladeshi",
    address: "Dhaka, Bangladesh",
  },
  {
    name: "Support User",
    email: "support@airbangla.com",
    password: "support123",
    phone: "+8801722222222",
    role: "support",
    status: "active",
    nationality: "Bangladeshi",
    address: "Dhaka, Bangladesh",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "+8801733333333",
    role: "user",
    status: "active",
    nationality: "American",
    passportNumber: "US123456",
    passportExpiry: new Date("2028-01-01"),
    address: "New York, USA",
    preferredSeat: "Window",
    mealPreference: "Vegetarian",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    phone: "+8801744444444",
    role: "user",
    status: "active",
    nationality: "British",
    passportNumber: "UK789012",
    passportExpiry: new Date("2027-05-15"),
    address: "London, UK",
    preferredSeat: "Aisle",
    mealPreference: "Regular",
  },
  {
    name: "Kamal Ahmed",
    email: "kamal@example.com",
    password: "password123",
    phone: "+8801755555555",
    role: "user",
    status: "active",
    nationality: "Bangladeshi",
    passportNumber: "BD345678",
    passportExpiry: new Date("2026-08-20"),
    address: "Dhaka, Bangladesh",
    preferredSeat: "Window",
    mealPreference: "Halal",
  },
]

const airports = [
  { code: "DAC", name: "Dhaka", country: "Bangladesh" },
  { code: "CGP", name: "Chittagong", country: "Bangladesh" },
  { code: "ZYL", name: "Sylhet", country: "Bangladesh" },
  { code: "JSR", name: "Jessore", country: "Bangladesh" },
  { code: "CXB", name: "Cox's Bazar", country: "Bangladesh" },
  { code: "DXB", name: "Dubai", country: "UAE" },
  { code: "SIN", name: "Singapore", country: "Singapore" },
  { code: "KUL", name: "Kuala Lumpur", country: "Malaysia" },
  { code: "BKK", name: "Bangkok", country: "Thailand" },
  { code: "DEL", name: "Delhi", country: "India" },
  { code: "CCU", name: "Kolkata", country: "India" },
  { code: "LHR", name: "London", country: "UK" },
  { code: "JFK", name: "New York", country: "USA" },
]

const airlines = [
  "Biman Bangladesh Airlines",
  "US-Bangla Airlines",
  "Regent Airways",
  "Novoair",
  "Emirates",
  "Singapore Airlines",
  "Malaysia Airlines",
  "Thai Airways",
  "Air India",
  "British Airways",
  "Qatar Airways",
]

const aircraft = [
  "Boeing 737-800",
  "Boeing 777-300ER",
  "Boeing 787-9 Dreamliner",
  "Airbus A320",
  "Airbus A330-300",
  "Airbus A350-900",
  "Bombardier Dash 8 Q400",
  "ATR 72-600",
]

const amenities = [
  "Wi-Fi",
  "In-flight Entertainment",
  "Power Outlets",
  "USB Ports",
  "Complimentary Meals",
  "Complimentary Drinks",
  "Blankets",
  "Pillows",
  "Headphones",
  "Duty-free Shopping",
]

// Sample destinations data
const destinations = [
  {
    code: "DAC",
    name: "Dhaka",
    country: "Bangladesh",
    description: "The capital city of Bangladesh, known for its vibrant culture and historical sites.",
    image: "/destinations/dhaka.jpg",
    popular: true,
  },
  {
    code: "CGP",
    name: "Chittagong",
    country: "Bangladesh",
    description: "The second-largest city in Bangladesh, known for its beautiful hills and beaches.",
    image: "/destinations/chittagong.jpg",
    popular: true,
  },
  {
    code: "CXB",
    name: "Cox's Bazar",
    country: "Bangladesh",
    description: "Home to the world's longest natural sea beach, stretching over 120 kilometers.",
    image: "/destinations/coxs-bazar.jpg",
    popular: true,
  },
  {
    code: "ZYL",
    name: "Sylhet",
    country: "Bangladesh",
    description: "Known for its tea gardens, natural beauty, and Sufi shrines.",
    image: "/destinations/sylhet.jpg",
    popular: true,
  },
  {
    code: "JSR",
    name: "Jessore",
    country: "Bangladesh",
    description: "A cultural hub in southwestern Bangladesh with rich heritage.",
    image: "/destinations/jessore.jpg",
    popular: false,
  },
  {
    code: "DXB",
    name: "Dubai",
    country: "UAE",
    description: "A global city known for luxury shopping, ultramodern architecture, and vibrant nightlife.",
    image: "/destinations/dubai.jpg",
    popular: true,
  },
  {
    code: "SIN",
    name: "Singapore",
    country: "Singapore",
    description: "A global financial center with a tropical climate and multicultural population.",
    image: "/destinations/singapore.jpg",
    popular: true,
  },
  {
    code: "KUL",
    name: "Kuala Lumpur",
    country: "Malaysia",
    description: "Malaysia's capital, known for its colonial architecture, busy shopping districts, and skyscrapers.",
    image: "/destinations/kuala-lumpur.jpg",
    popular: true,
  },
  {
    code: "BKK",
    name: "Bangkok",
    country: "Thailand",
    description: "Thailand's capital, known for ornate shrines and vibrant street life.",
    image: "/destinations/bangkok.jpg",
    popular: true,
  },
  {
    code: "DEL",
    name: "Delhi",
    country: "India",
    description: "India's capital territory, known for its rich history and architecture.",
    image: "/destinations/delhi.jpg",
    popular: false,
  },
  {
    code: "CCU",
    name: "Kolkata",
    country: "India",
    description: "The cultural capital of India, known for its colonial-era architecture.",
    image: "/destinations/kolkata.jpg",
    popular: false,
  },
  {
    code: "LHR",
    name: "London",
    country: "UK",
    description:
      "The capital of England and the United Kingdom, a 21st-century city with history stretching back to Roman times.",
    image: "/destinations/london.jpg",
    popular: true,
  },
  {
    code: "JFK",
    name: "New York",
    country: "USA",
    description: "A global power city, home to the Statue of Liberty, Empire State Building, and Times Square.",
    image: "/destinations/new-york.jpg",
    popular: true,
  },
]

// Generate random flights
function generateFlights(count) {
  const flights = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const fromAirport = airports[Math.floor(Math.random() * airports.length)]
    let toAirport
    do {
      toAirport = airports[Math.floor(Math.random() * airports.length)]
    } while (toAirport.code === fromAirport.code)

    const airline = airlines[Math.floor(Math.random() * airlines.length)]
    const flightNumber = `${airline.substring(0, 2).toUpperCase()}${100 + Math.floor(Math.random() * 900)}`

    // Random departure date between today and 3 months from now
    const departureDate = new Date(today)
    departureDate.setDate(today.getDate() + Math.floor(Math.random() * 90))

    // Random departure time
    const departureHour = Math.floor(Math.random() * 24)
    const departureMinute = Math.floor(Math.random() * 60)
    const departureTime = `${departureHour.toString().padStart(2, "0")}:${departureMinute.toString().padStart(2, "0")}`

    // Random duration between 1 and 12 hours
    const durationHours = Math.floor(Math.random() * 12) + 1
    const durationMinutes = Math.floor(Math.random() * 60)
    const duration = `${durationHours}h ${durationMinutes}m`

    // Calculate arrival date and time
    const arrivalDate = new Date(departureDate)
    arrivalDate.setHours(arrivalDate.getHours() + durationHours)
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationMinutes)
    const arrivalTime = `${arrivalDate.getHours().toString().padStart(2, "0")}:${arrivalDate.getMinutes().toString().padStart(2, "0")}`

    // Random stops (0, 1, or 2)
    const stops = Math.floor(Math.random() * 3)

    // Random price between $100 and $1500
    const price = Math.floor(Math.random() * 1400) + 100
    const tax = Math.floor(price * 0.1)

    // Random aircraft
    const aircraftType = aircraft[Math.floor(Math.random() * aircraft.length)]

    // Random capacity and seats
    const capacity = Math.floor(Math.random() * 200) + 100
    const economySeats = Math.floor(capacity * 0.7)
    const businessSeats = Math.floor(capacity * 0.2)
    const firstClassSeats = capacity - economySeats - businessSeats

    // Random amenities (3-6 items)
    const flightAmenities = []
    const amenityCount = Math.floor(Math.random() * 4) + 3
    for (let j = 0; j < amenityCount; j++) {
      const amenity = amenities[Math.floor(Math.random() * amenities.length)]
      if (!flightAmenities.includes(amenity)) {
        flightAmenities.push(amenity)
      }
    }

    // Random status (mostly scheduled)
    const statusOptions = ["Scheduled", "Delayed", "Cancelled", "Completed"]
    const statusWeights = [0.7, 0.1, 0.05, 0.15]
    let statusIndex = 0
    const randomValue = Math.random()
    let cumulativeWeight = 0

    for (let j = 0; j < statusOptions.length; j++) {
      cumulativeWeight += statusWeights[j]
      if (randomValue <= cumulativeWeight) {
        statusIndex = j
        break
      }
    }

    const status = statusOptions[statusIndex]

    flights.push({
      flightNumber,
      airline,
      from: fromAirport.code,
      to: toAirport.code,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      duration,
      stops,
      stopDetails: stops > 0 ? `Stops at ${airports[Math.floor(Math.random() * airports.length)].code}` : "",
      price,
      tax,
      status,
      aircraft: aircraftType,
      capacity,
      economySeats,
      businessSeats,
      firstClassSeats,
      availableEconomySeats: economySeats,
      availableBusinessSeats: businessSeats,
      availableFirstClassSeats: firstClassSeats,
      amenities: flightAmenities,
      baggage: {
        cabin: "7kg",
        checked: "20kg",
      },
      refundable: Math.random() > 0.3,
    })
  }

  return flights
}

// Generate bookings
async function generateBookings(userIds, flightIds, count) {
  const bookings = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)]
    const flightId = flightIds[Math.floor(Math.random() * flightIds.length)]

    // Get user and flight details
    const user = await User.findById(userId)
    const flight = await Flight.findById(flightId)

    if (!user || !flight) {
      console.warn(`Skipping booking creation: User or Flight not found (userId: ${userId}, flightId: ${flightId})`)
      continue
    }

    // Random booking date (between 30 days ago and today)
    const bookingDate = new Date(today)
    bookingDate.setDate(today.getDate() - Math.floor(Math.random() * 30))

    // Random number of passengers (1-4)
    const passengerCount = Math.floor(Math.random() * 4) + 1
    const passengers = []

    for (let j = 0; j < passengerCount; j++) {
      const titles = ["Mr", "Mrs", "Ms", "Dr"]
      const title = titles[Math.floor(Math.random() * titles.length)]

      const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emma", "Kamal", "Fatima", "Rahim", "Nadia"]
      const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Miller",
        "Ahmed",
        "Khan",
        "Rahman",
        "Chowdhury",
      ]

      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      // Random DOB (18-70 years old)
      const dob = new Date()
      dob.setFullYear(dob.getFullYear() - 18 - Math.floor(Math.random() * 52))

      // Random passport expiry (1-10 years from now)
      const passportExpiry = new Date()
      passportExpiry.setFullYear(passportExpiry.getFullYear() + 1 + Math.floor(Math.random() * 9))

      // Random class
      const classes = ["Economy", "Business", "First"]
      const classWeights = [0.7, 0.2, 0.1]
      let classIndex = 0
      const randomValue = Math.random()
      let cumulativeWeight = 0

      for (let k = 0; k < classes.length; k++) {
        cumulativeWeight += classWeights[k]
        if (randomValue <= cumulativeWeight) {
          classIndex = k
          break
        }
      }

      const passengerClass = classes[classIndex]

      passengers.push({
        title,
        firstName,
        lastName,
        dob,
        nationality: user.nationality || "Bangladeshi",
        passportNumber: `${user.nationality?.substring(0, 2) || "BD"}${100000 + Math.floor(Math.random() * 900000)}`,
        passportExpiry,
        class: passengerClass,
      })
    }

    // Calculate total amount
    let totalAmount = 0
    for (const passenger of passengers) {
      if (passenger.class === "Economy") {
        totalAmount += flight.price + flight.tax
      } else if (passenger.class === "Business") {
        totalAmount += flight.price * 2 + flight.tax
      } else if (passenger.class === "First") {
        totalAmount += flight.price * 3 + flight.tax
      }
    }

    // Random status
    const statusOptions = ["Pending", "Confirmed", "Cancelled", "Completed"]
    const statusWeights = [0.1, 0.6, 0.1, 0.2]
    let statusIndex = 0
    const randomStatusValue = Math.random()
    let cumulativeStatusWeight = 0

    for (let j = 0; j < statusOptions.length; j++) {
      cumulativeStatusWeight += statusWeights[j]
      if (randomStatusValue <= cumulativeStatusWeight) {
        statusIndex = j
        break
      }
    }

    const status = statusOptions[statusIndex]

    // Random payment status
    let paymentStatus = "Unpaid"
    let paymentMethod = null
    let paymentDate = null

    if (status === "Confirmed" || status === "Completed") {
      paymentStatus = "Paid"
      const paymentMethods = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Mobile Banking"]
      paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
      paymentDate = new Date(bookingDate)
      paymentDate.setHours(paymentDate.getHours() + Math.floor(Math.random() * 24))
    } else if (status === "Cancelled") {
      const refundChance = Math.random()
      if (refundChance > 0.5) {
        paymentStatus = "Refunded"
      }
    }

    // Generate booking ID
    const year = bookingDate.getFullYear().toString().slice(-2)
    const month = (bookingDate.getMonth() + 1).toString().padStart(2, "0")
    const day = bookingDate.getDate().toString().padStart(2, "0")
    const bookingId = `AB-${year}${month}${day}-${(i + 1).toString().padStart(4, "0")}`

    bookings.push({
      bookingId,
      user: userId,
      flight: flightId,
      passengers,
      bookingDate,
      totalAmount,
      status,
      paymentStatus,
      paymentMethod,
      paymentDate,
      contactEmail: user.email,
      contactPhone: user.phone,
    })
  }

  return bookings
}

async function seedDatabase() {
  let connection = null

  try {
    console.log("Connecting to MongoDB...")
    connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB successfully")

    // Clear existing data
    console.log("Clearing existing data...")
    await User.deleteMany({})
    await Flight.deleteMany({})
    await Booking.deleteMany({})
    await Destination.deleteMany({})

    // Create users
    console.log("Creating users...")
    const createdUsers = []

    for (const user of users) {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = await User.create({
          ...user,
          password: hashedPassword,
        })
        createdUsers.push(newUser)
        console.log(`Created user: ${user.email}`)
      } catch (error) {
        console.error(`Error creating user ${user.email}:`, error.message)
      }
    }

    console.log(`Created ${createdUsers.length} users`)

    // Create destinations
    console.log("Creating destinations...")
    try {
      await Destination.insertMany(destinations)
      console.log(`Created ${destinations.length} destinations`)
    } catch (error) {
      console.error("Error creating destinations:", error.message)
    }

    // Create flights
    console.log("Creating flights...")
    const flights = generateFlights(50)
    let createdFlights = []

    try {
      createdFlights = await Flight.insertMany(flights)
      console.log(`Created ${createdFlights.length} flights`)
    } catch (error) {
      console.error("Error creating flights:", error.message)
    }

    // Create bookings
    console.log("Creating bookings...")
    const userIds = createdUsers.map((user) => user._id)
    const flightIds = createdFlights.map((flight) => flight._id)

    if (userIds.length === 0 || flightIds.length === 0) {
      console.error("Cannot create bookings: No users or flights available")
    } else {
      try {
        const bookings = await generateBookings(userIds, flightIds, 30)
        const createdBookings = await Booking.insertMany(bookings)
        console.log(`Created ${createdBookings.length} bookings`)
      } catch (error) {
        console.error("Error creating bookings:", error.message)
      }
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    // Disconnect from MongoDB
    if (connection) {
      await mongoose.disconnect()
      console.log("Disconnected from MongoDB")
    }
  }
}

// Run the seed function
seedDatabase().catch(console.error)

