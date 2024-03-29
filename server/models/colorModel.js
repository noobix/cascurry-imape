const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  color: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Color", colorSchema);
