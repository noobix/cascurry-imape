import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const Cart = () => {
  return (
    <React.Fragment>
      <MetaData title="Cart" />
      <BreadCrumb title="cart" />
      <Container classProp="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex align-items-center justify-content-between py-3">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Sub Total</h4>
            </div>
            <div className="cart-data d-flex align-items-center justify-content-between py-3">
              <div className="cart-col-1 d-flex align-items-center gap-15">
                <div className="w-25">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/laptop-02.jpg"
                    }
                    alt="..."
                    className="img-fluid"
                  />
                </div>
                <div className="w-75">
                  <h5 className="title mb-1">
                    Dell Intel Core i7 8th Gen. Quad Core, 1.8 GHz Clock Speed.
                    8 GB RAM. 512 GB Hard Disk.
                  </h5>
                  <p className="color mb-0">Black</p>
                  <p className="size">14.1 inches</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">&#36;5800</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                  <input
                    type="number"
                    className="form-control w-10"
                    min={1}
                    max={11}
                  />
                </div>
                <div>
                  <RiDeleteBinLine />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="total">&#36;5800</h5>
              </div>
            </div>
            <div className="col-12 py-2 mt-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/store" className="button">
                  Continue Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4 className="total">Total:&nbsp;&#36;5800</h4>
                  <p>Taxes and shipping are calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Cart;
