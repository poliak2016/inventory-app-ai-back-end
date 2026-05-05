import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { categoryService } from "../services/category.service.js";

export const categoryController = {
  create: asyncHandler(async(req, res) => {
    const result = await categoryService.create(req.body, req.user);
    return res.status(201).json({
      data: result 
    })
  })
}
 


