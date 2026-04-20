import mongoose from "mongoose";

const resourceLocationSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  { _id: false }
);

const resourceSchema = new mongoose.Schema(
  {
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    disasterId: { type: mongoose.Schema.Types.ObjectId, ref: "Disaster", required: true },
    category: {
      type: String,
      enum: ["food", "water", "medicine", "shelter", "clothes", "rescue"],
      required: true
    },
    quantityAvailable: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, trim: true },
    expiryDate: { type: Date },
    location: resourceLocationSchema,
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    },
    verificationNote: { type: String, default: "" },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["available", "reserved", "distributed", "inactive"],
      default: "available"
    }
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
