import React from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import PasswordInput from "../components/PasswordInput";
import { validate } from "secure-password-validator";
import first10000 from "secure-password-validator/build/main/blacklists/first10_000";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword } from "../features/auth/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split("/")[2];
  let resetSchema = object({
    password: string().required(),
    confirmPassword: string().required(),
  });
  const schema = {
    maxLength: 50,
    blacklist: first10000,
    digits: true,
    letters: true,
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      values = { data: { password: values.password }, token: token };
      if (values.password !== values.confirmPassword)
        return (formik.errors.confirmPassword = "Password Mismatch");
      const valid = validate(formik.values.password, schema);
      if (!valid.valid)
        return (formik.errors.password = valid.errors.map((err) => {
          let display =
            err.toLowerCase() === "min_length"
              ? "*Password does not reach minimum length of 8"
              : err.toLowerCase() === "max_length"
              ? "*You have exceeded the password length of 50"
              : err.toLowerCase() === "digits"
              ? "*You are required to have a number in your password"
              : err.toLowerCase() === "letters"
              ? "*You are required to have a letter in your password"
              : err.toLowerCase() === "blacklist"
              ? "*Your password has passed the blacklist and can be predicted"
              : undefined;
          return display;
        }));
      dispatch(changePassword(values));
      setTimeout(() => navigate("/"), 200);
    },
  });
  return (
    <React.Fragment>
      <MetaData title="Rest Password" />
      <BreadCrumb title="reset-password" />
      <Container classProp="login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Reset password</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <PasswordInput
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                  onBlur={formik.handleBlur("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="mb-2 mt-0">{formik.errors.password}</div>
                ) : (
                  <span></span>
                )}
                <PasswordInput
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  onChange={formik.handleChange("confirmPassword")}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="mb-2 mt-0">
                    {formik.errors.confirmPassword}
                  </div>
                ) : (
                  <span></span>
                )}
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Save
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

export default ResetPassword;
