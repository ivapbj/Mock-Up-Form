const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS, // Never hardcode passwords!
  },
});

// Handle Form Submission
app.post("/api/submit-form", async (req, res) => {
  const { companyName, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to the same email
    subject: "New Form Submission",
    html: `
      <h2>New Form Submission</h2>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      message:
        "Thank you for contacting The Ivana Collective. Your results will be emailed within 48 hrs.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email could not be sent." });
  }
});

// Export for Vercel (DO NOT USE `app.listen(PORT)`)
module.exports = app;
