import {Router} from "express"
import { createUser } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validation/validate.middleware.js"
import { registerSchema } from "../schemas/auth.schema.js"

const router = Router()

router.post("/", validate(registerSchema), createUser)

export default router