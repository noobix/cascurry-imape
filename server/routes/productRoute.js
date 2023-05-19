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
  removeImage,
  searchProduct,
  pagination,
  getProductReview,
} = require("../controllers/productController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");
const { upload, productImageFormat } = require("../middlewares/uploadImages");

const router = express.Router();
router.post("/item", approveAuth, getPrivileges, addProduct);
router.get("/item/:id", findProduct);
router.get("/items", enumProducts);
router.get("/items/search", searchProduct);
router.put("/item/wishlist", approveAuth, addToWishlist);
router.put("/items/redeem_coupon", approveAuth, redeemCoupon);
router.put("/item/rating", approveAuth, rating);
router.get("/item/get_reviews/:product", getProductReview);
router.get("/items/pagination", pagination);
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
router.delete(
  "/item/remove_image/:id",
  approveAuth,
  getPrivileges,
  removeImage
);
router.get("/item/get_images/:id", getImages);
router.put("/item/:id", approveAuth, getPrivileges, updateProduct);
router.delete("/item/:id", approveAuth, getPrivileges, deleteProduct);

module.exports = router;
