import { sendSuccess } from "../../utils/api-response.js";
import { listVolunteerTasks } from "./volunteer.service.js";

export async function getTasks(req, res, next) {
  try {
    const tasks = await listVolunteerTasks(req.user.sub);
    return sendSuccess(res, tasks, "Volunteer tasks fetched");
  } catch (error) {
    return next(error);
  }
}

