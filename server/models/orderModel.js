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
      paymentStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "created", "processed", "declined"],
      },
      currency: { type: String, required: true, default: "USD" },
      transactionId: String,
      amountPaid: Number,
      statusInformation: String,
    },
    orderMonth: { type: String, default: new Date().getMonth() },
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
    cartInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    shippingInfo: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      zip: { type: String },
      country: { type: String, required: true },
    },
    shippingFee: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
