import { Router } from "express";
import { getDisaster, getDisasters, patchDisaster, postDisaster } from "./disaster.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { allowRoles } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { validateDisasterCreate, validateDisasterUpdate } from "./disaster.validation.js";

const router = Router();

router.get("/", protect, getDisasters);
router.get("/:id", protect, getDisaster);
router.post("/", protect, allowRoles("admin"), validate(validateDisasterCreate), postDisaster);
router.patch("/:id", protect, allowRoles("admin"), validate(validateDisasterUpdate), patchDisaster);

export default router;
