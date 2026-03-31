import swaggerJsdoc from "swagger-jsdoc";
import Config from "../config/config";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Credex Dashboard API",
      version: "1.0.0",
      description: "API documentation for Credex Dashboard Authentication and User Management",
    },
    servers: [
      {
        url: `http://localhost:${Config.PORT}/api`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },
  },
  apis: ["./src/module/**/*"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
