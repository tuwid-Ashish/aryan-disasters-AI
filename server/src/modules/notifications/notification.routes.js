import { Router } from "express";
import { getNotifications } from "./notification.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getNotifications);

export default router;

