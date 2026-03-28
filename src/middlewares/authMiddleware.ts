import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { verifyAccessToken } from "../utils/tokenUtils.ts";

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
    console.log("error: ", _error)
    next(createError(401, "Invalid or expired access token"));
  }
};

export default authMiddleware;
