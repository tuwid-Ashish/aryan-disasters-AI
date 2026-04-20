import { VolunteerTask } from "./volunteer-task.model.js";

export function listVolunteerTasks(volunteerId) {
  return VolunteerTask.find({ volunteerId }).sort({ createdAt: -1 });
}

