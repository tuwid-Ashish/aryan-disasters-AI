import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

