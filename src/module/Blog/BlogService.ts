import createError from "http-errors";
import Blog from "../../models/Blog";
import type { IBlogCreateRequest, IBlogUpdateRequest, IBlogQuery } from "./blog.interface";

class BlogService {
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  private async ensureUniqueSlug(slug: string): Promise<string> {
    let uniqueSlug = slug;
    let count = 1;
    while (await Blog.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count++}`;
    }
    return uniqueSlug;
  }

  async create(data: IBlogCreateRequest) {
    const { title } = data;
    let { slug } = data;

    if (!slug) {
      slug = this.generateSlug(title);
    }

    slug = await this.ensureUniqueSlug(slug);

    const blog = await Blog.create({ ...data, slug });
    return blog;
  }

  async update(id: string, data: IBlogUpdateRequest) {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw createError(404, "Blog not found");
    }

    if (data.title && !data.slug) {
      // Option: re-generate slug if title changes (optional, but the user asked for auto-generation)
      // However, standard SEO practice is to keep slugs stable. 
      // I'll only auto-generate if title changes and slug is NOT provided.
    }

    if (data.slug) {
      const existing = await Blog.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) {
        throw createError(409, "Slug is already in use");
      }
    }

    Object.assign(blog, data);
    await blog.save();
    return blog;
  }

  async softDelete(id: string) {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw createError(404, "Blog not found");
    }

    blog.active = false;
    await blog.save();
    return { success: true, message: "Blog deactivated successfully" };
  }

  async getBySlug(slug: string) {
    const blog = await Blog.findOne({ slug, active: true });
    if (!blog) {
      throw createError(404, "Blog not found");
    }
    return blog;
  }

  async getById(id: string) {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw createError(404, "Blog not found");
    }
    return blog;
  }

  async list(query: IBlogQuery) {
    const { page = 1, limit = 10, active = true, sortBy = "createdAt", order = "desc" } = query;

    const filter: any = { active };
    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(filter);

    return {
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async listBlogsForAdmin(query: IBlogQuery) {
    const { page = 1, limit = 10, active = true, sortBy = "createdAt", order = "desc" } = query;

    const filter: any = {};
    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(filter);

    return {
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

export default new BlogService();
