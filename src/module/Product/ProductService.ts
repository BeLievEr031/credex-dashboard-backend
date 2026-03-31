import createError from "http-errors";
import Product from "../../models/Product.ts";
import type { IProductCreateRequest, IProductUpdateRequest, IProductQuery } from "./product.interface.ts";

class ProductService {
  async create(data: IProductCreateRequest) {
    const product = await Product.create(data);
    return product;
  }

  async update(id: string, data: IProductUpdateRequest) {
    const product = await Product.findById(id);
    if (!product) {
      throw createError(404, "Product not found");
    }

    Object.assign(product, data);
    await product.save();
    return product;
  }

  async softDelete(id: string) {
    const product = await Product.findById(id);
    if (!product) {
      throw createError(404, "Product not found");
    }

    product.active = false;
    await product.save();
    return { success: true, message: "Product deactivated successfully" };
  }

  async getById(id: string) {
    const product = await Product.findOne({ _id: id, active: true });
    if (!product) {
      throw createError(404, "Product not found");
    }
    return product;
  }

  async list(query: IProductQuery) {
    const { page = 1, limit = 10, active = true, validity, sortBy = "createdAt", order = "desc" } = query;

    const filter: Record<string, unknown> = { active };
    if (validity) {
      filter.validity = validity;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

export default new ProductService();
