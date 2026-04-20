import { Router } from "express";
import { getTasks } from "./volunteer.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { allowRoles } from "../../middleware/role.middleware.js";

const router = Router();

router.get("/tasks", protect, allowRoles("volunteer", "admin"), getTasks);

export default router;

