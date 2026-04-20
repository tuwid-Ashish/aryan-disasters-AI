import { Router } from "express";
import { getAllocations, postSuggestions } from "./allocation.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { allowRoles } from "../../middleware/role.middleware.js";

const router = Router();

router.get("/", protect, allowRoles("admin"), getAllocations);
router.post("/suggestions", protect, allowRoles("admin"), postSuggestions);

export default router;

