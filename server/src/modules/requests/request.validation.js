const validCategories = ["food", "water", "medicine", "shelter", "clothes", "rescue"];
const validUrgency = ["low", "medium", "high", "critical"];
const validVerification = ["pending", "verified", "rejected"];
const validStatus = ["pending", "approved", "allocated", "fulfilled", "rejected"];

export function validateRequestCreate(body) {
  const errors = [];

  if (!body.disasterId?.trim()) errors.push("Disaster is required.");
  if (!validCategories.includes(body.category)) errors.push("Category is invalid.");
  if (!body.quantityNeeded || Number(body.quantityNeeded) < 1) errors.push("Quantity needed must be greater than 0.");
  if (body.urgencyLevel && !validUrgency.includes(body.urgencyLevel)) errors.push("Urgency level is invalid.");

  return errors;
}

export function validateRequestUpdate(body) {
  const errors = [];

  if (body.category && !validCategories.includes(body.category)) errors.push("Category is invalid.");
  if (body.quantityNeeded && Number(body.quantityNeeded) < 1) errors.push("Quantity needed must be greater than 0.");
  if (body.urgencyLevel && !validUrgency.includes(body.urgencyLevel)) errors.push("Urgency level is invalid.");
  if (body.verificationStatus && !validVerification.includes(body.verificationStatus)) errors.push("Verification status is invalid.");
  if (body.status && !validStatus.includes(body.status)) errors.push("Status is invalid.");

  return errors;
}

export function validateRequestVerification(body) {
  const errors = [];

  if (!validVerification.includes(body.verificationStatus)) {
    errors.push("Verification status is invalid.");
  }

  return errors;
}

export function validateRequestStatus(body) {
  const errors = [];

  if (!validStatus.includes(body.status)) {
    errors.push("Status is invalid.");
  }

  return errors;
}
