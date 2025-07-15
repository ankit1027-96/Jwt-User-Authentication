const express = require("express");
const app = express();
const moongoose = require("mongoose");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));

const connectDB = async () => {
  try {
    await moongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
