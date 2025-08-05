require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3001;

// Connect DB
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Shutdown SIGTERM termination signal by container or OS
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

// SIGINT siganl interrupt when you press ctrl + c
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});
