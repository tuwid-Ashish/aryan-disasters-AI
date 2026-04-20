import { Router } from "express";
import {
  getResource,
  getResources,
  patchResource,
  patchResourceStatus,
  patchResourceVerification,
  postResource
} from "./resource.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { allowRoles } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  validateResourceCreate,
  validateResourceStatus,
  validateResourceUpdate,
  validateResourceVerification
} from "./resource.validation.js";

const router = Router();

router.get("/", protect, getResources);
router.get("/:id", protect, getResource);
router.post("/", protect, allowRoles("donor", "admin"), validate(validateResourceCreate), postResource);
router.patch("/:id", protect, allowRoles("donor", "admin"), validate(validateResourceUpdate), patchResource);
router.patch("/:id/verify", protect, allowRoles("admin"), validate(validateResourceVerification), patchResourceVerification);
router.patch("/:id/status", protect, allowRoles("admin"), validate(validateResourceStatus), patchResourceStatus);

export default router;
