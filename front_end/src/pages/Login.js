import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <React.Fragment>
      <MetaData title="Login" />
      <BreadCrumb title="login" />
      <Container classProp="login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Login</h3>
              <form className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="email" />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="password"
                />
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
