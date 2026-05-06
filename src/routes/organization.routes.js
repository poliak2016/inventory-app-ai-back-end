import { Router } from "express";
import { organizationController } from "../controllers/organization.controller.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import { requireRole } from "../middleware/auth/require-role.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { updateOrganizationSchema } from "../schemas/organization.schema.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  organizationController.getMe
);

router.patch(
  "/me",
  authMiddleware,
  requireRole("admin"),
  validate(updateOrganizationSchema, "body"),
  organizationController.updateMe
);

export default router;
