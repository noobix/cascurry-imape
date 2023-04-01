import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import customerReducer from "../feature/customer/customerSlice";
import productsReducer from "../feature/item/itemSlice";
import brandsReducer from "../feature/brand/brandSlice";
import cartegoryReducer from "../feature/cartegory/cartegorySlice";
import colorReducer from "../feature/color/colorSlice";
import enquiryReducer from "../feature/enquiry/enquirySlice";
import blogReducer from "../feature/blog/blogSlice";
import couponReducer from "../feature/coupon/couponSlice";
import uploadReducer from "../feature/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    auth: authReducer,
    items: productsReducer,
    brands: brandsReducer,
    cartegory: cartegoryReducer,
    color: colorReducer,
    blog: blogReducer,
    coupon: couponReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
  },
});
