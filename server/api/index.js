import app from "../src/app.js";
import { connectDb, isDbConnected } from "../src/config/db.js";

let connectPromise = null;

async function ensureDbConnection() {
  if (isDbConnected()) {
    return;
  }

  if (!connectPromise) {
    connectPromise = connectDb().catch((error) => {
      connectPromise = null;
      throw error;
    });
  }

  await connectPromise;
}

function isHealthRoute(url = "") {
  return url.startsWith("/api/health");
}

export default async function handler(req, res) {
  try {
    await ensureDbConnection();
  } catch (error) {
    // Let health endpoints return app-level readiness payloads when DB is down.
    if (!isHealthRoute(req.url || "")) {
      return res.status(503).json({
        success: false,
        message: "Database is unavailable",
        error: error.message
      });
    }
  }

  return app(req, res);
}