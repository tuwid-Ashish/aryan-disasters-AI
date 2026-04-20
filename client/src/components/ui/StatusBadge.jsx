export function StatusBadge({ value }) {
  const normalized = String(value || "unknown").toLowerCase();
  const className = ["status-badge"];

  if (["critical", "rejected", "urgent"].includes(normalized)) className.push("is-critical");
  else if (["high", "pending", "reserved", "warning"].includes(normalized)) className.push("is-warning");
  else if (["verified", "active", "approved", "fulfilled", "delivered", "available", "success"].includes(normalized)) {
    className.push("is-success");
  } else {
    className.push("is-neutral");
  }

  return <span className={className.join(" ")}>{normalized.replaceAll("_", " ")}</span>;
}

