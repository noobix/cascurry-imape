const express = require("express");
const {
  addNewUser,
  loginUser,
  enumUsers,
  fetchUser,
  removeUser,
  updateUser,
  suspendAccount,
  activateAccount,
  fetchRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  findUser,
  getWishlist,
  saveAddress,
  shoppingCart,
  fetchCart,
  emptyCart,
  redeemCoupon,
  makeOrder,
  getOrder,
  updateOrderStatus,
} = require("../controllers/userController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", addNewUser);
router.post("/login", loginUser);
router.post("/admin", loginAdmin);
router.get("/people", approveAuth, getPrivileges, enumUsers);
router.get("/person/", approveAuth, fetchUser);
router.get("/person/wishlist", approveAuth, getWishlist);
router.get("/person/fetch_cart", approveAuth, fetchCart);
router.get("/person/fetch_order", approveAuth, getOrder);
router.put(
  "/person/update_order/:id",
  approveAuth,
  getPrivileges,
  updateOrderStatus
);
router.get("/person/:id", approveAuth, getPrivileges, findUser);
router.delete("/person/", approveAuth, removeUser);
router.put("/person/", approveAuth, updateUser);
router.delete("/person/shopping_cart/clear", approveAuth, emptyCart);
router.put("/person/save_address", approveAuth, saveAddress);
router.post("/person/shopping_cart", approveAuth, shoppingCart);
router.post("/person/shopping_new_order", approveAuth, makeOrder);
router.post("/person/shopping_coupon", approveAuth, redeemCoupon);
router.put(
  "/person/suspend_account/:id",
  approveAuth,
  getPrivileges,
  suspendAccount
);
router.get("/people", approveAuth, getPrivileges, enumUsers);
router.put(
  "/person/activate_account/:id",
  approveAuth,
  getPrivileges,
  activateAccount
);
router.get("/person/fetch_cookies", fetchRefreshToken);
router.get("/person/logout", logout);
router.put("/person/update_password", approveAuth, updatePassword);
router.post("/person/forgot_password_token/", forgotPasswordToken);
router.put("/person/reset_password/:token", resetPassword);

module.exports = router;
