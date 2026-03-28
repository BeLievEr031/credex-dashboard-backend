import { Request, Response, NextFunction } from "express";
import AuthService from "./AuthSevice.js";

class AuthController {
  private setCookie(res: Response, name: string, token: string, maxAge: number) {
    res.cookie(name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge,
    });
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(req.body);

      // Set cookies (15 mins for access, 7 days for refresh)
      this.setCookie(res, "accessToken", accessToken, 15 * 60 * 1000);
      this.setCookie(res, "refreshToken", refreshToken, 7 * 24 * 60 * 60 * 1000);

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.status(401).json({ success: false, message: "Refresh token not found" });
      }

      const { accessToken, refreshToken } = await AuthService.refreshToken(token);

      this.setCookie(res, "accessToken", accessToken, 15 * 60 * 1000);
      this.setCookie(res, "refreshToken", refreshToken, 7 * 24 * 60 * 60 * 1000);

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const profile = await AuthService.getProfile(userId);
      res.status(200).json({
        success: true,
        user: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await AuthService.changePassword(userId, req.body);

      // Clear cookies to force re-login
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}

export default new AuthController();
