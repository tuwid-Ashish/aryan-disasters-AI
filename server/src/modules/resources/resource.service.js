import { Resource } from "./resource.model.js";
import { createNotification } from "../notifications/notification.service.js";
import { Disaster } from "../disasters/disaster.model.js";

export function listResources(filters = {}, user = null) {
  const query = {};

  if (filters.status) query.status = filters.status;
  if (filters.verificationStatus) query.verificationStatus = filters.verificationStatus;
  if (filters.disasterId) query.disasterId = filters.disasterId;
  if (filters.category) query.category = filters.category;

  if (user?.role === "donor") {
    query.donorId = user.sub;
  }

  return Resource.find(query).sort({ createdAt: -1 });
}

export function createResource(payload, donorId) {
  return Resource.create({
    ...payload,
    donorId
  });
}

export async function createResourceForDonor(payload, donorId) {
  const disaster = await Disaster.findById(payload.disasterId);

  if (!disaster) {
    const error = new Error("Disaster not found.");
    error.statusCode = 404;
    throw error;
  }

  return createResource(payload, donorId);
}

export async function getResourceById(id, user = null) {
  const resource = await Resource.findById(id);

  if (!resource) {
    const error = new Error("Resource not found.");
    error.statusCode = 404;
    throw error;
  }

  if (user?.role === "donor" && resource.donorId.toString() !== user.sub) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  return resource;
}

export async function updateResource(id, payload, user) {
  const resource = await getResourceById(id, user);

  if (!["admin", "donor"].includes(user.role)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  if (user.role === "donor" && resource.donorId.toString() !== user.sub) {
    const error = new Error("You can only update your own resource.");
    error.statusCode = 403;
    throw error;
  }

  const allowedFields =
    user.role === "admin"
      ? ["category", "quantityAvailable", "unit", "expiryDate", "location", "disasterId"]
      : ["category", "quantityAvailable", "unit", "expiryDate", "location"];

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      resource[field] = payload[field];
    }
  }

  await resource.save();
  return resource;
}

export async function verifyResource(id, payload, adminId) {
  const resource = await Resource.findById(id);

  if (!resource) {
    const error = new Error("Resource not found.");
    error.statusCode = 404;
    throw error;
  }

  resource.verificationStatus = payload.verificationStatus;
  resource.verificationNote = payload.verificationNote || "";
  resource.verifiedBy = adminId;
  await resource.save();

  await createNotification({
    userId: resource.donorId,
    title: "Resource verification updated",
    message: `Your resource listing has been marked as ${payload.verificationStatus}.`,
    type: payload.verificationStatus === "verified" ? "success" : "warning"
  });

  return resource;
}

export async function updateResourceStatus(id, payload) {
  const resource = await Resource.findById(id);

  if (!resource) {
    const error = new Error("Resource not found.");
    error.statusCode = 404;
    throw error;
  }

  resource.status = payload.status;
  await resource.save();

  await createNotification({
    userId: resource.donorId,
    title: "Resource status updated",
    message: `Your resource status is now ${payload.status}.`,
    type: "info"
  });

  return resource;
}
