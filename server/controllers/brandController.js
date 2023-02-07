const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const slugify = require("slugify");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");

const addbrand = asyncHandler(async (requestObject, responseObject) => {
  const { id } = await Category.findOne({ name: requestObject.body.category });
  requestObject.body.slug = slugify(
    requestObject.body.name + " " + requestObject.body.madeIn
  );
  if (!id)
    throw new Error(
      "Product Category not found In the system, please create it"
    );
  const newbrand = await Brand.create({
    name: format(requestObject.body.name),
    madeIn: format(requestObject.body.madeIn),
    slug: requestObject.body.slug,
    category: id,
    supplier: requestObject.body.supplier,
  });
  responseObject.status(201).json(newbrand);
});
const editBrand = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  if (requestObject.body.name) {
    if (!requestObject.body.madeIn)
      throw new Error(
        "You need to enter the country of origin to update title"
      );
    requestObject.body.slug = slugify(
      requestObject.body.name + " " + requestObject.body.madeIn
    );
  }
  if (requestObject.body.madeIn) {
    if (!requestObject.body.name)
      throw new Error("You need to enter the name to update title");
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
  const update = await Brand.findByIdAndUpdate(
    id,
    {
      name: requestObject.body.name || undefined,
      madeIn: requestObject.body.madeIn || undefined,
      slug: requestObject.body.slug || undefined,
      category: requestObject.body.category || undefined,
      supplier: requestObject.body.supplier || undefined,
    },
    { new: true, runValidators: true }
  );
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
  const brand = await Brand.findById(id);
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
