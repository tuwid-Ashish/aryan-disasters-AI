import { Router } from "express";
import {
  getRequest,
  getRequests,
  patchRequest,
  patchRequestStatus,
  patchRequestVerification,
  postRequest
} from "./request.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { allowRoles } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  validateRequestCreate,
  validateRequestStatus,
  validateRequestUpdate,
  validateRequestVerification
} from "./request.validation.js";

const router = Router();

router.get("/", protect, getRequests);
router.get("/:id", protect, getRequest);
router.post("/", protect, allowRoles("beneficiary", "admin"), validate(validateRequestCreate), postRequest);
router.patch("/:id", protect, allowRoles("beneficiary", "admin"), validate(validateRequestUpdate), patchRequest);
router.patch("/:id/verify", protect, allowRoles("admin"), validate(validateRequestVerification), patchRequestVerification);
router.patch("/:id/status", protect, allowRoles("admin"), validate(validateRequestStatus), patchRequestStatus);

export default router;
