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
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import ColorList from "./Pages/ColorList";
import CartegoryList from "./Pages/CartegoryList";
import BrandList from "./Pages/BrandList";
import ProductList from "./Pages/ProductList";
import NewBlog from "./Pages/NewBlog";
import AddColor from "./Pages/AddColor";
import AddProductCartegory from "./Pages/AddProductCartegory";
import AddBrand from "./Pages/AddBrand";
import AddProduct from "./Pages/AddProduct";
import CreateCoupon from "./Pages/CreateCoupon";
import CouponList from "./Pages/CouponList";
import ViewEnquiry from "./Pages/ViewEnquiry";
import ViewOrder from "./Pages/ViewOrder";

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
          <Route path="enquiry-view/:id" element={<ViewEnquiry />} />
          <Route path="all-blogs" element={<BlogList />} />
          <Route path="add-blog" element={<NewBlog />} />
          <Route path="add-blog/:id" element={<NewBlog />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color" element={<AddColor />} />
          <Route path="meta-list" element={<ColorList />} />
          <Route path="make" element={<AddBrand />} />
          <Route path="make/:id" element={<AddBrand />} />
          <Route path="make-list" element={<BrandList />} />
          <Route path="add-item" element={<AddProduct />} />
          <Route path="add-item/:id" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="cartegory" element={<AddProductCartegory />} />
          <Route path="cartegory/:id" element={<AddProductCartegory />} />
          <Route path="section-list" element={<CartegoryList />} />
          <Route path="add-coupon" element={<CreateCoupon />} />
          <Route path="add-coupon/:id" element={<CreateCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
