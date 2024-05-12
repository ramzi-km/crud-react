import nodemailer from "nodemailer";

export default function     sentMail(email, subject, html) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error", error, info);
        reject(error);
      } else {
        console.log("success");
        resolve({ success: true, message: "Email sent successfull" });
      }
    });
  });
}
