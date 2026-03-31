import type { Request, Response, NextFunction } from "express";
import ProductService from "./ProductService.ts";
import { cloudinary } from "../../utils/image.upload.ts";

class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {

      if (req.body.image) {
        const result = await cloudinary.uploader.upload(req.body.image);
        req.body.productImgUrl = result.secure_url;
        req.body.image = result.secure_url;
        req.body.publicId = result.public_id;
      }

      const product = await ProductService.create(req.body);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.image) {
        const product = await ProductService.getById(req.params.id as string);
        if (product.publicId) {
          await cloudinary.uploader.destroy(product.publicId);
        }
        const result = await cloudinary.uploader.upload(req.body.image);
        req.body.productImgUrl = result.secure_url;
        req.body.image = result.secure_url;
        req.body.publicId = result.public_id;
      }
      const product = await ProductService.update(req.params.id as string, req.body);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProductService.softDelete(req.params.id as string);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getById(req.params.id as string);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, active, validity, sortBy, order } = req.query;
      const result = await ProductService.list({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        active: active !== undefined ? active === "true" : true,
        validity: validity as string,
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

export default new ProductController();
