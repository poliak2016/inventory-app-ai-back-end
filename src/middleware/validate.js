import { ValidationError } from "../errors/ValidationError.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const data = req[source];
    const result = schema.safeParse(data);

    if (!result.success) {
      return next(new ValidationError(`Invalid request ${source}`, result.error));
    }

    req[source] = result.data;
    return next();
  };
};
