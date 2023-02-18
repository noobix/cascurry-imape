import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const CompareProduct = () => {
  return (
    <React.Fragment>
      <MetaData title="Compare Product" />
      <BreadCrumb title="compare-product" />
      <Container classProp="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                className="position-absolute cross img-fluid"
                src="assets/images/cross.svg"
                alt="..."
              />
              <div className="product-card-image">
                <img
                  className="img-fluid"
                  src="/assets/images/watch.jpg"
                  alt="..."
                />
              </div>
              <div className="compare-product-details">
                <h5 className="title">DM10 Max Smartwatch</h5>
                <h6 className="price mb-3 mt-2">&#36;240</h6>
                <div className="product-detail">
                  <h5>Brand:</h5>
                  <p>apple</p>
                </div>
                <div className="product-detail">
                  <h5>Type:</h5>
                  <p>Watch</p>
                </div>
                <div className="product-detail">
                  <h5>Availability:</h5>
                  <p>In-stock</p>
                </div>
                <div className="product-detail">
                  <h5>Color:</h5>
                  <Color />
                </div>
                <div className="product-detail">
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>5</p>
                    <p>M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default CompareProduct;
