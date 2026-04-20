import { sendSuccess } from "../../utils/api-response.js";
import { getSuggestions, listAllocations } from "./allocation.service.js";

export async function getAllocations(req, res, next) {
  try {
    const allocations = await listAllocations();
    return sendSuccess(res, allocations, "Allocations fetched");
  } catch (error) {
    return next(error);
  }
}

export async function postSuggestions(req, res, next) {
  try {
    const suggestions = await getSuggestions();
    return sendSuccess(res, suggestions, "Allocation suggestions generated");
  } catch (error) {
    return next(error);
  }
}

