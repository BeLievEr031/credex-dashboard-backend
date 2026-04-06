import createError from "http-errors";
import Newsletter from "../../models/Newsletter";
import type { INewsletterSubscribeRequest, INewsletterQuery } from "./newsletter.interface";

class NewsletterService {
  async subscribe(data: INewsletterSubscribeRequest) {
    const { email } = data;

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.active) {
        throw createError(409, "This email is already subscribed");
      } else {
        existing.active = true;
        await existing.save();
        return existing;
      }
    }

    const subscription = await Newsletter.create({ email });
    return subscription;
  }

  async unsubscribe(email: string) {
    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      throw createError(404, "Subscription not found");
    }

    subscription.active = false;
    await subscription.save();
    return { success: true, message: "Unsubscribed successfully" };
  }

  async list(query: INewsletterQuery) {
    const { page = 1, limit = 10, active } = query;

    const filter: any = {};
    if (active !== undefined) {
      filter.active = active;
    }

    const skip = (page - 1) * limit;

    const subscribers = await Newsletter.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Newsletter.countDocuments(filter);

    return {
      subscribers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

export default new NewsletterService();
