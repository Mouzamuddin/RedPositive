const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const emailRoutes = require("./Routes/emailRoutes");

const mongoUrl = process.env.mongoUrl;
const dbName = process.env.dbName;

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongoUrl + dbName)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.use(userRoutes);
app.use(emailRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
});
