import { Rating } from "@smastrom/react-rating";
import React from "react";
import { Link } from "react-router-dom";

const SpecialProducts = () => {
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img
              className="img-fluid"
              src="assets/images/watch.jpg"
              alt="..."
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand">apple</h5>
            <h6 className="title">Silver Aluminum Case with Sport Band</h6>
            <Rating style={{ maxWidth: 80 }} />
            <p className="price">
              <span className="red-p">&#36;100&nbsp;</span>
              <strike>&#36;200</strike>
            </p>
            <div className="disount-till d-flex align-items-center">
              <p>
                <b>5</b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle bg-danger p-2">1</span>
                <span className="badge rounded-circle bg-danger p-2">1</span>
                <span className="badge rounded-circle bg-danger p-2">1</span>
              </div>
            </div>
            <div className="prod-count my-3">Products: 5</div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar" style={{ width: 25 }}></div>
            </div>
            <Link className="button my-3">Add to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProducts;
