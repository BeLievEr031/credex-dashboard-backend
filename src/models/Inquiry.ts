import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  selectedLicenses: string[];
  message?: string;
  type: "SELLER" | "BUYER";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    selectedLicenses: { type: [String], required: true },
    message: { type: String },
    type: { type: String, enum: ["SELLER", "BUYER"], default: "BUYER" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInquiry>("Inquiry", InquirySchema);
