import React from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import { toast } from "react-toastify";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  let signUpSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().required(),
    mobile: string().required(),
    password: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      !isError && formik.resetForm();
      setTimeout(() => navigate("/"), 500);
    },
  });
  return (
    <React.Fragment>
      <MetaData title="SignUp" />
      <BreadCrumb title="signup" />
      <Container className="signup-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h3 className="text-center mb-3">Sign up</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div className="d-flex justify-content-between gap-10">
                  <CustomInput
                    type="text"
                    name="fname"
                    placeholder="First name"
                    onChange={formik.handleChange("firstname")}
                    value={formik.values.firstname}
                    onBlur={formik.handleChange("firstname")}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="mb-2 mt-0">{formik.errors.firstname}</div>
                  ) : (
                    <span></span>
                  )}
                  <CustomInput
                    type="text"
                    name="lname"
                    placeholder="Last name"
                    onChange={formik.handleChange("lastname")}
                    value={formik.values.lastname}
                    onBlur={formik.handleChange("lastname")}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="mb-2 mt-0">{formik.errors.lastname}</div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <CustomInput
                  type="emal"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  value={formik.values.email}
                  onBlur={formik.handleChange("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="mb-2 mt-0">{formik.errors.email}</div>
                ) : (
                  <span></span>
                )}
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Phone"
                  onChange={formik.handleChange("mobile")}
                  value={formik.values.mobile}
                  onBlur={formik.handleChange("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="mb-2 mt-0">{formik.errors.mobile}</div>
                ) : (
                  <span></span>
                )}
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                  onBlur={formik.handleChange("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="mb-2 mt-0">{formik.errors.password}</div>
                ) : (
                  <span></span>
                )}
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
