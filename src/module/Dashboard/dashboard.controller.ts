import type { Request, Response, NextFunction } from "express";
import Blog from "../../models/Blog.ts";
import Product from "../../models/Product.ts";

class DashboardController {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      // Get counts from the database
      const totalBlogs = await Blog.countDocuments();
      const totalProducts = await Product.countDocuments({ active: true });

      res.status(200).json({
        success: true,
        message: "Dashboard stats retrieved successfully",
        data: {
          totalBlogs,
          totalProducts
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();
