import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";

const SignUp = () => {
  return (
    <React.Fragment>
      <MetaData title="SignUp" />
      <BreadCrumb title="signup" />
      <Container className="signup-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h3 className="text-center mb-3">Sign up</h3>
              <form className="d-flex flex-column gap-15">
                <CustomInput type="text" name="name" placeholder="Full name" />
                <CustomInput type="emal" name="email" placeholder="Email" />
                <CustomInput type="tel" name="mobile" placeholder="Phone" />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="password"
                />
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Signup
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

export default SignUp;
