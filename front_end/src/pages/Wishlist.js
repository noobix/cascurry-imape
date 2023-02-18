import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const Wishlist = () => {
  return (
    <React.Fragment>
      <MetaData title="Wishlist" />
      <BreadCrumb title="wishlist" />
      <Container className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                className="position-absolute cross img-fluid"
                src="assets/images/cross.svg"
                alt="..."
              />
              <div className="wishlist-card-image">
                <img
                  className="img-fluid"
                  src="/assets/images/watch.jpg"
                  alt="..."
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">DM10 Max Smartwatch</h5>
                <h6 className="price mb-3 mt-2">&#36;240</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Wishlist;
