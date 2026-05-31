import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { categoryService } from "../services/category.service.js";

export const categoryController = {
  create: asyncHandler(async(req, res) => {
    const result = await categoryService.create(req.validated.body, req.user);
    return res.status(201).json({
      data: result 
    })
  }),

  update: asyncHandler(async (req, res) => {
    const result = await categoryService.update(req.validated.params.id, req.validated.body, req.user);
    return res.status(200).json({
      data: result
    });
  }),

  delete: asyncHandler(async (req, res) => {
    await categoryService.delete(req.validated.params.id, req.user);
    return res.status(204).send();
  }),

  getAll: asyncHandler(async (req, res) => {
    const result = await categoryService.getAll(req.user, req.validated.query);
    return res.status(200).json({
      data: result
    });
  }),
}
 


