import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./docs/swagger";
import authRoutes from "./module/Auth/auth.routes";
import blogRoutes from "./module/Blog/blog.routes";
import productRoutes from "./module/Product/product.routes";
import testimonialRoutes from "./module/Testimonial/testimonial.routes"
import dashboardRoutes from "./module/Dashboard/dashboard.routes";
import errorMiddleware from "./middlewares/errorMiddleware";

class AppWrapper {
    app: express.Application;
    constructor() {
        this.app = express();

        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: ["http://localhost:5173"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            maxAge: 24 * 60 * 60
        }))

        // Swagger Documentation
        // this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // API Routes
        const apiRouter = Router();
        apiRouter.use("/auth", authRoutes);
        apiRouter.use("/blog", blogRoutes);
        apiRouter.use("/product", productRoutes);
        apiRouter.use("/testimonial", testimonialRoutes);
        apiRouter.use("/dashboard", dashboardRoutes);

        this.app.use("/api", apiRouter);

        // Global Error Handling
        this.app.use(errorMiddleware);
    }
}

const appWrapper = new AppWrapper();
export default appWrapper.app;