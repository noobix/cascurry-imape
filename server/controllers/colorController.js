const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const Color = require("../models/colorModel");

const addColor = asyncHandler(async (requestObject, responseObject) => {
  const newColor = await Color.create({
    name: format(requestObject.body.name),
    color: requestObject.body.color,
    code: requestObject.body.code,
  });
  if (newColor) responseObject.status(200).json(newColor);
  else
    responseObject
      .status(417)
      .json({ message: "Unable to add color please try again." });
});
const getColor = asyncHandler(async (requestObject, responseObject) => {
  const name = requestObject.params.name;
  const color = await Color.findOne({ name: name });
  if (color) responseObject.status(200).json(color);
  else
    responseObject
      .status(400)
      .json({ message: "Unable to find color please try again." });
});
const updateColor = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const updatecolor = await Color.findByIdAndUpdate(
    id,
    {
      name: requestObject.body.name || undefined,
      color: requestObject.body.color || undefined,
      code: requestObject.body.code || undefined,
    },
    { new: true }
  );
  if (updatecolor) responseObject.status(200).json(updatecolor);
  else
    responseObject
      .status(404)
      .json({ message: "Can not make update to color, please try agin" });
});
const removeColor = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const removecolor = await Color.findByIdAndRemove(id);
  if (removecolor) responseObject.status(200).json(removecolor);
  else
    responseObject
      .status(404)
      .json({ message: "Color not found unable to delete" });
});

module.exports = {
  addColor: addColor,
  getColor: getColor,
  updateColor: updateColor,
  removeColor: removeColor,
};
