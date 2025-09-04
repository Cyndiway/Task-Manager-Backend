import nodemailer from "nodemailer";

export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    //send mail
    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject,
      html: body,
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT) || 465,
//   secure: "true", // true for 465, false for 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendMail = async ({ to, subject, html, text }) => {
//   const fromName = process.env.FROM_NAME || "Task Manager";
//   const fromEmail = process.env.FROM_EMAIL || process.env.EMAIL_USER;

//   return transporter.sendMail({
//     from: `"${fromName}" <${fromEmail}>`,
//     to,
//     subject,
//     text,
//     html,
//   });
// };

export default sendMail;
