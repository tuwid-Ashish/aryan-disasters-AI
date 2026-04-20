import { sendSuccess } from "../../utils/api-response.js";
import {
  createResourceForDonor,
  getResourceById,
  listResources,
  updateResource,
  updateResourceStatus,
  verifyResource
} from "./resource.service.js";

export async function getResources(req, res, next) {
  try {
    const resources = await listResources(req.query, req.user);
    return sendSuccess(res, resources, "Resources fetched");
  } catch (error) {
    return next(error);
  }
}

export async function getResource(req, res, next) {
  try {
    const resource = await getResourceById(req.params.id, req.user);
    return sendSuccess(res, resource, "Resource fetched");
  } catch (error) {
    return next(error);
  }
}

export async function postResource(req, res, next) {
  try {
    const resource = await createResourceForDonor(req.body, req.user.sub);
    return sendSuccess(res, resource, "Resource created", 201);
  } catch (error) {
    return next(error);
  }
}

export async function patchResource(req, res, next) {
  try {
    const resource = await updateResource(req.params.id, req.body, req.user);
    return sendSuccess(res, resource, "Resource updated");
  } catch (error) {
    return next(error);
  }
}

export async function patchResourceVerification(req, res, next) {
  try {
    const resource = await verifyResource(req.params.id, req.body, req.user.sub);
    return sendSuccess(res, resource, "Resource verification updated");
  } catch (error) {
    return next(error);
  }
}

export async function patchResourceStatus(req, res, next) {
  try {
    const resource = await updateResourceStatus(req.params.id, req.body);
    return sendSuccess(res, resource, "Resource status updated");
  } catch (error) {
    return next(error);
  }
}
