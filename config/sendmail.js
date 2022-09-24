require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const SendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: `
      <div>
      <p>You have 15 mins to reset your password.</p>
      <p>Click on the link to reset your password.</p>
      <div>${text} </div>
      </div>
      `,
    });
    //console.log("Email was sent successfully");
  } catch (error) {
    //console.log("Mail error", error);
    return error;
  }
};

module.exports = SendEmail;
