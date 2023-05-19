const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const slugify = require("slugify");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");

const addbrand = asyncHandler(async (requestObject, responseObject) => {
  const { id } = await Category.findOne({
    name: format(requestObject.body.category),
  });
  requestObject.body.slug = slugify(
    requestObject.body.name + " " + requestObject.body.madeIn
  );
  if (!id)
    throw new Error(
      "Product Category not found In the system, please create it"
    );
  const supplierInfo = {
    name: format(requestObject.body.supplier.name),
    phone: requestObject.body.supplier.phone,
    email: requestObject.body.supplier.email,
    address: requestObject.body.supplier.address,
  };
  const newbrand = await Brand.create({
    name: format(requestObject.body.name),
    madeIn: format(requestObject.body.madeIn),
    slug: requestObject.body.slug,
    manufacturer: format(requestObject.body.manufacturer),
    category: id,
  });
  newbrand.supplier = supplierInfo;
  await newbrand.save();
  responseObject.status(201).json(newbrand);
});
const editBrand = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const supplierInfo = {};
  const { name, madeIn } = await Brand.findById(id);
  if (
    name !== requestObject.body.name ||
    madeIn !== requestObject.body.madeIn
  ) {
    requestObject.body.slug = slugify(
      requestObject.body.name + " " + requestObject.body.madeIn
    );
  }
  if (requestObject.body.category) {
    const { id } = await Category.findOne({
      name: requestObject.body.category,
    });
    requestObject.body.category = id;
  }
  const updatedData = {
    name: requestObject.body.name || undefined,
    madeIn: requestObject.body.madeIn || undefined,
    slug: requestObject.body.slug || undefined,
    category: requestObject.body.category || undefined,
    manufacturer: requestObject.body.manufacturer || undefined,
  };
  if (requestObject.body.supplier) {
    supplierInfo.name = requestObject.body.supplier.name
      ? format(requestObject.body.supplier.name)
      : undefined;
    supplierInfo.phone = requestObject.body.supplier.phone || undefined;
    supplierInfo.email = requestObject.body.supplier.email || undefined;
    supplierInfo.address = requestObject.body.supplier.address || undefined;
    updatedData = {
      ...updatedData,
      $push: { supplier: supplierInfo },
    };
  }
  const update = await Brand.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    responseObject
      .status(417)
      .json({ message: "Unable to update record, please try again." });
  } else {
    responseObject.status(200).json(update);
  }
});
const enumBrand = asyncHandler(async (requestObject, responseObject) => {
  const page = requestObject.query.page;
  const limit = requestObject.query.limit;
  const skip = requestObject.query.skip;
  const search = requestObject.query.search;
  const searchObj = {};
  if (search) {
    const regex = new RegExp(`.*${search}.*`, "i");
    searchObj.name = regex;
  }
  if (page) {
    const count = await Brand.countDocuments();
    if (skip >= count)
      throw new Error("Page not found, This operation is invalid.");
  }
  const brands = Brand.find(searchObj);
  const query = brands.skip(skip).limit(limit);
  const brandList = await query.populate("category").exec();
  if (brandList) responseObject.status(200).json(brandList);
  else
    responseObject
      .status(404)
      .json({ message: "Unable to carry out request. Please try again" });
});
const pagination = asyncHandler(async (requestObject, responseObject) => {
  const ITEMS_PER_PAGE = 30;
  const currentPage = requestObject.query.page || 1;
  const totalItems = await Brand.countDocuments();
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
const removeBrand = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const brand = await Brand.findByIdAndRemove(id);
  if (brand) responseObject.status(200).json(brand);
  else
    responseObject
      .status(404)
      .json({ message: "Unable to remove brand details, please try agian" });
});
const findBrand = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const brand = await Brand.findById(id).populate("category");
  if (brand) responseObject.status(200).json(brand);
  else
    responseObject
      .status(404)
      .json("Brand information not found, please try again");
});

module.exports = {
  enumBrand: enumBrand,
  removeBrand: removeBrand,
  findBrand: findBrand,
  addbrand: addbrand,
  editBrand: editBrand,
  pagination: pagination,
};
