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
  getAllOrder,
  fetchOrder,
  removeItemFromCart,
  updateProductQuantityUp,
  updateProductQuantityDown,
  getSavedAddress,
  getOrderCheckout,
  monthRevenueRecords,
  yearRevenueRecords,
  compareProduct,
  removeCompare,
  getCompareProducts,
  pagination,
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
router.get("/person/saved_addresses", approveAuth, getSavedAddress);
router.get("/person/all_fetch_order", approveAuth, getPrivileges, getAllOrder);
router.get("/person/all_order_paginate", pagination);
router.get("/person/logout", logout);
router.get("/person/fetch_cookies", fetchRefreshToken);
router.put("/person/update_password", approveAuth, updatePassword);
router.post("/person/forgot_password_token", forgotPasswordToken);
router.put("/person/reset_password/:token", resetPassword);
router.delete("/person/", approveAuth, removeUser);
router.put("/person/", approveAuth, updateUser);
router.delete("/person/shopping_cart/clear", approveAuth, emptyCart);
router.put("/person/save_address", approveAuth, saveAddress);
router.post("/person/shopping_cart", approveAuth, shoppingCart);
router.post(
  "/person/shopping_cart/increase_quantity",
  approveAuth,
  updateProductQuantityUp
);
router.post(
  "/person/shopping_cart/decrease_quantity",
  approveAuth,
  updateProductQuantityDown
);
router.delete("/person/remove_from_cart/:id", approveAuth, removeItemFromCart);
router.post("/person/shopping_new_order", approveAuth, makeOrder);
router.post("/person/shopping_coupon", approveAuth, redeemCoupon);
router.get("/people", approveAuth, getPrivileges, enumUsers);
router.get(
  "/data/revenuebyMonth",
  approveAuth,
  getPrivileges,
  monthRevenueRecords
);
router.get("/data/countbyyear", approveAuth, getPrivileges, yearRevenueRecords);
router.put(
  "/person/activate_account/:id",
  approveAuth,
  getPrivileges,
  activateAccount
);
router.get("/person/compare_products/list", approveAuth, getCompareProducts);
router.post("/person/compare_products/:id", approveAuth, compareProduct);
router.delete(
  "/person/compare_products/remove/:id",
  approveAuth,
  removeCompare
);
router.get("/person/:id", approveAuth, getPrivileges, findUser);
router.get(
  "/person/get_user_order/:id",
  approveAuth,
  getPrivileges,
  fetchOrder
);
router.put(
  "/person/update_order/:id",
  approveAuth,
  getPrivileges,
  updateOrderStatus
);
router.get(
  "/person/get_user_order/cheackedout/:id",
  approveAuth,
  getOrderCheckout
);
router.put(
  "/person/suspend_account/:id",
  approveAuth,
  getPrivileges,
  suspendAccount
);

module.exports = router;
