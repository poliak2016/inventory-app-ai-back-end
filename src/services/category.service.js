import  slugify  from "slugify";
import { NotFoundError, ValidationError } from "../errors/base.error.js";
import { categoryRepository } from "../repositories/category.repository.js";

export const categoryService = {
  async create (data, user, db){
    const {name} = data;

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
        organization_id: user.organization_id
      }, 
      db
    );
  },

  async update (id, data, user, db) {
    const { name } = data;
    const normalizedName = name.trim();
    const slug = slugify(normalizedName, { lower: true, strict: true });

    const result = await categoryRepository.update(
      id,
      { name: normalizedName, slug },
      user.organization_id,
      db
    );

    if (!result) {
      throw new NotFoundError("Category");
    }

    return result;
  },

  async delete (id, user, db) {
    const result = await categoryRepository.delete(id, user.organization_id, db);

    if (!result) {
      throw new NotFoundError("Category");
    }

    return result;
  },

  async getAll (user, db) {
    return await categoryRepository.getAll(user.organization_id, db);
  }
};