import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const ShippingPolicy = () => {
  return (
    <React.Fragment>
      <MetaData title="Shipping Policy" />
      <BreadCrumb title="shipping-policy" />
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

export default ShippingPolicy;
