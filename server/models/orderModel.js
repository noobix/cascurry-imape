const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    product: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        color: String,
      },
    ],
    paymentIntent: {
      method: {
        type: String,
        default: "Cash On Delivery",
        enum: [
          "Cash On Delivery",
          "Credit Card",
          "Voucher",
          "Cheque",
          "MoMo On Delivery",
          "MoMo At Checkout",
        ],
      },
      id: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
      currency: { type: String, required: true, default: "USD" },
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
