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
  const message = {
    from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);

  const info = await transporter.sendMail(message);
  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
};

module.exports = sendEmail;
