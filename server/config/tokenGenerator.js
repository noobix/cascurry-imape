const jwt = require("jsonwebtoken");

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: "108000s",
  });
};

module.exports = { genToken: genToken };
