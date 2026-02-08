import {Router} from "express"
import { createUser, login, me} from "../controllers/auth.controller.js"
import { validate } from "../middleware/validation/validate.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"
import { authenticate } from "../middleware/auth/authenticate.js"


const router = Router()

router.get("/user", authenticate, me)
router.post("/register", validate(registerSchema), createUser)
router.post("/login", validate(loginSchema), login)

export default router