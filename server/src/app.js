import cors from "cors";
import express from "express";
import morgan from "morgan";
import { getDbDebugInfo, isDbConnected } from "./config/db.js";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import disasterRoutes from "./modules/disasters/disaster.routes.js";
import requestRoutes from "./modules/requests/request.routes.js";
import resourceRoutes from "./modules/resources/resource.routes.js";
import allocationRoutes from "./modules/allocations/allocation.routes.js";
import volunteerRoutes from "./modules/volunteers/volunteer.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();

function getHealthPayload() {
  return {
    service: "aryan-disasters-ai-server",
    status: "ok",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    checks: {
      database: getDbDebugInfo()
    }
  };
}

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is alive",
    data: getHealthPayload()
  });
});

app.get("/api/health/ready", (req, res) => {
  const payload = getHealthPayload();
  const isReady = isDbConnected();

  return res.status(isReady ? 200 : 503).json({
    success: isReady,
    message: isReady ? "Server is ready" : "Server is not ready",
    data: {
      ...payload,
      status: isReady ? "ok" : "degraded"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/disasters", disasterRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

