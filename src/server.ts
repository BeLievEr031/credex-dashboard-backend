import app from "./app.js";
import connectDB from "./db/dbConfig.js";
import Config from "./config/config.js";

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