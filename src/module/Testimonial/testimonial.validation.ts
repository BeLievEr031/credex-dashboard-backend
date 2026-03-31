import { body } from "express-validator";

export const createTestimonialValidation = [
    body("feedback")
        .notEmpty()
        .withMessage("feedback is required")
        .isString()
        .withMessage("feedback must be a string"),
];