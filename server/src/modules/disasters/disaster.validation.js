const validSeverity = ["low", "medium", "high", "critical"];
const validStatus = ["draft", "active", "closed"];

export function validateDisasterCreate(body) {
  const errors = [];

  if (!body.title?.trim()) errors.push("Title is required.");
  if (!body.type?.trim()) errors.push("Type is required.");
  if (!body.region?.trim()) errors.push("Region is required.");
  if (body.severity && !validSeverity.includes(body.severity)) errors.push("Severity is invalid.");
  if (body.status && !validStatus.includes(body.status)) errors.push("Status is invalid.");

  return errors;
}

export function validateDisasterUpdate(body) {
  const errors = [];

  if (body.severity && !validSeverity.includes(body.severity)) errors.push("Severity is invalid.");
  if (body.status && !validStatus.includes(body.status)) errors.push("Status is invalid.");

  return errors;
}
