import { productsService } from "../services/products.service.js";
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";

export const productsController = {
  getProducts: asyncHandler(async (req, res) => {
    const products = await productsService.getAll(req.user);
    res.status(200).json({
      status: "success",
      data: products,
    });
  }),

  getProductById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getProductById(req.user, id);
    res.status(200).json({
      status: "success",
      data: product,
    });
  }),

  createProduct: asyncHandler(async (req, res) => {
    const { name, price, quantity } = req.body;
    const newProduct = await productsService.createProduct(req.user, { name, price, quantity });
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updated = await productsService.updateProduct(req.user, id, req.body);
    res.status(200).json({
      status: "success",
      data: updated,
    });
  }),

  deleteProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await productsService.deleteProduct(req.user, id);
    res.status(204).json({
      status: "success",
      message: "Product deleted successfully",
    });
  }),
};