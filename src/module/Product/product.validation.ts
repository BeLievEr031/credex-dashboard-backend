import { body } from "express-validator";

export const createProductValidation = [
  body("product")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string"),
  body("validity")
    .notEmpty()
    .withMessage("Validity period is required")
    .isString()
    .withMessage("Validity period must be a string"),
  body("credits")
    .notEmpty()
    .withMessage("Credits are required")
    .isArray({ min: 1 })
    .withMessage("Credits must be a non-empty array of strings"),
  body("credits.*")
    .isString()
    .withMessage("Each credit must be a string"),
  body("rateLimit")
    .optional()
    .isString()
    .withMessage("Rate limit must be a string"),
  body("productImgUrl")
    .optional()
    .isURL()
    .withMessage("Product image URL must be a valid URL"),
];

export const updateProductValidation = [
  body("product")
    .optional()
    .isString()
    .withMessage("Product name must be a string"),
  body("validity")
    .optional()
    .isString()
    .withMessage("Validity period must be a string"),
  body("credits")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Credits must be a non-empty array of strings"),
  body("credits.*")
    .isString()
    .withMessage("Each credit must be a string"),
  body("rateLimit")
    .optional()
    .isString()
    .withMessage("Rate limit must be a string"),
  body("productImgUrl")
    .optional()
    .isURL()
    .withMessage("Product image URL must be a valid URL"),
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
];
