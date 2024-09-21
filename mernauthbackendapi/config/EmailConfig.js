import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  // host: process.env.EMAIL_HOST,
  host: "smtp.gmail.com",
  // port: process.env.EMAIL_PORT,
  port: 587,
  ignoreTLS: false,
  secure: false, // true for 465, false for other ports
  auth: {
    // user: process.env.EMAIL_USER, // Admin Gmail ID
    user: "skweb282@gmail.com", // Admin Gmail ID
    // pass: process.env.EMAIL_PASS, // Admin Gmail password
    pass: "hopk hqml bmgz llpp", // Admin Gmail password
  },
});
export default transporter;
