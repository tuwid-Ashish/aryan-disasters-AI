import { Disaster } from "./disaster.model.js";

export function listDisasters(filters = {}) {
  const query = {};

  if (filters.status) query.status = filters.status;
  if (filters.severity) query.severity = filters.severity;

  return Disaster.find(query).sort({ createdAt: -1 });
}

export function createDisaster(payload, userId) {
  return Disaster.create({
    ...payload,
    createdBy: userId
  });
}

export async function getDisasterById(id) {
  const disaster = await Disaster.findById(id);

  if (!disaster) {
    const error = new Error("Disaster not found.");
    error.statusCode = 404;
    throw error;
  }

  return disaster;
}

export async function updateDisaster(id, payload) {
  const disaster = await Disaster.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });

  if (!disaster) {
    const error = new Error("Disaster not found.");
    error.statusCode = 404;
    throw error;
  }

  return disaster;
}
