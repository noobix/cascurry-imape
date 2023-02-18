import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

export const PrivicyPolicy = () => {
  return (
    <React.Fragment>
      <MetaData title="Privicy Policy" />
      <BreadCrumb title="privicy-policy" />
      <Container classProp="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
