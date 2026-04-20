import { sendSuccess } from "../../utils/api-response.js";
import {
  createRequest,
  getRequestById,
  listRequests,
  updateRequest,
  updateRequestStatus,
  verifyRequest
} from "./request.service.js";

export async function getRequests(req, res, next) {
  try {
    const requests = await listRequests(req.query, req.user);
    return sendSuccess(res, requests, "Requests fetched");
  } catch (error) {
    return next(error);
  }
}

export async function getRequest(req, res, next) {
  try {
    const request = await getRequestById(req.params.id, req.user);
    return sendSuccess(res, request, "Request fetched");
  } catch (error) {
    return next(error);
  }
}

export async function postRequest(req, res, next) {
  try {
    const request = await createRequest(req.body, req.user.sub);
    return sendSuccess(res, request, "Request created", 201);
  } catch (error) {
    return next(error);
  }
}

export async function patchRequest(req, res, next) {
  try {
    const request = await updateRequest(req.params.id, req.body, req.user);
    return sendSuccess(res, request, "Request updated");
  } catch (error) {
    return next(error);
  }
}

export async function patchRequestVerification(req, res, next) {
  try {
    const request = await verifyRequest(req.params.id, req.body, req.user.sub);
    return sendSuccess(res, request, "Request verification updated");
  } catch (error) {
    return next(error);
  }
}

export async function patchRequestStatus(req, res, next) {
  try {
    const request = await updateRequestStatus(req.params.id, req.body);
    return sendSuccess(res, request, "Request status updated");
  } catch (error) {
    return next(error);
  }
}
