import mongoose from "mongoose";

const volunteerTaskSchema = new mongoose.Schema(
  {
    allocationId: { type: mongoose.Schema.Types.ObjectId, ref: "Allocation", required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pickupLocation: { type: String, default: "" },
    dropLocation: { type: String, default: "" },
    status: {
      type: String,
      enum: ["assigned", "picked", "in_transit", "completed"],
      default: "assigned"
    }
  },
  { timestamps: true }
);

export const VolunteerTask = mongoose.model("VolunteerTask", volunteerTaskSchema);

