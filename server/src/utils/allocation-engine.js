export function generateAllocationSuggestions(requests = [], resources = []) {
  return requests.map((request) => {
    const match = resources.find(
      (resource) =>
        resource.category === request.category &&
        resource.verificationStatus === "verified" &&
        resource.status === "available" &&
        resource.quantityAvailable >= request.quantityNeeded
    );

    return {
      requestId: request._id,
      requestTitle: `${request.category} request`,
      suggestedResourceId: match?._id || null,
      assignedQuantity: match ? request.quantityNeeded : 0,
      reason: match
        ? "Matched by category, availability, and verified resource status."
        : "No fully matching verified resource is currently available."
    };
  });
}

