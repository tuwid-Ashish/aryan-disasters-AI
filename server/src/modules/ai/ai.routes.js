import { Router } from "express";
import { postDisasterSummary, postExplainPriority } from "./ai.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/explain-priority", protect, postExplainPriority);
router.post("/disaster-summary", protect, postDisasterSummary);

export default router;

