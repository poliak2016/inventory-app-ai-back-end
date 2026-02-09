import { Router } from "express";
import {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductData,
  deleteProductData,
} from "../controllers/products.controller.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { createProductSchema,  updateProductSchema, validateIdSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/", getProducts)
router.get("/:id", validate(validateIdSchema(), "params"), getProductById)
router.post("/", validate(createProductSchema, "body"), createNewProduct)
router.put("/:id", validate(validateIdSchema(), "params"), validate(updateProductSchema, "body"), updateProductData)
router.delete("/:id", validate(validateIdSchema(), "params"), deleteProductData)

export default router;