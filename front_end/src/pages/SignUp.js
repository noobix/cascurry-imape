import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";

const SignUp = () => {
  return (
    <React.Fragment>
      <MetaData title="SignUp" />
      <BreadCrumb title="signup" />
      <div className="signup-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h3 className="text-center mb-3">Sign up</h3>
              <form className="d-flex flex-column gap-15">
                <div>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <input
                    className="form-control"
                    type="emal"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    className="form-control"
                    type="tel"
                    name="mobile"
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
