import { sendSuccess } from "../../utils/api-response.js";
import { listNotifications } from "./notification.service.js";

export async function getNotifications(req, res, next) {
  try {
    const notifications = await listNotifications(req.user.sub);
    return sendSuccess(res, notifications, "Notifications fetched");
  } catch (error) {
    return next(error);
  }
}

