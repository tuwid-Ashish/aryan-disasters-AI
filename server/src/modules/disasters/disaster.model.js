import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    region: { type: String, required: true, trim: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium"
    },
    status: {
      type: String,
      enum: ["draft", "active", "closed"],
      default: "draft"
    },
    impactSummary: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Disaster = mongoose.model("Disaster", disasterSchema);
