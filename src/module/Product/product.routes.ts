import { Router } from "express";
import ProductController from "./product.controller.ts";
import { createProductValidation, updateProductValidation } from "./product.validation.ts";
import validationMiddleware from "../../middlewares/validationMiddleware.ts";
import authMiddleware from "../../middlewares/authMiddleware.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management and public viewing
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - validity
 *               - credits
 *             properties:
 *               product:
 *                 type: string
 *               validity:
 *                 type: string
 *               credits:
 *                 type: array
 *                 items:
 *                   type: string
 *               rateLimit:
 *                 type: string
 *               productImgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/create", authMiddleware, createProductValidation, validationMiddleware, ProductController.create.bind(ProductController));

/**
 * @swagger
 * /product/update/{id}:
 *   patch:
 *     summary: Update an existing product
 *     tags: [Product]
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
 *               product:
 *                 type: string
 *               validity:
 *                 type: string
 *               credits:
 *                 type: array
 *                 items:
 *                   type: string
 *               rateLimit:
 *                 type: string
 *               productImgUrl:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.patch("/update/:id", authMiddleware, updateProductValidation, validationMiddleware, ProductController.update.bind(ProductController));

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     tags: [Product]
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
 *         description: Product deactivated successfully
 *       404:
 *         description: Product not found
 */
router.delete("/delete/:id", authMiddleware, ProductController.delete.bind(ProductController));

/**
 * @swagger
 * /product/view/{id}:
 *   get:
 *     summary: View a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get("/view/:id", ProductController.getById.bind(ProductController));

/**
 * @swagger
 * /product/view:
 *   get:
 *     summary: List products with pagination
 *     tags: [Product]
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
 *         name: validity
 *         schema:
 *           type: string
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
 *         description: List of products retrieved successfully
 */
router.get("/view", ProductController.list.bind(ProductController));

export default router;
