import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/MainLayout";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Enquiries from "./Pages/Enquiries";
import BlogList from "./Pages/BlogList";
import BlogCartegoryList from "./Pages/BlogCartegoryList";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import ColorList from "./Pages/ColorList";
import CartegoryList from "./Pages/CartegoryList";
import BrandList from "./Pages/BrandList";
import ProductList from "./Pages/ProductList";
import NewBlog from "./Pages/NewBlog";
import AddBlogCartegory from "./Pages/AddBlogCartegory";
import AddColor from "./Pages/AddColor";
import AddProductCartegory from "./Pages/AddProductCartegory";
import AddBrand from "./Pages/AddBrand";
import AddProduct from "./Pages/AddProduct";
import CreateCoupon from "./Pages/CreateCoupon";
import CouponList from "./Pages/CouponList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index="admin" element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="all-blogs" element={<BlogList />} />
          <Route path="add-blog" element={<NewBlog />} />
          <Route path="blog-cartegory" element={<AddBlogCartegory />} />
          <Route path="blog-cartegory-list" element={<BlogCartegoryList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color" element={<AddColor />} />
          <Route path="meta-list" element={<ColorList />} />
          <Route path="section-list" element={<CartegoryList />} />
          <Route path="make" element={<AddBrand />} />
          <Route path="make-list" element={<BrandList />} />
          <Route path="add-item" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="cartegory" element={<AddProductCartegory />} />
          <Route path="add-coupon" element={<CreateCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
