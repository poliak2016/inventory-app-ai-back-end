import { productsService } from "../services/products.service.js";
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";

export const productsController = {
  getProducts: asyncHandler(async (req, res) => {
    const { products, pagination } = await productsService.getAll(req.user, req.validated.query);
    return res.status(200).json({
      status: "success",
      data: { products, pagination },
    });
  }),

  getProductById: asyncHandler(async (req, res) => {
    const { id } = req.validated.params;
    const product = await productsService.getProductById(req.user, id);
    return res.status(200).json({
      status: "success",
      data: product,
    });
  }),

  createProduct: asyncHandler(async (req, res) => {
    const { name, price, quantity, categoryId } = req.validated.body;
    const newProduct = await productsService.createProduct(req.user, { name, price, quantity, categoryId });
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const { id } = req.validated.params;
    const updated = await productsService.updateProduct(req.user, id, req.validated.body);
    res.status(200).json({
      status: "success",
      data: updated,
    });
  }),

  deleteProduct: asyncHandler(async (req, res) => {
    const { id } = req.validated.params;
    await productsService.deleteProduct(req.user, id);
    res.status(204).send();
  }),
};