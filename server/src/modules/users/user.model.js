import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "donor", "beneficiary", "volunteer"],
      required: true
    },
    phone: { type: String, trim: true },
    location: locationSchema,
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

