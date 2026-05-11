import slugify from "slugify";
import { NotFoundError, ValidationError } from "../errors/base.error.js";
import { categoryRepository } from "../repositories/category.repository.js";
import { getOrganizationId } from "../shared/auth/getOrganizationId.js";

export const categoryService = {
  async create (data, user, db){
    const {name} = data;
    const organization_id = getOrganizationId(user);

    if(!name || !name.trim()){
      throw new ValidationError("Category name is required")
    }
    const normalizedName = name.trim();
     const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
    });
    return await categoryRepository.create(
      {
        name: normalizedName, 
        slug,
        organization_id,
      }, 
      db
    );
  },

  async update (id, data, user, db) {
    const organization_id = getOrganizationId(user);
    const { name } = data;
    const normalizedName = name.trim();
    const slug = slugify(normalizedName, { lower: true, strict: true });

    const result = await categoryRepository.update(
      id,
      { name: normalizedName, slug },
      organization_id,
      db
    );

    if (!result) {
      throw new NotFoundError("Category");
    }

    return result;
  },

  async delete (id, user, db) {
    const organization_id = getOrganizationId(user);
    const result = await categoryRepository.delete(id, organization_id, db);

    if (!result) {
      throw new NotFoundError("Category");
    }

    return result;
  },

  async getAll (user, db) {
    const organization_id = getOrganizationId(user);
    return await categoryRepository.getAll(organization_id, db);
  }
};