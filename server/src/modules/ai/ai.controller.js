import { sendSuccess } from "../../utils/api-response.js";
import { explainPriority, generateDisasterSummary } from "./ai.service.js";

export async function postExplainPriority(req, res, next) {
  try {
    const result = await explainPriority(req.body);
    return sendSuccess(res, result, "Priority explanation generated");
  } catch (error) {
    return next(error);
  }
}

export async function postDisasterSummary(req, res, next) {
  try {
    const result = await generateDisasterSummary(req.body);
    return sendSuccess(res, result, "Disaster summary generated");
  } catch (error) {
    return next(error);
  }
}

