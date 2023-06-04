import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { string, object } from "yup";
import { useFormik } from "formik";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getUserInfo,
  logoutUser,
  updateUser,
} from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enable, setenable] = React.useState(true);
  const { user, savedAddresses } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getUserInfo(user.refreshToken));
  }, [dispatch]);
  let profileSchema = object({
    firstname: string().required(),
    email: string().email().required(),
    mobile: string().required(),
    lastname: string().required(),
    addressLine1: string(),
    addressLine2: string(),
  });
  const formik = useFormik({
    initialValues: {
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      mobile: user.mobile || "",
      addressLine1: "",
      addressLine2: "",
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { addressLine1, addressLine2, ...rest } = values;
      values = { ...rest, address: { addressLine1, addressLine2 } };
      values = { data: values, token: user.refreshToken };
      dispatch(updateUser(values));
      setTimeout(() => setenable(false), 200);
      dispatch(getUser(user.refreshToken));
      dispatch(getUserInfo(user.refreshToken));
    },
  });
  function handleLogout() {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <React.Fragment>
      <MetaData title="Profile" />
      <BreadCrumb title="profile" />
      <Container classProp="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-8">
            <div className="d-flex gap-3">
              <div>
                {user && user.privileges === "admin" ? (
                  <img
                    src="https://marketplace.magento.com/media/catalog/product/4/a/4acb_rsz_admin-logo_1.png"
                    alt="..."
                    width="300"
                  />
                ) : (
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                    alt="..."
                    width="300"
                  />
                )}
              </div>
              <div>
                <div className="d-flex gap-15">
                  <p className="fs-3 text-decoration-underline">
                    {user.firstname}'s Profile
                  </p>
                  <a
                    className="fs-5 p-1"
                    role="button"
                    onClick={() => setenable(false)}
                  >
                    Edit
                  </a>
                  <a
                    className="fs-5 p-1 ml-10"
                    role="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <label for="input1" className="col-form-label">
                        First Name
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        disabled={enable}
                        id="input1"
                        className="form-control"
                        aria-labelledby="HelpInline"
                        name="firstname"
                        onChange={formik.handleChange("firstname")}
                        value={formik.values.firstname}
                        onBlur={formik.handleChange("firstname")}
                      />
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <div className="mb-2 mt-0">
                          {formik.errors.firstname}
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <label for="input2" className="col-form-label">
                        Last Name
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        disabled={enable}
                        id="input2"
                        className="form-control"
                        aria-labelledby="HelpInline"
                        name="lastname"
                        onChange={formik.handleChange("lastname")}
                        value={formik.values.lastname}
                        onBlur={formik.handleChange("lastname")}
                      />
                      {formik.touched.lastname && formik.errors.lastname ? (
                        <div className="mb-2 mt-0">
                          {formik.errors.lastname}
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <label for="input3" className="col-form-label">
                        Email
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="email"
                        disabled={enable}
                        id="input3"
                        className="form-control"
                        aria-labelledby="HelpInline"
                        name="email"
                        onChange={formik.handleChange("email")}
                        value={formik.values.email}
                        onBlur={formik.handleChange("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="mb-2 mt-0">{formik.errors.email}</div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <label for="input4" className="col-form-label">
                        Mobile
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        disabled={enable}
                        id="input4"
                        className="form-control"
                        aria-labelledby="HelpInline"
                        name="mobile"
                        onChange={formik.handleChange("mobile")}
                        value={formik.values.mobile}
                        onBlur={formik.handleChange("mobile")}
                      />
                      {formik.touched.mobile && formik.errors.mobile ? (
                        <div className="mb-2 mt-0">{formik.errors.mobile}</div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <label for="input4" className="col-form-label">
                        Address 1
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        disabled={enable}
                        id="input4"
                        className="form-control"
                        aria-labelledby="HelpInline"
                        name="addressLine1"
                        onChange={formik.handleChange("addressLine1")}
                        value={formik.values.addressLine1}
                        onBlur={formik.handleChange("addressLine1")}
                      />
                      {formik.touched.addressLine1 &&
                      formik.errors.addressLine1 ? (
                        <div className="mb-2 mt-0">
                          {formik.errors.addressLine1}
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <label for="input4" className="col-form-label">
                        Address 2
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        disabled={enable}
                        id="input4"
                        className="form-control"
                        aria-labelledby="HelpInline"
                        name="addressLine2"
                        onChange={formik.handleChange("addressLine2")}
                        value={formik.values.addressLine2}
                        onBlur={formik.handleChange("addressLine2")}
                      />
                      {formik.touched.addressLine2 &&
                      formik.errors.addressLine2 ? (
                        <div className="mb-2 mt-0">
                          {formik.errors.addressLine2}
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  {!enable && (
                    <button className="button" type="submit">
                      Save
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="col-4">
            <h6 className="mt-5">Saved Addresses</h6>
            {savedAddresses &&
              savedAddresses.address.length > 0 &&
              savedAddresses.address.map((address) => (
                <div className="border-start border-2 border-secondary px-2 my-2">
                  <p className="mb-0">{address.addressLine1}</p>
                  <p className="mb-0">{address.addressLine2}</p>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
