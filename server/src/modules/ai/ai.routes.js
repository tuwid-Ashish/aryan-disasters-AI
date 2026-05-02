import { Router } from "express";
import { postDisasterSummary, postExplainPriority, postMatchResources } from "./ai.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { aiRateLimit } from "./ai.rate-limit.js";
import { disasterSummarySchema, explainPrioritySchema, matchResourcesSchema } from "./ai.validation.js";

const router = Router();

router.post("/explain-priority", protect, aiRateLimit, validate(explainPrioritySchema), postExplainPriority);
router.post("/disaster-summary", protect, aiRateLimit, validate(disasterSummarySchema), postDisasterSummary);
router.post("/match-resources", protect, aiRateLimit, validate(matchResourcesSchema), postMatchResources);

export default router;

