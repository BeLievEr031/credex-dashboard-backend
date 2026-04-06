import type { Request, Response, NextFunction } from "express";
import NewsletterService from "./NewsletterService";
import { validationResult } from "express-validator";
import createError from "http-errors";

class NewsletterController {
  async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createError(400, { message: "Validation Error", errors: errors.array() });
      }

      const subscription = await NewsletterService.subscribe(req.body);
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to the newsletter",
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  }

  async unsubscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) {
        throw createError(400, "Email is required to unsubscribe");
      }
      const result = await NewsletterService.unsubscribe(email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, active } = req.query;
      const result = await NewsletterService.list({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        active: active !== undefined ? active === "true" : undefined,
      });
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NewsletterController();
