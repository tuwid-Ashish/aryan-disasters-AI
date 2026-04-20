import { logError } from "../utils/logger.js";

export function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
}

export function errorHandler(err, req, res, next) {
  logError(err.message, { stack: err.stack, path: req.originalUrl });

  const isDbBufferTimeout = typeof err.message === "string" && err.message.includes("buffering timed out");
  if (isDbBufferTimeout) {
    return res.status(503).json({
      success: false,
      message: "Database is unavailable right now. Please check MongoDB connection and retry."
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
}

