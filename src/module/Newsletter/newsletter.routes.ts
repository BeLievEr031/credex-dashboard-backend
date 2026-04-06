import { Router } from "express";
import NewsletterController from "./newsletter.controller";
import { subscribeValidation } from "./newsletter.validation";
import validationMiddleware from "../../middlewares/validationMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Newsletter subscription management
 */

/**
 * @swagger
 * /newsletter/subscribe:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Successfully subscribed
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already subscribed
 */
router.post("/subscribe", subscribeValidation, validationMiddleware, NewsletterController.subscribe.bind(NewsletterController));

/**
 * @swagger
 * /newsletter/unsubscribe:
 *   post:
 *     summary: Unsubscribe from the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Successfully unsubscribed
 *       404:
 *         description: Subscription not found
 */
router.post("/unsubscribe", NewsletterController.unsubscribe.bind(NewsletterController));

/**
 * @swagger
 * /newsletter/subscribers:
 *   get:
 *     summary: List all newsletter subscribers (Admin only)
 *     tags: [Newsletter]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of subscribers retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/subscribers", authMiddleware, NewsletterController.list.bind(NewsletterController));

export default router;
