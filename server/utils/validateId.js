const mongoose = require("mongoose");

const validateKey = function (key) {
  const isvalid = mongoose.Types.ObjectId.isValid(key);
  if (!isvalid) throw new Error("Key to information is not valid");
};

module.exports = validateKey;
