const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const uniqid = require("uniqid");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
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
  requestObject.body.address &&
    newUser.address.push(requestObject.body.address);
  await newUser.save();
  responseObject.status(200).json(newUser);
});
const loginUser = asyncHandler(async (requestObject, responseObject) => {
  const { email, password } = requestObject.body;
  User.findOne({ email: email }).then(async (user) => {
    if (user && (await user.isPasswordAMatch(password))) {
      const refreshToken = refreshTokenGenerator(user.id);
      const saveToken = await User.findByIdAndUpdate(
        user.id,
        { refreshToken: refreshToken },
        { new: true }
      );
      if (saveToken) {
        responseObject.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        responseObject.status(200).json(saveToken);
      } else {
        responseObject.status(417).json({
          message: "Server error, Could not save token, please try again",
        });
      }
    } else {
      responseObject
        .status(404)
        .json({ message: "Credentials not found, please try again" });
    }
  });
});
const loginAdmin = asyncHandler(async (requestObject, responseObject) => {
  const { email, password } = requestObject.body;
  User.findOne({ email: email }).then(async (admin) => {
    if (admin?.privileges !== "admin") {
      responseObject.status(401).json({
        message: "You should not be here, please check with administrator",
      });
    }
    if (admin && (await admin.isPasswordAMatch(password))) {
      const refreshToken = refreshTokenGenerator(admin.id);
      const updatedAdmin = await User.findByIdAndUpdate(
        admin.id,
        { refreshToken: refreshToken },
        { new: true }
      );
      if (updatedAdmin) {
        responseObject.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        responseObject.status(200).json(updatedAdmin);
      } else {
        responseObject.status(417).json({
          message: "Server error, Could not save token, please try again",
        });
      }
    } else {
      responseObject
        .status(404)
        .json({ message: "Credentials not found, please try again" });
    }
  });
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
  requestObject.body.address && user.address.push(requestObject.body.address);
  await user.save();
  user
    ? responseObject.status(200).json(user)
    : responseObject
        .status(404)
        .json({ message: "Something went wrong, update unsuccessful" });
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
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user)
      throw new Error(
        "Invalid email address, Please enter a valid email address"
      );
    const resetToken = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `You are required to follow this link to reset your
    password, this link will be inactive in 10minutes only.
    <a href="https://open-market-sv2.netlify.app/reset-password/${resetToken}">Click here</a>`;
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
  console.log(user);
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
  const previousCart = await Cart.findOne({
    $and: [{ orderBy: user._id }, { status: "open" }],
  });
  if (previousCart) {
    for (let i = 0; i < cart.length; i++) {
      const existingProductIndex = previousCart.product.findIndex(
        (product) => product.product.toString() === cart[i]._id
      );
      if (existingProductIndex !== -1) {
        previousCart.product[existingProductIndex].quantity += cart[i].quantity;
      } else {
        let object = {};
        object.product = cart[i]._id;
        object.quantity = cart[i].quantity;
        object.color = cart[i].color;
        const getPrice = await Product.findById(cart[i]._id)
          .select("price")
          .exec();
        object.price = getPrice.price;
        previousCart.product.push(object);
      }
    }

    let total = 0;
    for (let i = 0; i < previousCart.product.length; i++) {
      const { price, quantity } = previousCart.product[i];
      total += price * quantity;
    }
    previousCart.cartTotal = total;
    const updatedCart = await previousCart.save();

    if (updatedCart) {
      responseObject.status(200).json(updatedCart);
    } else {
      responseObject
        .status(400)
        .json({ message: "Unable to save cart, please try again" });
    }
  } else {
    let product = [];
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.quantity = cart[i].quantity;
      object.color = cart[i].color;
      const getPrice = await Product.findById(cart[i]._id)
        .select("price")
        .exec();
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

    if (newCart) {
      responseObject.status(200).json(newCart);
    } else {
      responseObject
        .status(400)
        .json({ message: "Unable to save cart, please try again" });
    }
  }
});
const fetchCart = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const cart = await Cart.findOne({
    $and: [{ orderBy: id }, { status: "open" }],
  })
    .populate("product.product")
    .populate("orderBy");
  if (cart) responseObject.status(200).json(cart);
  else responseObject.send([]);
});
const updateProductQuantityUp = asyncHandler(
  async (requestObject, responseObject) => {
    const userId = requestObject.user._id;
    const cart = await Cart.findOne({ orderBy: userId }).populate(
      "product.product"
    );
    const { product, value } = requestObject.body;
    const update = await Cart.findByIdAndUpdate(
      cart.cartId,
      { $inc: { "product.$[prod].quantity": value } },
      { arrayFilters: [{ "prod.product": product }] }
    );
    if (update) {
      const updatedCart = await Cart.findById(cart).populate("product.product");
      const cartTotal = updatedCart.product.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
      await Cart.findByIdAndUpdate(cart, { cartTotal });
      responseObject
        .status(200)
        .json({ message: "Quantity updated successfully" });
    } else {
      responseObject.status(404).json({ message: "Cart not found" });
    }
  }
);
const updateProductQuantityDown = asyncHandler(
  async (requestObject, responseObject) => {
    const userId = requestObject.user._id;
    const cart = await Cart.findOne({ orderBy: userId }).populate(
      "product.product"
    );
    const { product, value } = requestObject.body;
    const update = await Cart.findByIdAndUpdate(
      cart.cartId,
      {
        $inc: { "product.$[elem].quantity": -value },
      },
      { arrayFilters: [{ "elem.product": product }] }
    );
    if (update) {
      const updatedCart = await Cart.findById(cart).populate("product.product");
      const cartTotal = updatedCart.product.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
      await Cart.findByIdAndUpdate(cart, { cartTotal });
      responseObject
        .status(200)
        .json({ message: "Quantity updated successfully" });
    } else {
      responseObject.status(404).json({ message: "Cart not found" });
    }
  }
);
const removeItemFromCart = asyncHandler(
  async (requestObject, responseObject) => {
    const id = requestObject.user._id;
    const item = requestObject.params.id;
    const cart = await Cart.findOne({ orderBy: id, status: "open" });
    if (!cart) {
      return responseObject.status(404).json({ message: "Cart not found" });
    }
    cart.product = cart.product.filter(
      (product) => product.product.toString() !== item
    );
    const total = cart.product.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    cart.cartTotal = total;
    await cart.save();
    responseObject.status(200).json(cart);
  }
);
const emptyCart = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const cart = await Cart.findOne({ orderBy: id });
  if (cart && cart.status === "open" && cart.product.length > 0) {
    cart.product = [];
    cart.cartTotal = 0;
    await cart.save();
    responseObject.status(200).json(cart);
  } else {
    responseObject.status(400).json({ message: "Cart not found or empty" });
  }
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
  const userCart = await Cart.findOne({
    $and: [{ orderBy: id }, { status: "open" }],
  });
  const existingOrder = await Order.findOne({ cartInfo: userCart?._id });
  if (existingOrder) {
    return responseObject.status(200).json(existingOrder);
  } else {
    const grandTotal =
      userCart.totalAfterDiscount ||
      userCart.product.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    userCart.totalAfterDiscount = grandTotal;
    await userCart.save();
    const newOrder = await new Order({
      product: userCart.product,
      paymentIntent: {
        id: uniqid(),
        method: requestObject.body.paymentIntent.method,
        amount: grandTotal,
        date: Date.now(),
        currency: "USD",
      },
      orderBy: id,
      cartInfo: userCart._id,
      orderStatus: "Not Processed",
      shippingInfo: {
        firstname: requestObject.body.shippingInfo.firstname,
        lastname: requestObject.body.shippingInfo.lastname,
        addressLine1: requestObject.body.shippingInfo.addressLine1,
        addressLine2: requestObject.body.shippingInfo.addressLine2,
        city: requestObject.body.shippingInfo.city,
        state: requestObject.body.shippingInfo.state || undefined,
        zip: requestObject.body.shippingInfo.zip || undefined,
        country: requestObject.body.shippingInfo.country,
      },
      shippingFee: 129,
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
    if (normalized) {
      responseObject.status(200).json(newOrder);
    } else {
      responseObject
        .status(400)
        .json({ message: "Unable to place order, PLease try again" });
    }
  }
});
const getOrder = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.user._id;
  const order = await Order.find({ orderBy: id })
    .populate("product.product")
    .populate("orderBy");
  if (order) responseObject.status(200).json(order);
  else
    responseObject
      .status(400)
      .json({ message: "Could not find any orders, please try again" });
});
const getOrderCheckout = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const orderCheckedout = await Order.findOne({
    "paymentIntent.transactionId": id,
  });
  if (orderCheckedout) responseObject.status(200).json(orderCheckedout);
  else
    responseObject
      .status(404)
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
      { _id: id },
      { orderStatus: status },
      { new: true }
    ).populate("product.product");

    if (orderStatus) {
      responseObject.status(200).json(orderStatus);
    } else {
      responseObject
        .status(400)
        .json({ message: "Could not update order status, please try again" });
    }
  }
);
const getSavedAddress = asyncHandler(async (requestObject, responseObject) => {
  const { _id } = requestObject.user;
  const { address, email } = await User.findById(_id);
  if (address && email) responseObject.status(200).json({ address, email });
  else responseObject.status(404).json({ message: "User not found" });
});
const monthRevenueRecords = asyncHandler(
  async (requestObject, responseObject) => {
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let now = new Date();
    let limit = "";
    now.setDate(1);
    for (let x = 0; x < 11; x++) {
      now.setMonth(now.getMonth() - 1);
      limit = monthList[now.getMonth()] + " " + now.getFullYear();
    }
    const data = await Order.aggregate([
      { $match: { createdAt: { $lte: new Date(), $gte: new Date(limit) } } },
      {
        $group: {
          _id: { month: "$orderMonth" },
          amount: { $sum: "$paymentIntent.amountPaid" },
          count: { $sum: 1 },
        },
      },
    ]);
    responseObject.json(data);
  }
);
const yearRevenueRecords = asyncHandler(
  async (requestObject, responseObject) => {
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let now = new Date();
    let limit = "";
    now.setDate(1);
    for (let x = 0; x < 11; x++) {
      now.setMonth(now.getMonth() - 1);
      limit = monthList[now.getMonth()] + " " + now.getFullYear();
    }
    const data = await Order.aggregate([
      { $match: { createdAt: { $lte: new Date(), $gte: new Date(limit) } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          amount: { $sum: "$paymentIntent.amountPaid" },
        },
      },
    ]);
    responseObject.json(data);
  }
);
const compareProduct = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const idUser = requestObject.user._id;
  const user = await User.findById(idUser);
  const item = await Product.findById(id).populate("brand");
  if (item) {
    const product = {
      id: item._id,
      image: item.images[0].image,
      title: item.title,
      price: item.price,
      brand: item.brand.name,
      isInstock: item.quantity > 0 ? "In-Stock" : "Sold-out",
      color: item.color,
    };
    const saveCompare = await User.findByIdAndUpdate(
      idUser,
      { $push: { compareList: product } },
      { new: true }
    );
    if (saveCompare) {
      responseObject.status(200).json(user);
    } else
      responseObject
        .status(417)
        .json({ message: "Unable to save compare product, please try again" });
  } else {
    responseObject.status(404).json({ message: "Product not found" });
  }
});
const removeCompare = asyncHandler(async (requestObject, responseObject) => {
  const { id } = requestObject.params;
  const idUser = requestObject.user._id;
  const user = await User.findById(idUser);
  const item = await Product.findById(id);
  if (item) {
    const removeCompare = await User.findByIdAndUpdate(
      idUser,
      { $pull: { compareList: { title: item.title } } },
      { new: true }
    );
    if (removeCompare) responseObject.status(200).json(user);
    else
      responseObject
        .status(417)
        .json({ message: "Unable to remove compare item, please try again" });
  } else {
    responseObject.status(404).json({ message: "Product not found" });
  }
});
const getCompareProducts = asyncHandler(
  async (requestObject, responseObject) => {
    const user = requestObject.user._id;
    const getCompareList = await User.findById(user);
    if (getCompareList) responseObject.status(200).json(getCompareList);
    else
      responseObject
        .status(404)
        .json({ message: "Unable to get compare products" });
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
  updateProductQuantityDown: updateProductQuantityDown,
  updateProductQuantityUp: updateProductQuantityUp,
  removeItemFromCart: removeItemFromCart,
  redeemCoupon: redeemCoupon,
  makeOrder: makeOrder,
  getOrder: getOrder,
  getOrderCheckout: getOrderCheckout,
  getAllOrder: getAllOrder,
  updateOrderStatus: updateOrderStatus,
  fetchOrder: fetchOrder,
  getSavedAddress: getSavedAddress,
  monthRevenueRecords: monthRevenueRecords,
  yearRevenueRecords: yearRevenueRecords,
  compareProduct: compareProduct,
  removeCompare: removeCompare,
  getCompareProducts: getCompareProducts,
};
