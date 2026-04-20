import mongoose from "mongoose";
import { env } from "./env.js";

const dbStateLabel = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};

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

export function isDbConnected() {
  return getDbReadyState() === 1;
}

export async function connectDb() {
  // Disable command buffering so DB issues fail fast instead of timing out later in handlers.
  mongoose.set("bufferCommands", false);
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000
  });
}

