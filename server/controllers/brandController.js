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
  const brands = await Brand.find().populate("category");
  if (brands) responseObject.status(200).json(brands);
  else
    responseObject
      .status(404)
      .json({ message: "Unable to carry out request. Please try again" });
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
};
