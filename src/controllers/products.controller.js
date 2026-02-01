import { NotFoundError, ValidationError } from "../errors/products/productErrors.js";
import {
   getAll,
   getProductId,
   createProduct,
   updateProduct,
   deleteProduct
  } from "../services/products.service.js";
import {asyncHandler} from "../middleware/api/async-handler.middleware.js";

export const getProducts = asyncHandler (async (req, res) => {
 
 const products = await getAll();
 res.status(200).json({
    status: "success",
    data: products
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const {id} = req.params
  if (!id){
    throw new ValidationError("Product ID is required")
  }
  const product = await getProductId(id);
  if(!product){
    throw new NotFoundError()
 }
  res.status(200).json({
    status: "success",
    data: product
  })
}); 

export const createNewProduct = asyncHandler(async(req, res) => {
  const {name, price, quantity} = req.body
  if (!name || price === null || quantity === null){
    throw new ValidationError("name, price, quantity are required")
  }
  const newProduct = await createProduct({name, price, quantity});
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

export const updateProductData = asyncHandler(async (req, res) =>{
  const {id} = req.params
  if (!id) {
    throw new ValidationError ("Product ID is required")
  };
  const updated = await updateProduct(id, req.body);
  if (!updated) {
    throw new NotFoundError ("Product")
  };
  res.status(200).json({
    status: "success",
    data: updated
});
});

export const deleteProductData = asyncHandler(async (req, res) =>{
  const {id} = req.params
  if (!id) {
    throw new ValidationError ("Product ID is required")
  };
  const deleted = await deleteProduct(id);
  if (!deleted) {
    throw new NotFoundError ("Product")
  };
  res.status(204).json({
    status: "success",
    message: "Product deleted successfully"
});
});