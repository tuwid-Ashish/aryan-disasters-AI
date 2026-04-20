import { Notification } from "./notification.model.js";

export function listNotifications(userId) {
  return Notification.find({ userId }).sort({ createdAt: -1 });
}

export function createNotification(payload) {
  return Notification.create(payload);
}
