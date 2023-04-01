import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../feature/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userSchema = object({
    password: string().required(),
    email: string().email().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  React.useEffect(() => {
    if (user) navigate("admin");
    else navigate("/");
  }, [user]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h3>Login</h3>
        <p>Login to your account to continue</p>
        {message.message == "Rejected" ? (
          <div className="text-center">
            "You dont have administrative privileges"
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            id="usremail"
            label="Email"
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
            onBlur={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
          <CustomInput
            id="usrpassword"
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            onBlur={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
          <div className="mb-3 text-end">
            <Link to="/forgot-passworc">Forgot Password</Link>
          </div>
          <button
            style={{ background: "#ffd333" }}
            type="submit"
            className="border-0 px-3 py-2 text-white fw-bold w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
