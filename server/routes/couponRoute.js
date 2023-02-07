const express = require("express");
const {
  createCoupon,
  enumCoupons,
  updateCoupon,
  getCoupon,
  removeCoupon,
} = require("../controllers/couponController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/new_coupon", approveAuth, getPrivileges, createCoupon);
router.get("/all_coupons", enumCoupons);
router.get("/find_coupon/:id", getCoupon);
router.delete("/remove_coupon/:id", approveAuth, getPrivileges, removeCoupon);
router.put("/update_coupon/:id", approveAuth, getPrivileges, updateCoupon);

module.exports = router;
