const { PORT } = require("./config");
const { app } = require("./app");
const { connectDB } = require("./database/connection");

async function startServer() {
  await connectDB();
}

(async () => {
  try {
    console.log("Starting server...");
    await startServer();
    // const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();
