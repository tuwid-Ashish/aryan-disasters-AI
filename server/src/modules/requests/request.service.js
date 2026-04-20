import { Request } from "./request.model.js";
import { Disaster } from "../disasters/disaster.model.js";
import { calculatePriorityScore } from "../../utils/priority-score.js";
import { createNotification } from "../notifications/notification.service.js";

export async function listRequests(filters = {}, user = null) {
  const query = {};

  if (filters.status) query.status = filters.status;
  if (filters.verificationStatus) query.verificationStatus = filters.verificationStatus;
  if (filters.disasterId) query.disasterId = filters.disasterId;
  if (filters.category) query.category = filters.category;

  if (user?.role === "beneficiary") {
    query.beneficiaryId = user.sub;
  }

  return Request.find(query).sort({ priorityScore: -1, createdAt: -1 });
}

export async function createRequest(payload, beneficiaryId) {
  const disaster = await Disaster.findById(payload.disasterId);
  if (!disaster) {
    const error = new Error("Disaster not found.");
    error.statusCode = 404;
    throw error;
  }

  const priorityScore = calculatePriorityScore(payload, disaster?.severity);

  return Request.create({
    ...payload,
    beneficiaryId,
    priorityScore
  });
}

export async function getRequestById(id, user = null) {
  const request = await Request.findById(id);

  if (!request) {
    const error = new Error("Request not found.");
    error.statusCode = 404;
    throw error;
  }

  if (user?.role === "beneficiary" && request.beneficiaryId.toString() !== user.sub) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  return request;
}

export async function updateRequest(id, payload, user) {
  const request = await getRequestById(id, user);

  if (!["admin", "beneficiary"].includes(user.role)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  if (user.role === "beneficiary" && request.beneficiaryId.toString() !== user.sub) {
    const error = new Error("You can only update your own request.");
    error.statusCode = 403;
    throw error;
  }

  const allowedFields =
    user.role === "admin"
      ? ["category", "subcategory", "quantityNeeded", "urgencyLevel", "peopleAffected", "location", "description", "disasterId"]
      : ["category", "subcategory", "quantityNeeded", "urgencyLevel", "peopleAffected", "location", "description"];

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      request[field] = payload[field];
    }
  }

  const disaster = await Disaster.findById(request.disasterId);
  request.priorityScore = calculatePriorityScore(request.toObject(), disaster?.severity);

  await request.save();
  return request;
}

export async function verifyRequest(id, payload, adminId) {
  const request = await Request.findById(id);

  if (!request) {
    const error = new Error("Request not found.");
    error.statusCode = 404;
    throw error;
  }

  request.verificationStatus = payload.verificationStatus;
  request.verificationNote = payload.verificationNote || "";
  request.verifiedBy = adminId;

  await request.save();

  await createNotification({
    userId: request.beneficiaryId,
    title: "Request verification updated",
    message: `Your request has been marked as ${payload.verificationStatus}.`,
    type: payload.verificationStatus === "verified" ? "success" : "warning"
  });

  return request;
}

export async function updateRequestStatus(id, payload) {
  const request = await Request.findById(id);

  if (!request) {
    const error = new Error("Request not found.");
    error.statusCode = 404;
    throw error;
  }

  request.status = payload.status;
  await request.save();

  await createNotification({
    userId: request.beneficiaryId,
    title: "Request status updated",
    message: `Your request status is now ${payload.status}.`,
    type: payload.status === "fulfilled" ? "success" : "info"
  });

  return request;
}
