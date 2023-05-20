const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const format = require("capitalize-string");
const fs = require("fs");
const { cloudinaryUpload, cloudinaryDelete } = require("../utils/cloudinary");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Coupon = require("../models/couponModel");
const Color = require("../models/colorModel");
const User = require("../models/userModel");
const Brand = require("../models/brandModel");

const addProduct = asyncHandler(async (requestObject, responseObject) => {
  if (requestObject.body.title) {
    requestObject.body.slug = slugify(
      requestObject?.body?.slug + " " + requestObject.body.title
    );
  }
  const id_cart = await Category.findOne({
    name: requestObject.body.category,
  });
  const id_brand = await Brand.findOne({
    name: requestObject.body.brand,
  });
  const id_color = await Color.findOne({
    name: requestObject.body.color,
  });
  if (!id_cart)
    throw new Error(
      "Product Category not found In the system, please create it"
    );
  if (!id_brand)
    throw new Error("Product brand not found in the system please create it");
  if (!id_cart)
    throw new Error("Product color not found in the system, please create it");
  const newProduct = await Product.create({
    title: requestObject.body.title,
    slug: requestObject.body.slug,
    price: requestObject.body.price,
    category: id_cart._id,
    brand: id_brand._id,
    quantity: requestObject.body.quantity,
    color: id_color,
    images: requestObject.body.images?.map((image) => {
      return { image };
    }),
  });
  //tags for products (featured,thrending,special)
  newProduct.tags = requestObject.body.tags?.map((tag) => {
    return { tag };
  });
  await newProduct.save();
  responseObject.status(201).json(newProduct);
});
const addImage = asyncHandler(async (requestObject, responseObject) => {
  const uploader = (path) => cloudinaryUpload(path, "images");
  const urls = [];
  const files = requestObject.files;
  for (const file of files) {
    const { path } = file;
    const newpath = await uploader(path);
    urls.push(newpath);
    fs.unlinkSync(path);
  }
  const images = urls.map((file) => file.url);
  if (images.length === 0)
    responseObject
      .status(417)
      .json({ message: "Unable to complete image upload please try again" });
  responseObject.status(200).json(images);
});
const removeImage = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const deleted = await cloudinaryDelete(id, "images");
  if (deleted) responseObject.status(200).json(deleted);
  else
    responseObject
      .status(404)
      .json({ message: "Image not found, please try again" });
});
const getImages = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const data = await Product.findById(id);
  const images = data ? data.images : [];
  if (images) responseObject.status(200).json(images);
  else
    responseObject
      .status(404)
      .json({ message: "No images found, please try again" });
});
const findProduct = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const item = await Product.findById(id)
    .populate("category")
    .populate("brand")
    .populate("color");
  if (item) responseObject.status(200).json(item);
  else responseObject.status(400).json({ message: "Could not find product" });
});
const enumProducts = asyncHandler(async (requestObject, responseObject) => {
  const match = {};
  if (requestObject.query.category) {
    const { _id } = await Category.findOne({
      description: requestObject.query.category,
    });
    match.category = _id;
  }
  if (requestObject.query.brand) {
    const { _id } = await Brand.findOne({
      name: requestObject.query.brand,
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
  if (requestObject.query.color) {
    const { _id } = await Color.findOne({ color: requestObject.query.color });
    match.color = _id;
  }
  let query = Product.find(match);
  if (requestObject.query.fields) {
    const fields = requestObject.query.fields.split(",");
    query = query.select(fields.join(" "));
  } else {
    query = query.select(
      "title slug brand price category images tags quantity totalRatings"
    );
  }
  if (requestObject.query.sortBy) {
    const sort = {};
    const parts = requestObject.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    query = query.sort(sort);
  }
  const page = requestObject.query.page;
  const limit = requestObject.query.limit;
  const skip = requestObject.query.skip;
  if (page) {
    const count = await Product.countDocuments(match);
    if (skip >= count)
      throw new Error("Page not found, This operation is invalid.");
  }
  if (limit) {
    query = query.limit(limit);
  }
  if (skip) {
    query = query.skip(skip);
  }
  const items = await query
    .populate("category", ["name", "description"])
    .populate("brand", ["name", "madeIn"])
    .populate("color")
    .exec();
  if (items) {
    responseObject.status(200).json(items);
  } else {
    responseObject
      .status(400)
      .json({ message: "Could not find products, please try again" });
  }
});
const pagination = asyncHandler(async (requestObject, responseObject) => {
  const ITEMS_PER_PAGE = 30;
  const currentPage = requestObject.query.page || 1;
  const totalItems = await Product.countDocuments();
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (currentPage < 1 || currentPage > totalPages) {
    return responseObject.status(404).json({ message: "Invalid page number." });
  }
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems - 1);
  responseObject.status(200).json({
    currentPage: currentPage,
    endIndex: endIndex,
    totalPages: totalPages,
    startIndex: startIndex,
    itemCount: ITEMS_PER_PAGE,
    pages: [...Array(totalPages + 1).keys()].slice(1),
  });
});
const updateProduct = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const { slug, title } = await Product.findById(id);
  if (title !== requestObject.body.title || slug !== requestObject.body.slug) {
    requestObject.body.slug = slugify(
      requestObject?.body?.slug + " " + requestObject.body.title
    );
  }
  const id_color = await Color.findOne({
    name: requestObject.body.color,
  });
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
      color: id_color || undefined,
      cartegory: id_cart || undefined,
      images: requestObject.body.images?.map((image) => {
        return { image };
      }),
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
const getProductReview = asyncHandler(async (requestObject, responseObject) => {
  const product = requestObject.params.product;
  const prt = await Product.findById(product).populate("ratings.postedBy");
  if (!prt) throw new Error("Product not found");
  const { totalRatings, ratings } = prt;
  responseObject.status(200).json({ totalRatings, ratings });
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
  const uploader = (path) => cloudinaryUpload(path, "images");
  const urls = new Array();
  const files = requestObject.files;
  for (const file of files) {
    const path = file.path;
    const newPath = await uploader(path);
    urls.push(newPath);
  }
  const product = await Product.findById(id);
  const existingImages = product.images.map((image) => image.image);
  const newImages = urls.filter((url) => !existingImages.includes(url));
  const updatedImages = [
    ...product.images,
    ...newImages.map((url) => ({ image: url.url })),
  ];
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        images: updatedImages,
      },
    },
    { new: true }
  );
  if (!updatedProduct)
    responseObject
      .status(417)
      .json({ message: "Product images not updated, please try again" });
  else responseObject.status(200).json(updatedProduct.images);
});
const searchProduct = asyncHandler(async (requestObject, responseObject) => {
  const { query } = requestObject.query;
  const regex = new RegExp(`.*${query}.*`, "i");
  const results = await Product.find({ title: regex })
    .populate("brand")
    .populate("category");
  if (results.length) {
    responseObject.status(200).json(results);
  } else {
    responseObject.status(404).send([]);
  }
});

module.exports = {
  addProduct: addProduct,
  findProduct: findProduct,
  enumProducts: enumProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  addToWishlist: addToWishlist,
  rating: rating,
  getProductReview: getProductReview,
  addImage: addImage,
  removeImage: removeImage,
  getImages: getImages,
  redeemCoupon: redeemCoupon,
  makeCatalogue: makeCatalogue,
  searchProduct: searchProduct,
  pagination: pagination,
};
