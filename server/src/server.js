import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { logError, logInfo } from "./utils/logger.js";

async function startServer() {
  try {
    await connectDb();
    app.listen(env.port, () => {
      logInfo(`Server running on port ${env.port}`);
    });
  } catch (error) {
    logError("Failed to start server", { error: error.message });
    process.exit(1);
  }
}

startServer();

