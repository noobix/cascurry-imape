import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const RefundPolicy = () => {
  return (
    <React.Fragment>
      <MetaData title="Refund Policy" />
      <BreadCrumb title="refund-policy" />
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

export default RefundPolicy;
