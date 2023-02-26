import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../Components/CustomInput";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h3>Login</h3>
        <p>Login to your account to continue</p>
        <form>
          <CustomInput
            id="usremail"
            label="Email"
            type="email"
            placeholder="Email Address"
          />
          <CustomInput
            id="usrpassword"
            label="Password"
            type="password"
            placeholder="Password"
          />
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
