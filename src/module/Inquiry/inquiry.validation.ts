import { body } from "express-validator";

export const inquiryValidation = [
  body("firstName").notEmpty().withMessage("First name is required").trim(),
  body("lastName").notEmpty().withMessage("Last name is required").trim(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("companyName").notEmpty().withMessage("Company name is required"),
  body("selectedLicenses")
    .isArray({ min: 1 })
    .withMessage("At least one license must be selected"),
  body("otherPlatforms").optional().trim(),
  body("message").optional().trim(),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["SELLER", "BUYER"])
    .withMessage("Type must be SELLER or BUYER"),
];
