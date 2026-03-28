import { Router } from "express";
import BlogController from "./blog.controller.js";
import { createBlogValidation, updateBlogValidation } from "./blog.validation.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management and public viewing
 */

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - blogJSONData
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               blogJSONData:
 *                 type: object
 *               bannerImgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/create", authMiddleware, createBlogValidation, validationMiddleware, BlogController.create.bind(BlogController));

/**
 * @swagger
 * /blog/update/{id}:
 *   patch:
 *     summary: Update an existing blog post
 *     tags: [Blog]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               blogJSONData:
 *                 type: object
 *               bannerImgUrl:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.patch("/update/:id", authMiddleware, updateBlogValidation, validationMiddleware, BlogController.update.bind(BlogController));

/**
 * @swagger
 * /blog/delete/{id}:
 *   delete:
 *     summary: Soft delete a blog post
 *     tags: [Blog]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deactivated successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/delete/:id", authMiddleware, BlogController.delete.bind(BlogController));

/**
 * @swagger
 * /blog/view/{slug}:
 *   get:
 *     summary: View a blog post by slug
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *       404:
 *         description: Blog not found
 */
router.get("/view/:slug", BlogController.viewBySlug.bind(BlogController));

/**
 * @swagger
 * /blog/view:
 *   get:
 *     summary: List blog posts with pagination
 *     tags: [Blog]
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
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of blogs retrieved successfully
 */
router.get("/view", BlogController.list.bind(BlogController));

export default router;
