import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createError from "http-errors";

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400, "Validation Error", { errors: errors.array() }));
  }
  next();
};

export default validationMiddleware;
