import { body } from "express-validator";

export const createBlogValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be URL-friendly (small letters, numbers, and dashes)"),
  body("blogJSONData")
    .notEmpty()
    .withMessage("Blog content (JSON) is required")
    .isObject()
    .withMessage("Blog content must be a JSON object"),
  body("bannerImgUrl")
    .optional()
    .isURL()
    .withMessage("Banner image URL must be a valid URL"),
];

export const updateBlogValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string"),
  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be URL-friendly"),
  body("blogJSONData")
    .optional()
    .isObject()
    .withMessage("Blog content must be a JSON object"),
  body("bannerImgUrl")
    .optional()
    .isURL()
    .withMessage("Banner image URL must be a valid URL"),
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
];
