const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, path.join(__dirname, "../public/images"));
  },
  filename: function (request, file, callback) {
    const uploadSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uploadSuffix + ".jpeg");
  },
});
const multerFilter = function (request, file, callback) {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback({ message: "Unknown file format" }, false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 3e6 },
});
const blogImageFormat = async (requsetObject, responseObject, next) => {
  if (!requsetObject.files) return next();
  await Promise.all(
    requsetObject.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/images/blog_assets/${file.filename}`);
      fs.unlinkSync(`public/images/blog_assets/${file.filename}`);
    })
  );
  next();
};
const productImageFormat = async (requsetObject, responseObject, next) => {
  if (!requsetObject.files) return next();
  await Promise.all(
    requsetObject.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/images/catalogues/${file.filename}`);
      fs.unlinkSync(`public/images/catalogues/${file.filename}`);
    })
  );
  next();
};

module.exports = {
  upload: upload,
  blogImageFormat: blogImageFormat,
  productImageFormat: productImageFormat,
};
