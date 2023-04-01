import { Rating } from "@smastrom/react-rating";
import React from "react";
import { Link } from "react-router-dom";

const SpecialProducts = ({ data = [] }) => {
  return (
    <div className="row">
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <div key={index} className="col-6 mb-3">
            <div className="special-product-card">
              <div className="d-flex justify-content-between gap-5">
                <div>
                  <div>
                    {item.images.slice(0, 1).map((image, index) => (
                      <img
                        key={index}
                        className="img-fluid"
                        src={image.image}
                        alt="..."
                      />
                    ))}
                  </div>
                  <div className="special-product-content">
                    <h5 className="brand">{item.brand.name}</h5>
                    <h6 className="title">{item.title}</h6>
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={item.totalRatings}
                    />
                    <p className="price">
                      <span className="red-p">&#36;{item.price}&nbsp;</span>
                      <strike>&#36;200</strike>
                    </p>
                    <div className="disount-till d-flex align-items-center">
                      <p>
                        <b>5</b>days
                      </p>
                      <div className="d-flex gap-10 align-items-center">
                        <span className="badge rounded-circle bg-danger p-2">
                          1
                        </span>
                        <span className="badge rounded-circle bg-danger p-2">
                          1
                        </span>
                        <span className="badge rounded-circle bg-danger p-2">
                          1
                        </span>
                      </div>
                    </div>
                    <div className="prod-count my-3">
                      Products: {item.quantity}
                    </div>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      style={{
                        width:
                          (item.quantity / item.quantity + item.sold) * 100 +
                          "%",
                      }}
                      aria-valuenow={
                        (item.quantity / item.quantity + item.sold) * 100
                      }
                      aria-valuemin={item.quantity}
                      aria-valuemax={item.sold + item.quantity}
                    >
                      <div className="progress-bar" style={{ width: 25 }}></div>
                    </div>
                    <Link className="button my-3">Add to Cart</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SpecialProducts;
