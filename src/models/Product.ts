import mongoose from "mongoose";
import type { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  product: string;
  validity: string;
  credits: string[];
  rateLimit?: string;
  productImgUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    validity: {
      type: String,
      required: [true, "Validity period is required"],
      trim: true,
    },
    credits: {
      type: [String],
      required: [true, "Credits are required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Credits must be a non-empty array",
      },
    },
    rateLimit: {
      type: String,
      trim: true,
    },
    productImgUrl: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
