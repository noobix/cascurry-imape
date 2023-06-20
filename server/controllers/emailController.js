const path = require("path");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const hbs = require("nodemailer-express-handlebars");
const { assert } = require("console");

const mailer = asyncHandler(
  async (data, callback, _requestObject, _responseObject) => {
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
const checkoutMailer = asyncHandler(
  async (data, assets, callback, _requestObject, _responseObject) => {
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
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./public/template"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./public/template"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));
    // send mail with defined transport object
    let mailOptions = {
      from: '"Kelvin Kabute 👻" <skipgh@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: "Hello ✔ " + data.subject, // Subject line
      template: "order",
      context: {
        name: assets.orderBy,
        shipping: assets.shippingFee,
        delivery: assets.deliveryDate,
        amount: assets.amountPaid,
        total: assets.grandTotal,
        products: assets.products,
      },
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        let reqStatus, message;
        if (info.accepted) {
          reqStatus = 100;
          message =
            "Message sent successfully with order information, please check both spam and inbox";
        } else {
          reqStatus = 417;
          message =
            "System error, message not sent please contact us on 0800-2232-222";
        }
        callback(reqStatus, message);
      }
    });
  }
);
module.exports = { mailer: mailer, checkoutMailer: checkoutMailer };
