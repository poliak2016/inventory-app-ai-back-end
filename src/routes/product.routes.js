import { Router } from "express";
import {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductData,
  deleteProductData,
} from "../controllers/products.controller.js";
import { validate } from "../middleware/validate.js";
import { createProductSchema } from "../schemas/productSchema.js";
import { validateIdSchema } from "../schemas/validateIdSchema.js";
import { updateProductSchema } from "../schemas/updateProductSchema.js";

const router = Router();

router.get("/", getProducts)
router.get("/:id", validate(validateIdSchema(), "params"), getProductById)
router.post("/", validate(createProductSchema, "body"), createNewProduct)
router.put("/:id", validate(validateIdSchema(), "params"), validate(updateProductSchema, "body"), updateProductData)
router.delete("/:id", validate(validateIdSchema(), "params"), deleteProductData)

export default router;