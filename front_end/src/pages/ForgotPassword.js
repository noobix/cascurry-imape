import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";

const ForgotPassword = () => {
  return (
    <React.Fragment>
      <MetaData title="Forgot password" />
      <BreadCrumb title="forgot-password" />
      <div className="forgot-password-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="reset-card">
              <h3 className="text-center mb-3">Password Reset</h3>
              <p className="text-center mt-2 mb-3">
                We will send you a reset link to your email
              </p>
              <form className="d-flex flex-column gap-15">
                <div>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="email"
                  />
                </div>
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
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
