// api/submit-form.js
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    console.log("Request body:", req.body); // For debugging

    const { companyName, email, phone, message, companyColors } = req.body;

    // Validate required fields
    if (!companyName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Company name, email, and phone are required",
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const emailHtml = `
      <h2>New Form Submission from The Ivana Collective Website</h2>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Brand Colors:</strong> <span style="background-color: ${companyColors}; padding: 2px 8px; color: white;">${companyColors}</span></p>
      <p><strong>Message:</strong> ${message || "No message provided"}</p>
    `;

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "theivanacollective@gmail.com",
      subject: `New Website Request from ${companyName}`,
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully"); // For debugging

    res.status(200).json({
      success: true,
      message:
        "Thank you for contacting The Ivana Collective. Your results will be emailed within 48 hrs.",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
}
