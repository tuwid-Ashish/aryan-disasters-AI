import { sendSuccess } from "../../utils/api-response.js";
import { getDbStatus, isDbConnected } from "../../config/db.js";
import { loginUser, registerUser } from "./auth.service.js";

function ensureDbReady() {
  if (isDbConnected()) {
    return null;
  }

  const dbStatus = getDbStatus();
  const error = new Error(`Database is ${dbStatus.status}. Please try again shortly.`);
  error.statusCode = 503;
  return error;
}

export async function register(req, res, next) {
  try {
    const dbError = ensureDbReady();
    if (dbError) {
      return next(dbError);
    }

    const result = await registerUser(req.body);
    return sendSuccess(res, result, "Registration successful", 201);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const dbError = ensureDbReady();
    if (dbError) {
      return next(dbError);
    }

    const result = await loginUser(req.body);
    return sendSuccess(res, result, "Login successful");
  } catch (error) {
    return next(error);
  }
}

export function me(req, res) {
  return sendSuccess(res, { user: req.user }, "Profile fetched");
}

