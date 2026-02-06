import {Router} from "express"
import { createUser, getUser, login} from "../controllers/auth.controller.js"
import { validate } from "../middleware/validation/validate.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"

const router = Router()

router.get("/register", getUser)
router.post("/register", validate(registerSchema), createUser)
router.post("/login", validate(loginSchema), login)

export default router