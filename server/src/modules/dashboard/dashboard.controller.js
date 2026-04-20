import { sendSuccess } from "../../utils/api-response.js";
import { getHighPriorityRequests, getOverview } from "./dashboard.service.js";

export async function overview(req, res, next) {
  try {
    const data = await getOverview();
    return sendSuccess(res, data, "Dashboard overview fetched");
  } catch (error) {
    return next(error);
  }
}

export async function highPriorityRequests(req, res, next) {
  try {
    const data = await getHighPriorityRequests(Number(req.query.limit) || 5);
    return sendSuccess(res, data, "High priority requests fetched");
  } catch (error) {
    return next(error);
  }
}
