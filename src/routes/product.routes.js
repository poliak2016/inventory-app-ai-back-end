import { Router } from "express";
import {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductData,
  deleteProductData,
} from "../controllers/products.controller.js";
import { validate, } from "../middleware/validation/validate.middleware.js";
import { requireRole } from "../middleware/auth/require-role.js"
import { createProductSchema,  updateProductSchema, validateIdSchema } from "../schemas/product.schema.js";
import { authenticate } from "../middleware/auth/authenticate.js";

const router = Router();

router.get("/", getProducts)
router.get("/:id", validate(validateIdSchema(), "params"), getProductById)
router.post("/", validate(createProductSchema, "body"), createNewProduct)
router.put("/:id", validate(validateIdSchema(), "params"), validate(updateProductSchema, "body"), updateProductData)
router.delete(
  "/:id", 
  authenticate,
  requireRole("admin"), 
  validate(validateIdSchema(), "params"), 
  deleteProductData)

export default router;