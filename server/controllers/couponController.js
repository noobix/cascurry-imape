const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const Coupon = require("../models/couponModel");

const createCoupon = asyncHandler(async (requestObject, responseObject) => {
  const newCoupon = await Coupon.create({
    name: format(requestObject.body.name),
    expiry: requestObject.body.expiry,
    discount: requestObject.body.discount,
    code: requestObject.body.code,
  });
  if (!newCoupon)
    responseObject
      .status(417)
      .json({ message: "Unable to create coupon, please try again." });
  else responseObject.status(200).json(newCoupon);
});
const enumCoupons = asyncHandler(async (requestObject, responseObject) => {
  const coupons = await Coupon.find();
  if (!coupons)
    responseObject
      .status(404)
      .json({ message: "Unable to fetch coupons, please try again" });
  else responseObject.status(200).json(coupons);
});
const updateCoupon = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    id,
    {
      name: format(requestObject.body.name) || undefined,
      expiry: requestObject.body.expiry || undefined,
      discount: requestObject.body.discount || undefined,
      code: requestObject.body.code || undefined,
    },
    { new: true }
  );
  if (!updatedCoupon)
    responseObject
      .status(417)
      .json({ message: "Unable to update coupon, please try again." });
  else responseObject.status(200).json(updatedCoupon);
});
const getCoupon = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const coupon = await Coupon.findById(id);
  if (!coupon)
    responseObject
      .status(404)
      .json({ message: "Coupon not found, please try again." });
  else responseObject.status(200).json(coupon);
});
const removeCoupon = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const deletedCoupon = await Coupon.findByIdAndRemove(id);
  if (!deletedCoupon)
    responseObject
      .status(417)
      .json({ message: "Coupon not deleted, please try again." });
  else responseObject.status(200).json(deletedCoupon);
});

module.exports = {
  createCoupon: createCoupon,
  enumCoupons: enumCoupons,
  updateCoupon: updateCoupon,
  getCoupon: getCoupon,
  removeCoupon: removeCoupon,
};
