import { ValidationError } from "../errors/base.error.js";
import { categoryRepository } from "../repositories/category.repository.js";

export const categoryService = {
  async create (data, user, db){
    const {name} = data;

    if(!name || !name.trim()){
      throw new ValidationError("Category name is required")
    }
    const normalizedName = name.trim();
    return await categoryRepository.create(
      {
        name: normalizedName, 
        organization_id: user.organization_id
      }, 
      db
    );
  }
};