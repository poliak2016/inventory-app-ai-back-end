import { NotFoundError } from "../errors/base.error.js";
import { organizationRepository } from "../repositories/organizations.repository.js";

export const organizationService = {
  async getMyOrganization(user, db) {
    const org = await organizationRepository.findById(user.organization_id, db);

    if (!org) {
      throw new NotFoundError("Organization");
    }

    return org;
  },

  async updateMyOrganization(name, user, db) {
    const trimmedName = name.trim();

    const result = await organizationRepository.update(user.organization_id, trimmedName, db);

    if (!result) {
      throw new NotFoundError("Organization");
    }

    return result;
  },
};
