import mongoose from "mongoose";
import type { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  blogJSONData: object;
  bannerImgUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    blogJSONData: {
      type: Object,
      required: [true, "Blog content (JSON) is required"],
    },
    bannerImgUrl: {
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

const Blog = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
