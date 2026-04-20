import { sendSuccess } from "../../utils/api-response.js";
import { loginUser, registerUser } from "./auth.service.js";

export async function register(req, res, next) {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, result, "Registration successful", 201);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, result, "Login successful");
  } catch (error) {
    return next(error);
  }
}

export function me(req, res) {
  return sendSuccess(res, { user: req.user }, "Profile fetched");
}

