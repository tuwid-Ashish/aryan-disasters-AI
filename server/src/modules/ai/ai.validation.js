function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

export function explainPrioritySchema(body = {}) {
  const errors = [];

  if (!hasText(body.category)) errors.push({ field: "category", message: "Category is required." });
  if (!hasText(body.urgencyLevel)) errors.push({ field: "urgencyLevel", message: "Urgency level is required." });

  return errors;
}

export function disasterSummarySchema(body = {}) {
  const errors = [];

  if (!hasText(body.title)) errors.push({ field: "title", message: "Title is required." });
  if (!hasText(body.region)) errors.push({ field: "region", message: "Region is required." });

  return errors;
}

export function matchResourcesSchema(body = {}) {
  const errors = [];

  if (!isNonEmptyArray(body.requests)) errors.push({ field: "requests", message: "Requests array is required." });
  if (!isNonEmptyArray(body.resources)) errors.push({ field: "resources", message: "Resources array is required." });

  return errors;
}
