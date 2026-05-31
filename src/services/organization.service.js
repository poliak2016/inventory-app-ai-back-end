import { NotFoundError } from "../errors/base.error.js";
import { organizationRepository } from "../repositories/organizations.repository.js";
import { getOrganizationId } from "../shared/auth/getOrganizationId.js";

export const organizationService = {
  async getMyOrganization(user, db) {
    const organization_id = getOrganizationId(user);
    const org = await organizationRepository.findById(organization_id, db);

    if (!org) {
      throw new NotFoundError("Organization");
    }

    return org;
  },

  async updateMyOrganization(name, user, db) {
    const organization_id = getOrganizationId(user);
    const trimmedName = name.trim();

    const result = await organizationRepository.update(organization_id, trimmedName, db);

    if (!result) {
      throw new NotFoundError("Organization");
    }

    return result;
  },
};
