const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const mailer = asyncHandler(
  async (data, callback, requestObject, responseObject) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SENDMAIL_HOST_SERVER,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SENDMAIL_ACCOUNT_ID, // generated ethereal user
        pass: process.env.SENDMAIL_AUTH_STRING, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Kelvin Kabute 👻" <skipgh@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: "Hello ✔ " + data.subject, // Subject line
      text: data.message, // plain text body
      html: data.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    let reqStatus, message;
    if (info.accepted) {
      reqStatus = 100;
      message =
        "Message sent successfully with token,please check both spam and inbox";
    } else {
      reqStatus = 417;
      message =
        "System error, message not sent please contact us on 0800-2232-222";
    }
    callback(reqStatus, message);
  }
);
module.exports = mailer;
