const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const addCategory = asyncHandler(async (requestObject, responseObject) => {
  const newCategory = await Category.create(requestObject.body);
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
  const categories = await Category.find();
  if (categories) responseObject.status(200).json(categories);
  else
    responseObject
      .sendStatus(404)
      .json({ message: "Data is not found in system, please try again." });
});

module.exports = {
  addCategory: addCategory,
  editCategory: editCategory,
  removeCategory: removeCategory,
  findCategory: findCategory,
  enumCategory: enumCategory,
};
