import { Router } from "express";
import AuthController from "./auth.controller.js";
import { registerValidation, loginValidation, changePasswordValidation } from "./auth.validation.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
router.post("/register", registerValidation, validationMiddleware, AuthController.register.bind(AuthController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidation, validationMiddleware, AuthController.login.bind(AuthController));

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post("/refresh-token", AuthController.refreshToken.bind(AuthController));

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authMiddleware, AuthController.getProfile.bind(AuthController));

/**
 * @swagger
 * /auth/change-password:
 *   patch:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Invalid old password
 */
router.patch("/change-password", authMiddleware, changePasswordValidation, validationMiddleware, AuthController.changePassword.bind(AuthController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", AuthController.logout.bind(AuthController));

export default router;
