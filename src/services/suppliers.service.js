
import { suppliersRepository } from "../repositories/suppliers.repository.js";
import { getOrganizationId } from "../shared/auth/getOrganizationId.js";

export const suppliersService = {
  async create(user, {name, email, phoneNumber}){
    const organizationId = getOrganizationId(user)

    const result = await suppliersRepository.create({name, email, phoneNumber, organizationId})
    return result 
  },

  async getAll(user){
    const organizationId = await getOrganizationId(user)

    const result = suppliersRepository.getAll(organizationId)
    return result 
  }
}