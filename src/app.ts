import express, { Router } from "express";
import cors from "cors";


class AppWrapper {
    app: express.Application;
    constructor() {
        this.app = express();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: ["http://localhost:5173"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            maxAge: 24 * 60 * 60
        }))
    }

    public add(controller: { registerRoutes(router: Router): void }) {
        const router = Router();
        controller.registerRoutes(router);

        const route: string[] = []

        router.stack.forEach((layer) => {
            if (layer.route) {
                route.push(layer.route.path)
            }
        })

        console.log("Registered Routes: ", route);
        this.app.use("/api", router);
    }
}

const appWrapper = new AppWrapper();
export default appWrapper.app;