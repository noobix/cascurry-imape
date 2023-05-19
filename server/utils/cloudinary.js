const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUpload = async function (files) {
  return new Promise((resolve, reject) =>
    cloudinary.uploader.upload(files, (result) =>
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        { resource_type: "auto" }
      )
    )
  );
};
const cloudinaryDelete = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = {
  cloudinaryUpload: cloudinaryUpload,
  cloudinaryDelete: cloudinaryDelete,
};
