import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create the sendMail function
const sendMail = async (options) => {
  // Generate a transporter using SMTP with secure options
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT, 
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Define email options
  const mailOptions = {
    from: `"Your Name" <${process.env.EMAIL_USER}>`,
    to: options.email, 
    subject: options.subject, 
    text: options.message, 
    html: options.html || null, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
} catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
}
};

export default sendMail;
