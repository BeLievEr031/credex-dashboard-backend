import { Router } from "express";
import DashboardController from "./dashboard.controller";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

// Get dashboard statistics (total blogs & products)
router.get("/stats", authMiddleware, DashboardController.getStats.bind(DashboardController));

export default router;
