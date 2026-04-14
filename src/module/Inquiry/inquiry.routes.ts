import { Router } from "express";
import InquiryController from "./inquiry.controller";
import { inquiryValidation } from "./inquiry.validation";

const router = Router();

/**
 * @route   POST /api/inquiry
 * @desc    Submit a new contact inquiry
 * @access  Public
 */
router.post("/", inquiryValidation, InquiryController.createInquiry);

export default router;
