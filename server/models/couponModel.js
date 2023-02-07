const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      upperCase: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    code: { type: String, maxLength: 8, required: true },
    consumers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
