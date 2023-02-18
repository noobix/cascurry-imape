import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const TermsAndConditions = () => {
  return (
    <React.Fragment>
      <MetaData title="Terms and Conditions" />
      <BreadCrumb title="terms-and-conditions" />
      <Container className="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default TermsAndConditions;
