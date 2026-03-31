import { Router } from "express";
import { createTestimonialValidation } from "./testimonial.validation";
import validationMiddleware from "../../middlewares/validationMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import TestimonialController from "./testimonial.controller";
import uploader from "../../utils/image.upload";


const router = Router()

// Create testimonial
router.post("/create", authMiddleware, createTestimonialValidation, validationMiddleware, TestimonialController.create.bind(TestimonialController));

// Get all testimonials
router.get("/", TestimonialController.getAll.bind(TestimonialController));

// Get single testimonial by ID
router.get("/:id", TestimonialController.getById.bind(TestimonialController));

// Update testimonial
router.put("/:id", authMiddleware, uploader.single("image"), createTestimonialValidation, validationMiddleware, TestimonialController.update.bind(TestimonialController));

// Delete testimonial
router.delete("/:id", authMiddleware, TestimonialController.delete.bind(TestimonialController));

export default router;