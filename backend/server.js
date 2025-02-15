const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config(); // If using environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "theivanacollective@gmail.com", // Your email
    pass: "hjan dcsm bkit jipt", // Replace with the generated App Password
  },
});

// Handle Form Submission
app.post("/api/submit-form", async (req, res) => {
  const { companyName, email, phone, message } = req.body;

  const mailOptions = {
    from: "theivanacollective@gmail.com",
    to: "theivanacollective@gmail.com", // Where the form data should be sent
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
