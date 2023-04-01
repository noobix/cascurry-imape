import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { string, object } from "yup";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, user } = useSelector(
    (state) => state.auth
  );
  React.useEffect(() => {
    if (isSuccess) toast.success("Registered sucessfully added");
    if (isError) toast.error("Unable to register, please try again");
  }, [isError, isSuccess]);
  let loginSchema = object({
    email: string().required(),
    password: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      !isError && formik.resetForm();
      navigate("/");
    },
  });
  return (
    <React.Fragment>
      <MetaData title="Login" />
      <BreadCrumb title="login" />
      <Container classProp="login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Login</h3>
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
                  onBlur={formik.handleChange("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="mb-2 mt-0">{formik.errors.email}</div>
                ) : (
                  <span></span>
                )}
                <CustomInput
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
                <Link to="/forgot-password">Forgot Password</Link>
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Login
                  </button>
                  <Link className="button signup" to="/signup">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
