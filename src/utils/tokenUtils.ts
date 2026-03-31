import jwt from "jsonwebtoken";
import Config from "../config/config";
import type { IJwtPayload } from "../module/Auth/auth.interface";

export const generateAccessToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, Config.ACCESS_TOKEN_SECRET, {
    expiresIn: Config.ACCESS_TOKEN_EXPIRES_IN as any,
  });
};

export const generateRefreshToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, Config.REFRESH_TOKEN_SECRET, {
    expiresIn: Config.REFRESH_TOKEN_EXPIRES_IN as any,
  });
};

export const verifyAccessToken = (token: string): IJwtPayload => {
  return jwt.verify(token, Config.ACCESS_TOKEN_SECRET) as IJwtPayload;
};

export const verifyRefreshToken = (token: string): IJwtPayload => {
  return jwt.verify(token, Config.REFRESH_TOKEN_SECRET) as IJwtPayload;
};
