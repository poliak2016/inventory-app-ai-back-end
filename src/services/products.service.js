import { ConflictError, NotFoundError, ValidationError } from "../errors/base.error.js";
import { productsRepository } from "../repositories/products.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";
import { getOrganizationId } from "../shared/auth/getOrganizationId.js";
import { CACHE_KEYS } from "../infrastructure/redis/cache.keys.js";
import { getCache, setCache, delCache } from "../infrastructure/redis/cache.helper.js";

const TTL_SECONDS = 60;

export const productsService = {
  getAll: async (user, { limit, page }) => {
    const organization_id = getOrganizationId(user);

    const offset = ( page - 1 ) * limit

    const key = CACHE_KEYS.PRODUCTS.ALL(organization_id, limit, page);

    const cached = await getCache(key);
    if (cached) return cached;

    const { rows, total } = await productsRepository.getAll(organization_id, limit, offset);

    const hasMore = offset + limit < total;

    const result = {
      products: rows,
      pagination: {
        total,
        page,
        limit,
        hasMore
      }
    }

    await setCache(key, result, TTL_SECONDS);
    return result;
  },

  getProductById: async (user, id) => {
    const organization_id = getOrganizationId(user);

    if (!id) {
      throw new ValidationError("Product id is required");
    }

    const key = CACHE_KEYS.PRODUCTS.BY_ID(organization_id, id);

    const cached = await getCache(key);
    if (cached) return cached;

    const result = await productsRepository.findById(organization_id, id);

    if (!result) {
      throw new NotFoundError("Product");
    }

    await setCache(key, result, TTL_SECONDS);
    return result;
  },

  createProduct: async (user, { categoryId, name, price, quantity }) => {
    const organization_id = getOrganizationId(user);

     if(categoryId){
          const category = await categoryRepository.findById(organization_id, categoryId)
    
          if(!category){
            throw new NotFoundError("Category")
          }
        }

    const result = await productsRepository.create({
      organization_id,
      category_id: categoryId ?? null,
      name,
      price,
      quantity,
    });

    await delCache(CACHE_KEYS.PRODUCTS.ALL(organization_id));
    return result;
  },

  updateProduct: async (user, id, productData) => {
    const organization_id = getOrganizationId(user);

    if (!id) {
      throw new ValidationError("Product id is required");
    }

    if (!productData || Object.keys(productData).length === 0) {
      throw new ValidationError("No fields provided for update");
    }

    const { categoryId, ...rest } = productData;

     if(categoryId){
          const category = await categoryRepository.findById(organization_id, categoryId)
    
          if(!category){
            throw new NotFoundError("Category")
          }
        }
    const result = await productsRepository.update(
      organization_id,
      id,
      { ...rest, category_id: categoryId ?? null }
    );

    if (!result) {
      throw new NotFoundError("Product");
    }

    await Promise.all([
      delCache(CACHE_KEYS.PRODUCTS.ALL(organization_id)),
      delCache(CACHE_KEYS.PRODUCTS.BY_ID(organization_id, id)),
    ]);

    return result;
  },

  deleteProduct: async (user, id) => {
    const organization_id = getOrganizationId(user);
    let result;
    if (!id) {
      throw new ValidationError("Product ID is required");
    }
    try {
      result = await productsRepository.delete(organization_id, id);
    } catch (error) {
      if (error.code === "23503") {
        throw new ConflictError("Stock movements exist for this product");
      }
      throw error;
    }

    if (!result) {
      throw new NotFoundError("Product");
    }

    await Promise.all([
      delCache(CACHE_KEYS.PRODUCTS.ALL(organization_id)),
      delCache(CACHE_KEYS.PRODUCTS.BY_ID(organization_id, id)),
    ]);

    return true;
  },
};