const mongoose = require("mongoose");

const connectDatabse = function () {
  mongoose.set("strictQuery", true);
  try {
    const dbconnstring = process.env.MONGODB_URL;
    const connect = mongoose.connect(
      dbconnstring,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => (error ? console.error(error) : undefined)
    );
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = connectDatabse;
