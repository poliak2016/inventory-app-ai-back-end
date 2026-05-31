import { ValidationError } from "../../errors/base.error.js"

export const getOrganizationId = (user) => {
  if(!user?.organization_id){
    throw new ValidationError("Organization ID is required")
  }
  return user.organization_id
}