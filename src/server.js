const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "theivanacollective@gmail.com",
    pass: process.env.EMAIL_PASS, // You need to set this in your .env file
  },
});

// Handle Form Submission
app.post("/api/submit-form", upload.single("file"), async (req, res) => {
  try {
    const { companyName, email, phone, message, companyColors } = req.body;

    // Prepare email content
    let emailContent = `
      <h2>New Form Submission from The Ivana Collective Website</h2>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company Colors:</strong> ${companyColors}</p>
      <p><strong>Message:</strong> ${message || "No message provided"}</p>
    `;

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER || "theivanacollective@gmail.com",
      to: "theivanacollective@gmail.com", // Your email
      subject: `New Form Submission from ${companyName}`,
      html: emailContent,
    };

    // Add attachment if a file was uploaded
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ];
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message:
        "Thank you for contacting The Ivana Collective. Your results will be emailed within 48 hrs.",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({
      success: false,
      error: "There was an error processing your submission. Please try again.",
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel or other serverless deployments
module.exports = app;
