import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
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
              <form className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="email" />
                <div className="d-flex align-items-center flex-column justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Login
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
