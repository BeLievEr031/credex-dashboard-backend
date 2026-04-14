import nodemailer from "nodemailer";
import Inquiry from "../../models/Inquiry";
import type { IInquiryRequest } from "./inquiry.interface";
import config from "../../config/config";

class InquiryService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD, // App password provided by user
    },
  });

  async createInquiry(data: IInquiryRequest) {
    // 1. Store in MongoDB
    const inquiry = await Inquiry.create(data);

    // 2. Send Email
    const mailOptions = {
      from: `"Credex Inquiry" <sandy@gmail.com>`,
      to: "sandyrajak031@gmail.com",
      subject: `New Contact Inquiry from ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #000;">New Inquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${data.companyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Licenses Interest</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${data.selectedLicenses.join(", ")}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p>${data.message || "No message provided"}</p>
          </div>
          <hr />
          <p style="font-size: 12px; color: #888;">This inquiry was stored in the database at ${new Date().toLocaleString()}.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Nodemailer Error:", error);
      // We still return the inquiry because it was saved to the DB
      // But we might want to log this or handle it depending on requirements
    }

    return inquiry;
  }
}

export default new InquiryService();
