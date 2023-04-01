const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const uniqid = require("uniqid");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Color = require("../models/colorModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const { genToken } = require("../config/tokenGenerator");
const { refreshTokenGenerator } = require("../config/refreshTokenGen");
const validateKey = require("../utils/validateId");
const mailer = require("./emailController");
const crypto = require("crypto");

const addNewUser = asyncHandler(async (requestObject, responseObject) => {
  const { email } = requestObject.body;
  const exists = await User.findOne({ email: email });
  if (exists)
    throw new Error(
      "User found in database, You cannot register an existing user"
    );
  const newUser = await User.create({
    firstname: format(requestObject.body.firstname),
    lastname: format(requestObject.body.lastname),
    email: email,
    mobile: requestObject.body.mobile,
    password: requestObject.body.password,
    privileges: requestObject.body.privileges,
  });
  responseObject.status(200).json(newUser);
});
const loginUser = asyncHandler(async (requestObject, responseObject) => {
  const { email, password } = requestObject.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.isPasswordAMatch(password))) {
    const refreshToken = refreshTokenGenerator(user.id);
    const saveToken = await User.findByIdAndUpdate(
      user.id,
      { refreshToken: refreshToken },
      { new: true },
      (err) => {
        if (!err) {
          responseObject.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
          });
        }
      }
    ).clone();
    saveToken
      ? responseObject.status(200).json(saveToken)
      : responseObject.status(417).json({
          message: "Server error, Could not save token, please try again",
        });
  } else {
    throw new Error("Credentials not found, Please try again");
  }
});
const loginAdmin = asyncHandler(async (requestObject, responseObject) => {
  const { email, password } = requestObject.body;
  const admin = await User.findOne({ email: email });
  if (admin.privileges !== "admin")
    throw new Error("This panel is for administrative users only");
  if (admin && (await admin.isPasswordAMatch(password))) {
    const refreshToken = refreshTokenGenerator(admin.id);
    const saveToken = await User.findByIdAndUpdate(
      admin.id,
      { refreshToken: refreshToken },
      { new: true },
      (err) => {
        if (!err) {
          responseObject.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
          });
        }
      }
    ).clone();
    if (saveToken) responseObject.status(200).json(saveToken);
    else
      responseObject.status(417).json({
        message: "Server error, Could not save token, please try again",
      });
  } else {
    throw new Error("Credentials not found, Please try again");
  }
});
const enumUsers = asyncHandler(async (requestObject, responseObject) => {
  const users = await User.find();
  if (!users) {
    throw new Error("Something went wrong, could not fetch users");
  }
  responseObject.status(200).json(users);
});
const findUser = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const user = await User.findById(id);
  if (!user)
    responseObject
      .status(404)
      .json("User not found please check information and try again");
  else responseObject.status(200).json(user);
});
const fetchUser = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.user;
  validateKey(id);
  const user = await User.findById(id);
  if (!user) {
    throw new error("Something went wrong, could not find user");
  }
  responseObject.status(200).json(user);
});
const removeUser = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.user;
  validateKey(id);
  const user = await User.findByIdAndRemove(id);
  if (!user) {
    throw new error("User not found in the system");
  }
  responseObject.status(200).json(user);
});
const updateUser = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.user;
  validateKey(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      firstname: requestObject.body.firstname || undefined,
      lastname: requestObject.body.lastname || undefined,
      email: requestObject.body.email || undefined,
      mobile: requestObject.body.mobile || undefined,
    },
    { new: true }
  );
  user
    ? responseObject.status(200).json(user)
    : responseObject
        .status(404)
        .json({ message: "Something wen wrong, update unsucessful" });
});
const suspendAccount = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  validateKey(id);
  const account = await User.findByIdAndUpdate(
    id,
    { AccountStatusSuspended: true },
    { new: true }
  );
  account
    ? responseObject.status(200).json(account)
    : responseObject
        .status(417)
        .json({ message: "An error occurred while deactivating account" });
});
const activateAccount = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  validateKey(id);
  const account = await User.findByIdAndUpdate(
    id,
    { AccountStatusSuspended: false },
    { new: true }
  );
  account
    ? responseObject.status(200).json(account)
    : responseObject
        .status(417)
        .json({ message: "An error occurred while activating account" });
});
const fetchRefreshToken = asyncHandler(
  async (requestObject, responseObject) => {
    const cookie = requestObject.cookies;
    if (!cookie.refreshToken) {
      throw new Error(
        "Could not find token in cookies,permissions denied please login"
      );
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken: refreshToken });
    jwt.verify(refreshToken, process.env.JWT_SECRET_STRING, (error, decode) => {
      if (error || user.id !== decode.id)
        throw new Error("Invalid refresh token, please login");
    });
    const accessToken = genToken(user);
    responseObject.status(200).json({ accessToken });
  }
);
const logout = asyncHandler(async (requestObject, responseObject) => {
  if (!requestObject.cookies)
    throw new error(
      "The system does not recorgnize you request, You are not logged in"
    );
  const refreshToken = requestObject.cookies.refreshToken;
  const user = await User.findOneAndUpdate(
    refreshToken,
    { refreshToken: "" },
    { new: true }
  );
  if (!user)
    throw new Error(
      "The system is unable to find login details,account already disconnected"
    );
  responseObject.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  responseObject.status(200).json(user);
});
const updatePassword = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const password = requestObject.body.password;
  validateKey(id);
  const user = await User.findById(id);
  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    responseObject.status(202).json(updatedUser);
  } else {
    responseObject.status(204).json(user);
  }
});
const forgotPasswordToken = asyncHandler(
  async (requestObject, responseObject) => {
    const email = requestObject.body.email;
    const user = await User.findOne({ email: email });
    if (!user)
      throw new Error(
        "Invalid email address, Please enter a valid email address"
      );
    const resetToken = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `You are required to follow this link to reset your
    password, this link will be inactive in 10minutes only.
    <a href="http://localhost:5000/api/users/person/reset_password/${resetToken}">Click here</a>`;
    const data = {
      to: email,
      subject: "Password reset link",
      html: resetUrl,
      text: "Hello. This message contains a link to assist you change your password",
    };

    mailer(data, (status, message) => {
      responseObject.status(status).json({ message: message });
    });
  }
);
const resetPassword = asyncHandler(async (requestObject, responseObject) => {
  const password = requestObject.body.password;
  const token = requestObject.params.token;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    PasswordResetToken: hashedToken,
    PasswordResetExpire: { $gte: Date.now() },
  });
  if (!user)
    throw new Error(
      "Token Expired, please start another password reset process"
    );
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();
  responseObject.status(200).json(user);
});
const getWishlist = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const user = await User.findById(id).populate({
    path: "wishlist",
    model: "Product",
  });
  if (user) responseObject.status(200).json(user);
  else
    responseObject
      .status(404)
      .json({ message: "User not found, please try again." });
});
const saveAddress = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const address = requestObject.body.address;
  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: { address: address },
    },
    { new: true }
  );
  if (user) responseObject.status(200).json(user);
  else
    responseObject
      .status(404)
      .status(404)
      .json({ message: "Unable to update user. Please try again." });
});
const shoppingCart = asyncHandler(async (requestObject, responseObject) => {
  const { cart } = requestObject.body;
  const id = requestObject.user._id;
  const user = await User.findById(id);
  const previousCart = await Cart.findOne({ orderBy: user._id });
  if (previousCart) previousCart.delete();
  let product = [];
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.quantity = cart[i].quantity;
    object.color = cart[i].color;
    const getPrice = await Product.findById(cart[i]._id).select("price").exec();
    object.price = getPrice.price;
    product.push(object);
  }
  let total = 0;
  for (let j = 0; j < product.length; j++) {
    total += product[j].quantity * product[j].price;
  }
  const newCart = await new Cart({
    product: product,
    cartTotal: total,
    orderBy: user._id,
  }).save();
  if (newCart) responseObject.status(200).json(newCart);
  else
    responseObject
      .status(400)
      .json({ message: "Unable to save cart, please try again" });
});
const fetchCart = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const cart = await Cart.findOne({ orderBy: id }).populate("product.product");
  if (cart) responseObject.status(200).json(cart);
  else
    responseObject
      .status(404)
      .json({ message: "Cart not found, please try again" });
});
const emptyCart = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const cart = await Cart.findOne({ orderBy: id });
  if (cart) {
    cart.remove();
    responseObject.status(200).json(cart);
  } else
    responseObject
      .status(400)
      .json({ message: "Cart not found, cart is probably empty" });
});
const redeemCoupon = asyncHandler(async (requestObject, responseObject) => {
  const coupon = requestObject.body.code;
  const id = requestObject.user._id;
  const redeem = await Coupon.findOne({ code: coupon });
  const used = redeem?.consumers.find(
    (user) => user.user.toString() === id.toString()
  );
  if (redeem && Date.now() < redeem.expiry && !used) {
    const { product, cartTotal } = await Cart.findOne({ orderBy: id }).populate(
      "product.product"
    );
    const discountAmount = cartTotal * redeem.discount;
    const calculate = (cartTotal - discountAmount).toFixed(2);
    const discountedAmount = await Cart.findOneAndUpdate(
      { orderBy: id },
      { totalAfterDiscount: calculate },
      { new: true }
    );
    if (!discountedAmount)
      responseObject
        .status(400)
        .json({ message: "Unable to process discount, please try again." });
    else {
      await Coupon.findOneAndUpdate(
        { code: coupon },
        { $push: { consumers: { user: id } } }
      );
      responseObject.status(200).json(discountedAmount);
    }
  } else
    responseObject.status(400).json({
      message: "Coupon expired or has been already used and cannot be used",
    });
});
const makeOrder = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const userCart = await Cart.findOne({ orderBy: id });
  let totals = [];
  let grandTotal = 0;
  if (!userCart.totalAfterDiscount || userCart.totalAfterDiscount === 0) {
    for (let i = 0; i < userCart.product.length; i++) {
      let object = {};
      object.price = userCart.product[i].price;
      object.quantity = userCart.product[i].quantity;
      totals.push(object);
    }
    for (let j = 0; j < totals.length; j++) {
      grandTotal += totals[j].quantity * totals[j].price;
    }
  } else grandTotal = userCart.totalAfterDiscount;
  const updateTotal = await Cart.findOneAndUpdate(
    { orderBy: id },
    { totalAfterDiscount: grandTotal }
  );
  const newOrder = await new Order({
    product: userCart.product,
    paymentIntent: {
      id: uniqid(),
      method: "Cash On Delivery",
      amount: grandTotal,
      date: Date.now(),
      currency: "USD",
    },
    orderBy: id,
    orderStatus: "Processing",
  }).save();
  const normalizeQuantities = userCart.product.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    };
  });
  const normalized = await Product.bulkWrite(normalizeQuantities, {});
  if (normalized) responseObject.status(200).json(newOrder);
  else
    responseObject
      .status(400)
      .json({ message: "Unable to place order, PLease try again" });
});
const getOrder = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const order = await Order.findOne({ orderBy: id })
    .populate("product.product")
    .populate("orderBy");
  if (order) responseObject.status(200).json(order);
  else
    responseObject
      .status(400)
      .json({ message: "Could not find any orders, please try again" });
});
const fetchOrder = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const userOrder = await Order.findById(id)
    .populate({
      path: "product.product",
      populate: {
        path: "brand",
        model: "Brand",
      },
    })
    .populate("orderBy");
  // userOrder = { ...userOrder, color: userOrder.product[0].color };
  if (userOrder) responseObject.status(200).json(userOrder);
  else
    responseObject.status(400).json({
      message: "Could not find any matching orders, please try again.",
    });
});
const getAllOrder = asyncHandler(async (requestObject, responseObject) => {
  const order = await Order.find()
    .populate("product.product")
    .populate("orderBy");
  if (order) responseObject.status(200).json(order);
  else
    responseObject
      .status(400)
      .json({ message: "Could not find any orders, please try again" });
});
const updateOrderStatus = asyncHandler(
  async (requestObject, responseObject) => {
    const id = requestObject.params.id;
    const status = requestObject.body.status;
    const orderStatus = await Order.findOneAndUpdate(
      id,
      { orderStatus: status, paymentIntent: { status: status } },
      { new: true }
    );
    if (orderStatus) responseObject.status(200).json(orderStatus);
    else
      responseObject
        .status(400)
        .json({ message: "Could not update order status, please try again" });
  }
);

module.exports = {
  addNewUser: addNewUser,
  loginUser: loginUser,
  enumUsers: enumUsers,
  fetchUser: fetchUser,
  removeUser: removeUser,
  updateUser: updateUser,
  suspendAccount: suspendAccount,
  activateAccount: activateAccount,
  fetchRefreshToken: fetchRefreshToken,
  logout: logout,
  updatePassword: updatePassword,
  forgotPasswordToken: forgotPasswordToken,
  resetPassword: resetPassword,
  loginAdmin: loginAdmin,
  getWishlist: getWishlist,
  findUser: findUser,
  saveAddress: saveAddress,
  shoppingCart: shoppingCart,
  fetchCart: fetchCart,
  emptyCart: emptyCart,
  redeemCoupon: redeemCoupon,
  makeOrder: makeOrder,
  getOrder: getOrder,
  getAllOrder: getAllOrder,
  updateOrderStatus: updateOrderStatus,
  fetchOrder: fetchOrder,
};
