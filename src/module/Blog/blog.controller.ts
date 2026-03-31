import type { Request, Response, NextFunction } from "express";
import BlogService from "./BlogService";

class BlogController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await BlogService.create(req.body);
      res.status(201).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await BlogService.update(req.params.id as string, req.body);
      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BlogService.softDelete(req.params.id as string);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async viewBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await BlogService.getBySlug(req.params.slug as string);
      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await BlogService.getById(req.params.id as string);
      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, active, sortBy, order } = req.query;
      const result = await BlogService.list({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        active: active !== undefined ? active === "true" : true,
        sortBy: sortBy as string,
        order: order as "asc" | "desc",
      });
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async listBlogsForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, active, sortBy, order } = req.query;
      const result = await BlogService.listBlogsForAdmin({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy as string,
        order: order as "asc" | "desc",
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

export default new BlogController();
