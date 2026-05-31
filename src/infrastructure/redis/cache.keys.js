export const CACHE_KEYS = {
  PRODUCTS: {
    ALL: (organization_id) =>
      `products:org:${organization_id}:all`,

    BY_ID: (organization_id, productId) =>
      `products:org:${organization_id}:product:${productId}`,
  },
}