import { Request, Response } from "express";
import { validationResult } from "express-validator";
import InquiryService from "./InquiryService";

class InquiryController {
  async createInquiry(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const inquiry = await InquiryService.createInquiry(req.body);

      res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        data: inquiry,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }
}

export default new InquiryController();
