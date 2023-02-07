const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const format = require("capitalize-string");
const uploadToCloudinay = require("../utils/cloudinary");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const Brand = require("../models/brandModel");

const addProduct = asyncHandler(async (requestObject, responseObject) => {
  if (requestObject.body.title) {
    requestObject.body.slug = slugify(
      requestObject?.body?.slug + " " + requestObject.body.title
    );
  }
  const id_cart = await Category.findOne({
    name: format(requestObject.body.category),
  });
  const id_brand = await Brand.findOne({
    name: format(requestObject.body.brand),
  });
  if (!id_cart)
    throw new Error(
      "Product Category not found In the system, please create it"
    );
  if (!id_brand)
    throw new Error("Product brand not found in the system please create it");
  const newProduct = await Product.create({
    title: requestObject.body.title,
    slug: requestObject.body.slug,
    price: requestObject.body.price,
    category: id_cart._id,
    brand: id_brand._id,
    quantity: requestObject.body.quantity,
    color: requestObject.body.color,
  });
  responseObject.status(201).json(newProduct);
});
const findProduct = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const item = await Product.findById(id)
    .populate("category")
    .populate("brand");
  item
    ? responseObject.status(200).json({ item })
    : responseObject.status(400).json({ message: "Could not find product" });
});
const enumProducts = asyncHandler(async (requestObject, responseObject) => {
  const match = {};
  let query = Product.find(match);
  if (requestObject.query.category) {
    const { _id } = await Category.findOne({
      name: format(requestObject.query.category),
    });
    match.category = _id;
  }
  if (requestObject.query.brand) {
    const { _id } = await Brand.findOne({
      name: format(requestObject.query.brand),
    });
    match.brand = _id;
  }
  if (requestObject.query.price) {
    const aggregate = requestObject.query.price.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    match[aggregate.slice(0, 5)] = {
      [aggregate.slice(6, 10)]: aggregate.slice(12),
    };
  }
  if (requestObject.query.sortBy) {
    const sort = {};
    const parts = requestObject.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    query = query.sort(sort);
  }
  if (requestObject.query.fields) {
    const fields = requestObject.query.fields.split(",");
    query = query.select(fields);
    /**const items = await Product.find(match).sort(sort).select("-__v");
     *  //.populate("category").exec();**/
  }
  const page = requestObject.query.page;
  const limit = requestObject.query.limit;
  const skip = requestObject.query.skip;
  if (page) {
    const count = await Product.countDocuments();
    if (skip >= count)
      throw new Error("Page not found, This operation is invalid.");
  }
  if (limit) {
    query = query.limit(limit);
  }
  if (skip) {
    query = query.skip(skip);
  }
  const items = await query.populate("category").populate("brand").exec(); //.populate("category").exec();
  if (items) {
    responseObject.status(200).json(items);
  } else {
    responseObject
      .status(400)
      .json({ message: "Could not find products, please try again" });
  }
});
const updateProduct = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  if (requestObject.body.title) {
    if (!requestObject.body.slug)
      throw new Error(
        "You need the product type to update the name of the product"
      );
    requestObject.body.slug = slugify(
      requestObject?.body?.slug + " " + requestObject.body.title
    );
  }
  const id_cart = await Category.findOne({
    name: requestObject.body.category,
  });
  const id_brand = await Brand.findOne({
    name: format(requestObject.body.brand),
  });
  const item = await Product.findByIdAndUpdate(
    id,
    {
      title: requestObject.body.title || undefined,
      slug: requestObject.body.slug || undefined,
      description: requestObject.body.description || undefined,
      price: requestObject.body.price || undefined,
      brand: id_brand || undefined,
      quantity: requestObject.body.quantity || undefined,
      color: requestObject.body.color || undefined,
      cartegory: id_cart || undefined,
    },
    { new: true, runValidators: true }
  );
  item
    ? responseObject.status(200).json(item)
    : responseObject
        .status(404)
        .json({ message: "Something wen wrong, update unsucessful" });
});
const deleteProduct = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const item = await Product.findByIdAndRemove(id);
  item
    ? responseObject.status(200).json(item)
    : responseObject.status(404).json({
        message:
          "Something wen wrong, could not remove product. Please try again later.",
      });
});
const addToWishlist = asyncHandler(async (requestObject, responseObject) => {
  const user = await User.findById(requestObject.user._id);
  const itemid = requestObject.body.item;
  const checkExist = user.wishlist.find((item) => item.toString() === itemid);
  if (checkExist) {
    const item = await User.findByIdAndUpdate(
      user._id,
      { $pull: { wishlist: itemid } },
      { new: true }
    );
    if (item) responseObject.status(200).json(item);
    else
      responseObject.status(417).json({
        message: "item was not removed to wishlist, please try again",
      });
  } else {
    const item = await User.findByIdAndUpdate(
      user._id,
      { $push: { wishlist: itemid } },
      { new: true }
    );
    if (item) responseObject.status(200).json(item);
    else
      responseObject.status(417).json({
        message: "item was not added to wishlist, please try again",
      });
  }
});
const rating = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const { star, item, comment } = requestObject.body;
  const product = await Product.findById(item);
  const existingRating = product.ratings.find(
    (rating) => rating.postedBy.toString() === id.toString()
  );
  if (existingRating) {
    const updateRatings = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRating },
      },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
      { new: true }
    );
    if (!updateRatings)
      throw new Error("Unable to apply ratings, please try again.");
  } else {
    const ratings = await Product.findByIdAndUpdate(
      item,
      { $push: { ratings: { star: star, postedBy: id, comment: comment } } },
      { new: true }
    );
    if (!ratings) throw new Error("Unable to apply ratings, please try again.");
  }
  const getAllRatings = await Product.findById(item);
  const totalRatinngs = getAllRatings.ratings.length;
  const ratingsSum = getAllRatings.ratings
    .map((item) => item.star)
    .reduce((sum, rating) => sum + rating, 0);
  const actualRatings = Math.round(ratingsSum / totalRatinngs);
  const prt = await Product.findByIdAndUpdate(
    item,
    { totalRatings: actualRatings },
    { new: true }
  );
  responseObject.status(200).json(prt);
});
const redeemCoupon = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const couponCode = requestObject.body.coupon;
  const coupon = await Coupon.findOne({ code: couponCode });
  const claimExist = coupon.consumers.find(
    (user) => user.toString() === id.toString()
  );
  if (!claimExist) {
    const redeem = await Coupon.findByIdAndUpdate(
      coupon._id,
      { $push: { consumers: id } },
      { new: true }
    );
    responseObject.status(200).json(redeem);
  } else
    responseObject
      .status(417)
      .json({ message: "Ticket already redeemed by user" }``);
});
const makeCatalogue = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const uploader = (path) => uploadToCloudinay(path, "images");
  const urls = new Array();
  const files = requestObject.files;
  for (const file of files) {
    const path = file.path;
    const newPath = await uploader(path);
    urls.push(newPath);
  }
  const product = await Product.findByIdAndUpdate(
    id,
    { images: urls.map((file) => file) },
    { new: true }
  );
  if (!product)
    responseObject
      .status(417)
      .json({ message: "Product images not updated, please try again" });
  else responseObject.status(200).json(product);
});

module.exports = {
  addProduct: addProduct,
  findProduct: findProduct,
  enumProducts: enumProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  addToWishlist: addToWishlist,
  rating: rating,
  redeemCoupon: redeemCoupon,
  makeCatalogue: makeCatalogue,
};
