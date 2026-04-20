import mongoose from "mongoose";

const requestLocationSchema = new mongoose.Schema(
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

const requestSchema = new mongoose.Schema(
  {
    beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    disasterId: { type: mongoose.Schema.Types.ObjectId, ref: "Disaster", required: true },
    category: {
      type: String,
      enum: ["food", "water", "medicine", "shelter", "clothes", "rescue"],
      required: true
    },
    subcategory: { type: String, trim: true },
    quantityNeeded: { type: Number, required: true, min: 1 },
    urgencyLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium"
    },
    peopleAffected: { type: Number, default: 1 },
    location: requestLocationSchema,
    description: { type: String, default: "" },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    },
    verificationNote: { type: String, default: "" },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priorityScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "allocated", "fulfilled", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
