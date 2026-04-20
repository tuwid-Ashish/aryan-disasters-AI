import mongoose from "mongoose";
import { env } from "./env.js";

const dbStateLabel = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};

let listenersBound = false;
let connectInvoked = false;
let lastConnectAttemptAt = null;
let lastConnectedAt = null;
let lastDisconnectAt = null;
let lastDbError = null;

function nowIso() {
  return new Date().toISOString();
}

function getConfiguredMongoTarget() {
  try {
    const parsed = new URL(env.mongodbUri);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname || ""}`;
  } catch {
    return "unparseable-uri";
  }
}

function bindDbListeners() {
  if (listenersBound) {
    return;
  }

  listenersBound = true;

  mongoose.connection.on("connected", () => {
    lastConnectedAt = nowIso();
    lastDbError = null;
  });

  mongoose.connection.on("disconnected", () => {
    lastDisconnectAt = nowIso();
  });

  mongoose.connection.on("error", (error) => {
    lastDbError = error?.message || "Unknown database error";
  });
}

export function getDbReadyState() {
  return mongoose.connection.readyState;
}

export function getDbStatus() {
  const readyState = getDbReadyState();
  return {
    readyState,
    status: dbStateLabel[readyState] || "unknown"
  };
}

export function getDbDebugInfo() {
  const current = getDbStatus();

  return {
    ...current,
    connectInvoked,
    // configuredTarget: getConfiguredMongoTarget(),
    activeHost: mongoose.connection.host || null,
    activeDatabase: mongoose.connection.name || null,
    lastConnectAttemptAt,
    lastConnectedAt,
    lastDisconnectAt,
    lastError: lastDbError
  };
}

export function isDbConnected() {
  return getDbReadyState() === 1;
}

export async function connectDb() {
  connectInvoked = true;
  lastConnectAttemptAt = nowIso();
  bindDbListeners();

  // Disable command buffering so DB issues fail fast instead of timing out later in handlers.
  mongoose.set("bufferCommands", false);
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000
  });
}

