import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import authRoutes from "./module/Auth/auth.routes.js";
import blogRoutes from "./module/Blog/blog.routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

class AppWrapper {
    app: express.Application;
    constructor() {
        this.app = express();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: ["http://localhost:5173"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            maxAge: 24 * 60 * 60
        }))

        // Swagger Documentation
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // API Routes
        const apiRouter = Router();
        apiRouter.use("/auth", authRoutes);
        apiRouter.use("/blog", blogRoutes);
        
        this.app.use("/api", apiRouter);

        // Global Error Handling
        this.app.use(errorMiddleware);
    }
}

const appWrapper = new AppWrapper();
export default appWrapper.app;