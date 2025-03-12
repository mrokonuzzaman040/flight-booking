import mongoose, { type Document, type Model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  phone: string
  role: "user" | "admin" | "support"
  status: "active" | "inactive"
  registeredDate: Date
  nationality?: string
  passportNumber?: string
  passportExpiry?: Date
  address?: string
  preferredSeat?: string
  mealPreference?: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
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
    nationality: {
      type: String,
    },
    passportNumber: {
      type: String,
    },
    passportExpiry: {
      type: Date,
    },
    address: {
      type: String,
    },
    preferredSeat: {
      type: String,
    },
    mealPreference: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User

