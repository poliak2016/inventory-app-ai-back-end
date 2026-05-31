import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { organizationService } from "../services/organization.service.js";

export const organizationController = {
  getMe: asyncHandler(async (req, res) => {
    const result = await organizationService.getMyOrganization(req.user);
    return res.status(200).json({
      data: result,
    });
  }),

  updateMe: asyncHandler(async (req, res) => {
    const result = await organizationService.updateMyOrganization(req.validated.body.name, req.user);
    return res.status(200).json({
      data: result,
    });
  }),
};
