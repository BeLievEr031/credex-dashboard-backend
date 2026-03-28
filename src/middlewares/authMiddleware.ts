import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { verifyAccessToken } from "../utils/tokenUtils.js";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(createError(401, "Authentication required"));
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (_error: unknown) {
    next(createError(401, "Invalid or expired access token"));
  }
};

export default authMiddleware;
