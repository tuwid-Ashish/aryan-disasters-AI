import { Router } from "express";
import { login, me, register } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { validateLogin, validateRegister } from "./auth.validation.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(validateRegister), register);
router.post("/login", validate(validateLogin), login);
router.get("/me", protect, me);

export default router;

