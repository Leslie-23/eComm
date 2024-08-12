const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

module.exports = sendEmail;
