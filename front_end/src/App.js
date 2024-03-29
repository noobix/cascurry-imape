import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CompareProduct from "./pages/CompareProduct";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OurStore from "./pages/OurStore";
import { PrivicyPolicy } from "./pages/PrivicyPolicy";
import ProductView from "./pages/ProductView";
import ReadBlog from "./pages/ReadBlog";
import RefundPolicy from "./pages/RefundPolicy";
import ResetPassword from "./pages/RestPassword";
import ShippingPolicy from "./pages/ShippingPolicy";
import SignUp from "./pages/SignUp";
import TermsAndConditions from "./pages/TermsAndConditions";
import Wishlist from "./pages/Wishlist";
import PaymentRecieved from "./pages/PaymentRecieved";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="store" element={<OurStore />} />
            <Route path="/store/product-view/:id" element={<ProductView />} />
            <Route path="blog" element={<Blog />} />
            <Route path="/read-blog/:id" element={<ReadBlog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order-history" element={<Orders />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment-recieved" element={<PaymentRecieved />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="privicy-policy" element={<PrivicyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
}

export default App;
