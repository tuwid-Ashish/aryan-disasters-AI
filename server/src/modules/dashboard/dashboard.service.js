import { Allocation } from "../allocations/allocation.model.js";
import { Disaster } from "../disasters/disaster.model.js";
import { Request } from "../requests/request.model.js";
import { Resource } from "../resources/resource.model.js";

export async function getOverview() {
  const [activeDisasters, pendingRequests, availableResources, deliveredAllocations] = await Promise.all([
    Disaster.countDocuments({ status: "active" }),
    Request.countDocuments({ status: "pending" }),
    Resource.countDocuments({ status: "available" }),
    Allocation.countDocuments({ status: "delivered" })
  ]);

  return {
    activeDisasters,
    pendingRequests,
    availableResources,
    deliveredAllocations
  };
}

export async function getHighPriorityRequests(limit = 5) {
  return Request.find({ verificationStatus: "verified" })
    .sort({ priorityScore: -1, createdAt: -1 })
    .limit(limit)
    .select("category urgencyLevel peopleAffected priorityScore status verificationStatus createdAt");
}
