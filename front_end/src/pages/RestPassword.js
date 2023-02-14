import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";

const ResetPassword = () => {
  return (
    <React.Fragment>
      <MetaData title="Rest Password" />
      <BreadCrumb title="reset-password" />
      <div className="login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Reset password</h3>
              <form className="d-flex flex-column gap-15">
                <div>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <div>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Save
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

export default ResetPassword;
