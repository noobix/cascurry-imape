import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <React.Fragment>
      <MetaData title="Rest Password" />
      <BreadCrumb title="reset-password" />
      <Container classProp="login-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Reset password</h3>
              <form className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="password"
                />
                <CustomInput
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                />
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
