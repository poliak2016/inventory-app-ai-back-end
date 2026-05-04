import { ValidationError } from "../../errors/base.error.js";

export const validate = (schema, source = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    throw new ValidationError(`Invalid request ${source}`, {
      issues: result.error.issues,
    });
  }

  req.validated = {
    ...(req.validated ?? {}),
    [source]: result.data,
  };
  return next();
};