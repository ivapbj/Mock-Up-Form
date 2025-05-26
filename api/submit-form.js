// api/submit-form.js
const nodemailer = require("nodemailer");
const multer = require("multer");

// Configure multer for file uploads (in memory storage for Vercel)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    // Handle multipart form data (for file uploads)
    upload.single("logo")(req, res, async (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res
          .status(400)
          .json({ message: "File upload error: " + err.message });
      }

      const { companyName, email, phone, message, companyColors } = req.body;
      const logoFile = req.file;

      // Validate required fields
      if (!companyName || !email || !phone) {
        return res
          .status(400)
          .json({ message: "Company name, email, and phone are required" });
      }

      // Create transporter
      const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "theivanacollective@gmail.com",
          pass: process.env.EMAIL_PASS, // Use App Password
        },
      });

      // Prepare email content
      const emailText = `
New Website Request Form Submission

Company Name: ${companyName}
Email: ${email}
Phone: ${phone}
Brand Colors: ${companyColors}
Message: ${message || "No message provided"}
Logo: ${logoFile ? "Logo file attached" : "No logo uploaded"}
      `.trim();

      const emailHtml = `
        <h2>New Form Submission from The Ivana Collective Website</h2>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Brand Colors:</strong> <span style="background-color: ${companyColors}; padding: 2px 8px; color: white;">${companyColors}</span></p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
        <p><strong>Logo:</strong> ${
          logoFile ? "Logo file attached" : "No logo uploaded"
        }</p>
      `;

      // Prepare email options
      const mailOptions = {
        from: process.env.EMAIL_USER || "theivanacollective@gmail.com", // Use your Gmail as sender
        replyTo: email, // Set client's email as reply-to
        to: "theivanacollective@gmail.com",
        subject: `New Website Request from ${companyName}`,
        text: emailText,
        html: emailHtml,
      };

      // Add attachment if logo was uploaded
      if (logoFile) {
        mailOptions.attachments = [
          {
            filename: logoFile.originalname,
            content: logoFile.buffer,
            contentType: logoFile.mimetype,
          },
        ];
      }

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message:
          "Thank you for contacting The Ivana Collective. Your results will be emailed within 48 hrs.",
      });
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
};
