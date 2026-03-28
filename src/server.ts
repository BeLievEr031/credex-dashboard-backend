import app from "./app.ts";
import connectDB from "./db/dbConfig.ts";
import Config from "./config/config.ts";

const PORT = Config.PORT || 3000;

// Connect to Database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Documentation available at http://localhost:${PORT}/api-docs`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database. Server not started.");
    console.error(error);
});