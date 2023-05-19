const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const Category = require("../models/categoryModel");

const addCategory = asyncHandler(async (requestObject, responseObject) => {
  const newCategory = await Category.create({
    name: format(requestObject.body.name),
    department: requestObject.body.department,
    description: requestObject.body.description,
    officerInCharge: requestObject.body.officerInCharge,
  });
  if (!newCategory)
    responseObject
      .status(417)
      .json({ message: "Failed to create new category, please try again" });
  else responseObject.status(201).json(newCategory);
});
const editCategory = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: requestObject.body.name || undefined,
      department: requestObject.body.department || undefined,
      description: requestObject.body.description || undefined,
      officerInCharge: requestObject.body.officerInCharge || undefined,
    },
    { new: true, runValidators: true }
  );
  if (category) responseObject.status(200).json(category);
  else
    responseObject
      .status(204)
      .json({ message: "Unable to update category, please try again" });
});
const removeCategory = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const category = await Category.findByIdAndRemove(id);
  if (category) responseObject.status(200).json(category);
  else
    responseObject
      .status(204)
      .json({ message: "Data was not found in the system." });
});
const findCategory = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const category = await Category.findById(id);
  if (category) responseObject.status(200).json(category);
  else
    responseObject
      .status(404)
      .json({ message: "Data was not found in the system." });
});
const enumCategory = asyncHandler(async (requestObject, responseObject) => {
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
    const count = await Category.countDocuments();
    if (skip >= count)
      throw new Error("Page not found, This operation is invalid.");
  }
  const categories = Category.find(searchObj);
  const query = categories.limit(limit).skip(skip);
  const categoryList = await query.exec();
  if (categoryList) responseObject.status(200).json(categoryList);
  else
    responseObject
      .sendStatus(404)
      .json({ message: "Data is not found in system, please try again." });
});
const pagination = asyncHandler(async (requestObject, responseObject) => {
  const ITEMS_PER_PAGE = 30;
  const currentPage = requestObject.query.page || 1;
  const totalItems = await Category.countDocuments();
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

module.exports = {
  addCategory: addCategory,
  editCategory: editCategory,
  removeCategory: removeCategory,
  findCategory: findCategory,
  enumCategory: enumCategory,
  pagination: pagination,
};
