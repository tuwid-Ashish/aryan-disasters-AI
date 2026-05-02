const windowMs = 60 * 1000;
const maxRequests = 20;
const store = new Map();

export function aiRateLimit(req, res, next) {
  const key = `${req.ip || "unknown"}:${req.originalUrl}`;
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: "Too many AI requests. Please try again shortly."
    });
  }

  record.count += 1;
  return next();
}
