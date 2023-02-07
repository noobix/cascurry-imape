const mongoose = require("mongoose");
const format = require("capitalize-string"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: ["Red", "Green", "Yellow", "Blue", "Black", "White", "Grey"],
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRatings: { type: String, default: 0 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
