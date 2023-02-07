const jwt = require("jsonwebtoken");

const refreshTokenGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: "324000s",
  });
};

module.exports = { refreshTokenGenerator: refreshTokenGenerator };
