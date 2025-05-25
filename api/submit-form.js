// api/submit-form.js
// api/send.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { name, email, brandColors } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD, // Use App Password, not Gmail password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MY_EMAIL,
      subject: "New Website Request",
      text: `Name: ${name}\nEmail: ${email}\nBrand Colors: ${brandColors}`,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Send error", error);
    res.status(500).json({ message: "Email sending failed." });
  }
};
