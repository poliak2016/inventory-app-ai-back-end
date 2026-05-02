import {Router} from "express"
import {refreshUserController, registerUserController, loginUserController, getMeController, logoutUserController} from "../controllers/auth.controller.js"
import { validate } from "../middleware/validation/validate.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"
import { authenticate } from "../middleware/auth/authenticate.js"


const router = Router()

router.get("/user", authenticate, getMeController)
router.post("/refresh",refreshUserController)
router.post("/register", validate(registerSchema), registerUserController)
router.post("/login", validate(loginSchema), loginUserController)
router.post("/logout", logoutUserController)


export default router