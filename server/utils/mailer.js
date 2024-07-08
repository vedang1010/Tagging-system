// server/utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: process.env.EMAIL_PORT,
    auth: {
      user: `${process.env.EMAIL_HOST_USER}`,
      pass: `${process.env.EMAIL_HOST_PASSWORD}`
    }
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'torrey23@ethereal.email',
    to,
    subject,
    text
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
