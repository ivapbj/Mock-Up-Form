// api/submit-form.js
import multer from "multer";
import { createRouter, expressWrapper } from "next-connect";
import nodemailer from "nodemailer";

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const router = createRouter();

// Use multer middleware
router.use(expressWrapper(upload.single("file")));

router.post(async (req, res) => {
  try {
    const { companyName, email, phone, message, companyColors } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
      from: process.env.EMAIL_USER,
      to: "theivanacollective@gmail.com",
      subject: `New Form Submission from ${companyName}`,
      html: emailContent,
    };

    // Add attachment if a file was uploaded
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          encoding: "base64",
        },
      ];
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
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

export default router.handler();

// Configure Next.js to handle FormData
export const config = {
  api: {
    bodyParser: false,
  },
};
