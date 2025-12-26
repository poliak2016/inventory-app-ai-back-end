import { Router } from "express";
import {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductData,
  deleteProductData,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", createNewProduct)
router.put("/:id", updateProductData)
router.delete("/:id", deleteProductData)

export default router;