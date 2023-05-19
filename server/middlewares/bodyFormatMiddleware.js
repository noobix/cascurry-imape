const bodyparser = require("body-parser");

const bodyFormat = function (req, res, next) {
  if (req.originalUrl === "/api/users/payment/stripe_events/webhook") {
    next();
  } else {
    bodyparser.json()(req, res, next);
  }
};
module.exports = bodyFormat;
