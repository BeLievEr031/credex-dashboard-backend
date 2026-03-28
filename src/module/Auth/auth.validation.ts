import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export const changePasswordValidation = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
];
