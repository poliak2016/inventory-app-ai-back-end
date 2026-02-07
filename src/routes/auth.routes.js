import {Router} from "express"
import { createUser, login, me} from "../controllers/auth.controller.js"
import { validate } from "../middleware/validation/validate.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"
import { extractToken} from "../infrastructure/auth/extract-token.js"
import { verifyJWT } from "../infrastructure/auth/jwt.js"


const router = Router()

router.get("/user", extractToken, verifyJWT, me)
router.post("/register", validate(registerSchema), createUser)
router.post("/login", validate(loginSchema), login)

export default router