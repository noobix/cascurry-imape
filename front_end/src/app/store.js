import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/items/itemSlice";
import blogReducer from "../features/blogs/blogslice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: productReducer,
    blog: blogReducer,
    enquiry: contactReducer,
  },
});
