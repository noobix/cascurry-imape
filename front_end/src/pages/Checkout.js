import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useFormik } from "formik";
import { string, object } from "yup";
import Container from "../components/Container";
import {
  getCart,
  getCitiesList,
  getCountryList,
  getUserInfo,
} from "../features/auth/authSlice";
import PaymentMethod from "../components/PaymentMethod";

const Checkout = () => {
  const dispatch = useDispatch();
  const [address, setaddress] = React.useState("");
  const { user, savedAddresses, cart, isError, countryList, cityList } =
    useSelector((state) => state.auth) ?? {};
  const { session } = useSelector((state) => state.payment);
  React.useEffect(() => {
    dispatch(getUserInfo(user.refreshToken));
    dispatch(getCart(user.refreshToken));
    dispatch(getCountryList());
  }, [dispatch]);
  React.useEffect(() => {
    if (session.url && session.url.length) window.location.href = session.url;
  }, [session]);
  const handleSelect = (e) => {
    const selected = countryList.find(
      (country) => country.name === e.target.value
    );
    dispatch(getCitiesList(selected.iso2));
    formik.setFieldValue("country", e.target.value);
  };
  let orderSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    addressLine1: string().required(),
    addressLine2: string().required(),
    city: string().required(),
    state: string(),
    zip: string(),
    country: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      addressLine1: address.split("-")[0] || "",
      addressLine2: address.split("-")[1] || "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    validationSchema: orderSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      PaymentMethod(values, user, { cart: cart }, dispatch);
      setaddress("");
      !isError && formik.resetForm();
    },
  });
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
                    Information
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
              <p className="account-details">{savedAddresses?.email}</p>
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
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex justify-content-between flex-column gap-15"
              >
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect1"
                    aria-label="Floating label select example"
                    onClick={(e) => setaddress(e.target.value)}
                    name="address"
                  >
                    <option defaultValue>Open this select menu</option>
                    {savedAddresses &&
                      savedAddresses.address &&
                      savedAddresses.address.length > 0 &&
                      savedAddresses.address.map((info, index) => (
                        <option
                          key={index}
                          value={info.addressLine1 + "-" + info.addressLine2}
                        >
                          {info.addressLine1 + "\n" + info.addressLine2}
                        </option>
                      ))}
                  </select>
                  <label for="floatingSelect1">Saved addresses</label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect2"
                    aria-label="Floating label select example"
                    name="country"
                    onChange={handleSelect}
                    value={formik.values.country}
                    onBlur={formik.handleChange("country")}
                  >
                    <option defaultValue>Open this select menu</option>
                    {countryList &&
                      countryList.length > 0 &&
                      countryList.map((country, index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                  {formik.touched.country && formik.errors.country ? (
                    <div className="mb-2 mt-0">{formik.errors.country}</div>
                  ) : (
                    <span></span>
                  )}
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
                      name="firstname"
                      placeholder="Kwesi"
                      onChange={formik.handleChange("firstname")}
                      value={formik.values.firstname}
                      onBlur={formik.handleChange("firstname")}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="mb-2 mt-0">{formik.errors.firstname}</div>
                    ) : (
                      <span></span>
                    )}
                    <label for="floatingInputValue1">First Name</label>
                  </div>
                  <div style={{ width: "45%" }} className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputValue2"
                      placeholder="Ofori"
                      name="lastname"
                      onChange={formik.handleChange("lastname")}
                      value={formik.values.lastname}
                      onBlur={formik.handleChange("lastname")}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div className="mb-2 mt-0">{formik.errors.lastname}</div>
                    ) : (
                      <span></span>
                    )}
                    <label for="floatingInputValue2">Last Name</label>
                  </div>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    aria-label="default input example"
                    name="addressLine1"
                    onChange={formik.handleChange("addressLine1")}
                    value={formik.values.addressLine1}
                    onBlur={formik.handleChange("addressLine1")}
                  />
                  {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                    <div className="mb-2 mt-0">
                      {formik.errors.addressLine1}
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Apartment, suit etc..."
                    aria-label="default input example"
                    name="addressLine2"
                    onChange={formik.handleChange("addressLine2")}
                    value={formik.values.addressLine2}
                    onBlur={formik.handleChange("addressLine2")}
                  />
                  {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
                    <div className="mb-2 mt-0">
                      {formik.errors.addressLine2}
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center gap-15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    aria-label="default input example"
                    name="city"
                    onChange={formik.handleChange("city")}
                    value={formik.values.city}
                    onBlur={formik.handleChange("city")}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="mb-2 mt-0">{formik.errors.city}</div>
                  ) : (
                    <span></span>
                  )}
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="state"
                    onChange={formik.handleChange("state")}
                    value={formik.values.state}
                    onBlur={formik.handleChange("state")}
                  >
                    <option defaultValue>State</option>
                    {cityList &&
                      cityList.length > 0 &&
                      cityList.map((city) => (
                        <option value={city.name}>{city.name}</option>
                      ))}
                  </select>
                  {formik.touched.state && formik.errors.state ? (
                    <div className="mb-2 mt-0">{formik.errors.state}</div>
                  ) : (
                    <span></span>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Zipcode"
                    aria-label="default input example"
                    name="zip"
                    onChange={formik.handleChange("zip")}
                    value={formik.values.zip}
                    onBlur={formik.handleChange("zip")}
                  />
                  {formik.touched.zip && formik.errors.zip ? (
                    <div className="mb-2 mt-0">{formik.errors.zip}</div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/cart">
                    <MdOutlineArrowBackIosNew className="fs-5 ma-2" />
                    Return to cart
                  </Link>
                  <button type="submit" className="button">
                    Continue to shipping
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-3">
              {cart &&
                cart.product &&
                cart.product.length > 0 &&
                cart.product.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-center gap-10"
                    key={index}
                  >
                    <img
                      className="img-fluid w-25 d-inline-block"
                      src={item.product.images[0].image}
                      alt="..."
                    />
                    <span
                      style={{ top: -40, right: 10 }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-relative"
                    >
                      {item.quantity}
                    </span>
                    <div className="checkout-product d-flex flex-column align-items-baseline">
                      <h6>{item.product.title}</h6>
                      <p>#3430392FF</p>
                    </div>
                    <h6>&#8373;&nbsp;{item.product.price}</h6>
                  </div>
                ))}
            </div>
            <div className="border-bottom py-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="checkout-subtotal">Sub total</p>
                <p className="checkout-subtotal-amount">
                  &#8373;&nbsp;
                  {cart &&
                    cart.product &&
                    cart.product.length > 0 &&
                    cart.product.reduce(
                      (acc, val) => acc + val.quantity * val.product.price,
                      0
                    )}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1 checkout-shipping-total">Shipping</p>
                <p className="mb-1 checkout-shipping-amount">
                  &#8373;&nbsp;129
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
              <h4 className="checkout-total">Total</h4>
              <h5 className="checkout-amount">
                &#8373;&nbsp;
                {cart &&
                  cart.product &&
                  cart.product.length > 0 &&
                  cart.product.reduce(
                    (acc, val) => acc + val.quantity * val.product.price,
                    129
                  )}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
