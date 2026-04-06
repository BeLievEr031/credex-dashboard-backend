import { model, Schema, Document } from "mongoose";

export interface INewsletter extends Document {
    email: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
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

const Newsletter = model<INewsletter>("Newsletter", NewsletterSchema);

export default Newsletter;
