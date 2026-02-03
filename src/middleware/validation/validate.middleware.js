import { ValidationError } from "../../errors/products/productErrors.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const data = req[source];
    const result = schema.safeParse(data);

   if (!result.success) {
      return next(
        new ValidationError(`Invalid request ${source}`, {
          issues: result.error.issues,
        })
      );
    }
    req[source] = result.data;
    return next();
  };
};
