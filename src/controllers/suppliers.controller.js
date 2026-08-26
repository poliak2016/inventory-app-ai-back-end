import { suppliersService } from "../services/suppliers.service.js";
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";

export const suppliersController = {
   create: asyncHandler(async (req, res) => {
    const {name, email, phoneNumber} = req.validated.body
    const newSupplier = await suppliersService.create(req.user, {name, email, phoneNumber})
    return res.status(201).json({
      status: "success",
      message: "Supplier created",
      data: newSupplier
    })
   }),

   getAll: asyncHandler(async (req, res) => {
    const suppliers = await suppliersService.getAll(req.user)
    return res.status(200).json({
      status: "success",
      data: suppliers
    })
   })
}