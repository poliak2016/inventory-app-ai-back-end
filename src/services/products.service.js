import { ValidationError, NotFoundError } from "../errors/products/productErrors.js";
import { productsRepository } from "../repositories/products.repository.js";
import { CACHE_KEYS } from "../infrastructure/redis/cache.keys.js";
import { getCache, setCache, delCache } from "../infrastructure/redis/cache.helper.js";

const TTL_SECONDS = 60;

export const getAll = async () => {
  const key = CACHE_KEYS.PRODUCTS.ALL;

  const cached = await getCache(key);
  if (cached) return cached;

  const result = await productsRepository.getAll();

  await setCache(key, result, TTL_SECONDS);
  return result;
};

export const getProductId = async (id) => {

  if (!id) {
  throw new ValidationError("Product id is required");
}

  const key = CACHE_KEYS.PRODUCTS.BY_ID(id);

  const cached = await getCache(key);
  if (cached) return cached;

  const result = await productsRepository.findByID(id);

  if (!result) {
    throw new NotFoundError("Product does not exist");
  }

  await setCache(key, result, TTL_SECONDS);
  return result;
};

export const createProduct = async ({ name, price, quantity}) => {
  
  const result = await productsRepository.create({name, price, quantity});

  await delCache(CACHE_KEYS.PRODUCTS.ALL);
  return result;
};

export const updateProduct = async (id, productData) => {
  if (!id) {
    throw new ValidationError("Product id is required");
  }
  if (!productData || Object.keys(productData).length === 0) {
    throw new ValidationError("No fields provided for update");
  }

  const result = await productsRepository.update(id, productData);

  if (!result) {
    throw new NotFoundError("Product not found");
  }

  await Promise.all([
    delCache(CACHE_KEYS.PRODUCTS.ALL),
    delCache(CACHE_KEYS.PRODUCTS.BY_ID(id)),
  ]);

  return result;
};

export const deleteProduct = async (id) => {
  if (!id) {
    throw new ValidationError("Product ID is required");
  }

  const result = await productsRepository.delete(id);

  if (result?.rowCount === 0) {
    throw new NotFoundError("Product not found");
  }

  await Promise.all([
    delCache(CACHE_KEYS.PRODUCTS.ALL),
    delCache(CACHE_KEYS.PRODUCTS.BY_ID(id)),
  ]);

  return true;
};
