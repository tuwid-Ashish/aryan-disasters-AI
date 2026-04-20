import { sendSuccess } from "../../utils/api-response.js";
import { createDisaster, getDisasterById, listDisasters, updateDisaster } from "./disaster.service.js";

export async function getDisasters(req, res, next) {
  try {
    const disasters = await listDisasters(req.query);
    return sendSuccess(res, disasters, "Disasters fetched");
  } catch (error) {
    return next(error);
  }
}

export async function getDisaster(req, res, next) {
  try {
    const disaster = await getDisasterById(req.params.id);
    return sendSuccess(res, disaster, "Disaster fetched");
  } catch (error) {
    return next(error);
  }
}

export async function postDisaster(req, res, next) {
  try {
    const disaster = await createDisaster(req.body, req.user.sub);
    return sendSuccess(res, disaster, "Disaster created", 201);
  } catch (error) {
    return next(error);
  }
}

export async function patchDisaster(req, res, next) {
  try {
    const disaster = await updateDisaster(req.params.id, req.body);
    return sendSuccess(res, disaster, "Disaster updated");
  } catch (error) {
    return next(error);
  }
}
