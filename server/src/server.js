import app from "./app.js";
import { connectDb, getDbDebugInfo } from "./config/db.js";
import { env } from "./config/env.js";
import { logError, logInfo } from "./utils/logger.js";

async function startServer() {
  try {
    logInfo("Connecting to database", { database: getDbDebugInfo() });
    await connectDb();
    logInfo("Database connected", { database: getDbDebugInfo() });
    app.listen(env.port, () => {
      logInfo(`Server running on port ${env.port}`);
    });
  } catch (error) {
    logError("Failed to start server", { error: error.message });
    process.exit(1);
  }
}

startServer();

