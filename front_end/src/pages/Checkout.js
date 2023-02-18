import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Container from "../components/Container";

const Checkout = () => {
  return (
    <React.Fragment>
      <Container classProp="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-pane">
              <h3>Online Store</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/cart">cart</Link>
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item">
                    <Link to="/shipping">shipping</Link>
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h3 className="section-heading">Contact Information</h3>
              <p className="account-details">nanayaw@live.com</p>
              <Link>Logout</Link>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label className="form-check-label py-2" for="flexCheckChecked">
                  Email me with news and offers
                </label>
              </div>
              <h6 className="mt-4">Shippping Address</h6>
              <form className="d-flex justify-content-between flex-column gap-15">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect1"
                    aria-label="Floating label select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <label for="floatingSelect1">Saved addresses</label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect2"
                    aria-label="Floating label select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <label for="floatingSelect2">
                    Country&nbsp;/&nbsp;Region
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div style={{ width: "45%" }} className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputValue1"
                      placeholder="Kwesi"
                      value="test@example.com"
                    />
                    <label for="floatingInputValue1">First Name</label>
                  </div>
                  <div style={{ width: "45%" }} className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputValue2"
                      placeholder="Ofori"
                      value="test@example.com"
                    />
                    <label for="floatingInputValue2">Last Name</label>
                  </div>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    aria-label="default input example"
                  />
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Apartment, suit etc..."
                    aria-label="default input example"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center gap-15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    aria-label="default input example"
                  />
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>State</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Zipcode"
                    aria-label="default input example"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/cart">
                    <MdOutlineArrowBackIosNew className="fs-5 ma-2" />
                    Return to cart
                  </Link>
                  <Link to="/shipping" className="button">
                    Continue to shipping
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-3">
              <div className="d-flex justify-content-between align-items-center gap-15">
                <img
                  className="img-fluid w-25 d-inline-block"
                  src={process.env.PUBLIC_URL + "/assets/images/laptop-02.jpg"}
                  alt="..."
                />
                <span
                  style={{ top: -40, right: 10 }}
                  className="badge bg-secondary text-white rounded-circle p-2 position-relative"
                >
                  1
                </span>
                <div className="checkout-product d-flex flex-column align-items-baseline">
                  <h6>
                    Dell Intel Core i7 8th Gen. Quad Core, 1.8 GHz Clock Speed.
                    8 GB RAM. 512 GB Hard Disk.
                  </h6>
                  <p>#3430392FF</p>
                </div>
                <h6>&#36;5800</h6>
              </div>
            </div>
            <div className="border-bottom py-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="checkout-subtotal">Sub total</p>
                <p className="checkout-subtotal-amount">&#36;5800</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1 checkout-shipping-total">Shipping</p>
                <p className="mb-1 checkout-shipping-amount">&#36;129</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
              <h4 className="checkout-total">Total</h4>
              <h5 className="checkout-amount">&#36;5929</h5>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
