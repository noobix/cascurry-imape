import React from "react";
import { Rating } from "@smastrom/react-rating";
import { Link, useLocation } from "react-router-dom";

const ProductCard = ({ grid }) => {
  const location = useLocation();
  return (
    <div className={location.pathname === "/store" ? `gr-${grid}` : "col-3"}>
      <Link className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
            <img src="/assets/images/wish.svg" alt="..." />
          </Link>
        </div>
        <div className="product-image">
          <img className="img-fluid" src="assets/images/watch.jpg" alt="..." />
          <img className="img-fluid" src="assets/images/watch2.jpg" alt="..." />
        </div>
        <div className="product-details">
          <h6 className="brand">apple</h6>
          <h5 className="product-title">
            Kids watches suitable for students color varities
          </h5>
          <Rating style={{ maxWidth: 90 }} value={3} />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            dignissimos, iusto veniam fuga architecto qui cumque! Eos debitis
            iusto, qui excepturi ab quam necessitatibus non distinctio
            voluptates?
          </p>
          <p className="price">&#36;250</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <Link>
              <img src="assets/images/view.svg" alt="..." />
            </Link>
            <Link>
              <img src="assets/images/prodcompare.svg" alt="..." />
            </Link>
            <Link>
              <img src="assets/images/add-cart.svg" alt="..." />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
