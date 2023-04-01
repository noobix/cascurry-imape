const express = require("express");
const {
  addProduct,
  findProduct,
  enumProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  redeemCoupon,
  makeCatalogue,
  addImage,
  getImages,
} = require("../controllers/productController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");
const { upload, productImageFormat } = require("../middlewares/uploadImages");

const router = express.Router();
router.post("/item", approveAuth, getPrivileges, addProduct);
router.get("/item/:id", findProduct);
router.get("/items", enumProducts);
router.put("/item/wishlist", approveAuth, addToWishlist);
router.put("/items/redeem_coupon", approveAuth, redeemCoupon);
router.put("/item/rating", approveAuth, rating);
router.post(
  "/item/images",
  approveAuth,
  getPrivileges,
  upload.array("images", 10),
  productImageFormat,
  addImage
);
router.put(
  "/item/upload_image/:id",
  approveAuth,
  getPrivileges,
  upload.array("images", 10),
  productImageFormat,
  makeCatalogue
);
router.get("/item/get_images/:id", getImages);
router.put("/item/:id", approveAuth, getPrivileges, updateProduct);
router.delete("/item/:id", approveAuth, getPrivileges, deleteProduct);

module.exports = router;
