const validCategories = ["food", "water", "medicine", "shelter", "clothes", "rescue"];
const validVerification = ["pending", "verified", "rejected"];
const validStatus = ["available", "reserved", "distributed", "inactive"];

export function validateResourceCreate(body) {
  const errors = [];

  if (!body.disasterId?.trim()) errors.push("Disaster is required.");
  if (!validCategories.includes(body.category)) errors.push("Category is invalid.");
  if (!body.quantityAvailable || Number(body.quantityAvailable) < 1) errors.push("Quantity available must be greater than 0.");
  if (!body.unit?.trim()) errors.push("Unit is required.");

  return errors;
}

export function validateResourceUpdate(body) {
  const errors = [];

  if (body.category && !validCategories.includes(body.category)) errors.push("Category is invalid.");
  if (body.quantityAvailable && Number(body.quantityAvailable) < 1) errors.push("Quantity available must be greater than 0.");
  if (body.verificationStatus && !validVerification.includes(body.verificationStatus)) errors.push("Verification status is invalid.");
  if (body.status && !validStatus.includes(body.status)) errors.push("Status is invalid.");

  return errors;
}

export function validateResourceVerification(body) {
  const errors = [];

  if (!validVerification.includes(body.verificationStatus)) {
    errors.push("Verification status is invalid.");
  }

  return errors;
}

export function validateResourceStatus(body) {
  const errors = [];

  if (!validStatus.includes(body.status)) {
    errors.push("Status is invalid.");
  }

  return errors;
}
