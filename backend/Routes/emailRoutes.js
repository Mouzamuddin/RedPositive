const express = require("express");
const router = express.Router();
const emailController = require("../Controllers/emailController");
const multer = require("multer");

const upload = multer();

router.post("/api/send-email", upload.none(), emailController.sendEmail);

module.exports = router;
