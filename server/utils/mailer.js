// server/utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
       user: 'jevon.boyle@ethereal.email',
        pass: 'XhnEbENpH6Z4c5H4C2'
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
