import React from "react";
import { Link } from "react-router-dom";
import { string, object } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";
import { forgotPassword } from "../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { user, isError } = useSelector((state) => state.auth);
  let profileSchema = object({
    email: string().email().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      values = { data: values, token: user?.refreshToken };
      dispatch(forgotPassword(values));
      setTimeout(() => !isError && formik.resetForm(), 150);
    },
  });
  return (
    <React.Fragment>
      <MetaData title="Forgot password" />
      <BreadCrumb title="forgot-password" />
      <Container classProp="forgot-password-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="reset-card">
              <h3 className="text-center mb-3">Password Reset</h3>
              <p className="text-center mt-2 mb-3">
                We will send you a reset link to your email
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={formik.handleChange("email")}
                  value={formik.values.email}
                  onBlur={formik.handleBlur("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.email}
                  </div>
                ) : (
                  <span></span>
                )}
                <div className="d-flex align-items-center flex-column justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Send Mail
                  </button>
                  <Link to="/login">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ForgotPassword;
