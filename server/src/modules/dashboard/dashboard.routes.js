import { Router } from "express";
import { highPriorityRequests, overview } from "./dashboard.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/overview", protect, overview);
router.get("/high-priority-requests", protect, highPriorityRequests);

export default router;
