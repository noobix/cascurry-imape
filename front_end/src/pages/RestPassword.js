import React from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import PasswordInput from "../components/PasswordInput";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword } from "../features/auth/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split("/")[2];
  let profileSchema = object({
    password: string().required(),
    confirmPassword: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      values = { data: { password: values.password }, token: token };
      if (values.password !== values.confirmPassword)
        return (formik.errors.confirmPassword = "Password Mismatch");
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
                  onBlur={formik.handleChange("password")}
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
                  onBlur={formik.handleChange("confirmPassword")}
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
