import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource", required: true },
    assignedQuantity: { type: Number, required: true, min: 1 },
    allocatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "in_transit", "delivered", "cancelled"],
      default: "pending"
    },
    aiReason: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Allocation = mongoose.model("Allocation", allocationSchema);

