const validRoles = ["donor", "beneficiary", "volunteer"];

export function validateRegister(body) {
  const errors = [];

  if (!body.name?.trim()) errors.push("Name is required.");
  if (!body.email?.trim()) errors.push("Email is required.");
  if (!body.password?.trim() || body.password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }
  if (!validRoles.includes(body.role)) errors.push("Role is invalid for self-registration.");

  return errors;
}

export function validateLogin(body) {
  const errors = [];

  if (!body.email?.trim()) errors.push("Email is required.");
  if (!body.password?.trim()) errors.push("Password is required.");

  return errors;
}

