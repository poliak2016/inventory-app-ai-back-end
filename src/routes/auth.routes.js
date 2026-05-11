import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { registerSchema, loginSchema } from "../validationSchemas/auth.schema.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";

const router = Router();

router.get("/user", authMiddleware, authController.currentUser);
router.post("/refresh", authController.refresh);
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);


export default router