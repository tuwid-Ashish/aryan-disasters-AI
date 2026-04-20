import { Allocation } from "./allocation.model.js";
import { Request } from "../requests/request.model.js";
import { Resource } from "../resources/resource.model.js";
import { generateAllocationSuggestions } from "../../utils/allocation-engine.js";

export function listAllocations() {
  return Allocation.find().sort({ createdAt: -1 });
}

export async function getSuggestions() {
  const requests = await Request.find({ verificationStatus: "verified", status: "pending" });
  const resources = await Resource.find({ verificationStatus: "verified", status: "available" });
  return generateAllocationSuggestions(requests, resources);
}

