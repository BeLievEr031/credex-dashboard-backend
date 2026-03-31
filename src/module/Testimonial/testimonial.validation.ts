import { body } from "express-validator";

export const createTestimonialValidation = [
    body("feedback")
        .notEmpty()
        .withMessage("feedback is required")
        .isString()
        .withMessage("feedback must be a string"),
    body("designation")
        .notEmpty()
        .withMessage("designation is required")
        .isString()
        .withMessage("designation must be a string"),
    body("company")
        .notEmpty()
        .withMessage("company is required")
        .isString()
        .withMessage("company must be a string"),
];