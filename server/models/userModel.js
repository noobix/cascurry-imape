const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    privileges: {
      type: String,
      default: "user",
    },
    accountStatusSuspended: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    compareList: {
      type: Array,
      default: [],
    },
    address: [{ addressLine1: String, addressLine2: String }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: String,
    lastPasswordChange: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordAMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(token).digest("hex");
  this.passwordResetToken = hashed.toString();
  this.PasswordResetExpire = Date.now() + 30 * 60 * 1000; //10mins
  return token;
};
//Export the model
module.exports = mongoose.model("User", userSchema);
