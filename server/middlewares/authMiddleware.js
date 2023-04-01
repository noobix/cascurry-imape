const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const approveAuth = asyncHandler(
  async (requestObject, responseObject, next) => {
    const token =
      requestObject.headers.authorization || requestObject.cookies.refreshToken;
    if (!token) {
      throw new Error("Token not found, please login again");
    }
    if (requestObject.cookies.refreshToken) {
      const verified = jwt.verify(token, process.env.JWT_SECRET_STRING);
      if (!verified) {
        throw new Error("Token expired, you are required to login");
      }
      const user = await User.findById(verified.id);
      requestObject.user = user;
      next();
    } else {
      const tokenString = token.split(" ")[1];
      const verified = jwt.verify(tokenString, process.env.JWT_SECRET_STRING);
      if (!verified) {
        throw new Error("Token expired, you are required to login");
      }
      const user = await User.findById(verified.id);
      requestObject.user = user;
      next();
    }
  }
);
const getPrivileges = asyncHandler(
  async (requestObject, responseObject, next) => {
    const { email } = requestObject.user;
    const { privileges } = await User.findOne({ email: email });
    if (!privileges || privileges.length === 0) {
      throw new Error(
        "Something went wrong, Could not find permissions, " +
          "contact us on 0800-2232-222"
      );
    }
    if (privileges === "admin") {
      next();
    } else {
      throw new Error("You don't have permissions for this operation");
    }
  }
);

module.exports = { approveAuth: approveAuth, getPrivileges: getPrivileges };
