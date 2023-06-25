import React from "react";
import { Rating } from "@smastrom/react-rating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, compareItem } from "../features/auth/authSlice";
import { addProductToCart } from "../features/auth/authSlice";

const ProductCard = ({ grid, data = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="row">
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <div
            key={index}
            className={`${
              location.pathname === "/store" ? `gr-${grid}` : "col-3"
            } product-card-card`}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={() =>
                    dispatch(
                      addWishlist({
                        token: user.refreshToken,
                        data: { item: item._id },
                      })
                    )
                  }
                >
                  <img src="/assets/images/wish.svg" alt="..." />
                </button>
              </div>
              <div className="product-image">
                {item.images &&
                  item.images
                    .slice(0, 2)
                    .map((image, index) => (
                      <img
                        key={index}
                        className="img-fluid"
                        src={image.image}
                        alt="..."
                      />
                    ))}
              </div>
              <div className="product-details">
                <h6 className="brand">{item.brand.name}</h6>
                <h5 className="product-title">
                  <Link to={"/store/product-view/" + item._id}>
                    {item.title}
                  </Link>
                </h5>
                <Rating style={{ maxWidth: 90 }} value={item.totalRatings} />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                >
                  {item.category.description}
                </p>
                <p className="price">&#8373;&nbsp;{item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img
                      src="assets/images/view.svg"
                      alt="..."
                      onClick={() =>
                        navigate("/store/product-view/" + item._id)
                      }
                    />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img
                      src="assets/images/prodcompare.svg"
                      alt="..."
                      onClick={() =>
                        dispatch(
                          compareItem({
                            token: user.refreshToken,
                            id: item._id,
                          })
                        )
                      }
                    />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img
                      src="assets/images/add-cart.svg"
                      alt="..."
                      onClick={() =>
                        dispatch(
                          addProductToCart({
                            token: user.refreshToken,
                            data: {
                              _id: item._id,
                              quantity: 1,
                              color: item.color.name,
                            },
                          })
                        )
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default React.memo(ProductCard);
