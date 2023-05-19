import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/auth/authSlice";
import {
  fetchItemsCartegory,
  getCartegories,
  getProducts,
  productPagination,
  searchProduct,
} from "../features/items/itemSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setquery] = React.useState("");
  const { cart, user } = useSelector((state) => state.auth) ?? {};
  const { categories } = useSelector((state) => state.item) ?? {};
  React.useEffect(() => {
    dispatch(getCart(user?.refreshToken));
    dispatch(getCartegories(user?.refreshToken));
  }, [dispatch]);
  React.useEffect(() => {
    if (query.length > 0) {
      navigate("/store");
      dispatch(searchProduct({ token: user?.refreshToken, search: query }));
    } else if (query.length === 0) {
      dispatch(productPagination({ token: user?.refreshToken, page: 1 }));
    }
  }, [query]);
  function handleQuery(e) {
    if (e.key === "Enter" || e.type === "click") {
      navigate("/store");
      dispatch(searchProduct({ token: user?.refreshToken, search: query }));
    }
  }
  function handleBlur() {
    if (!query.length) {
      setquery("");
      dispatch(productPagination({ token: user?.refreshToken, page: 1 }));
    }
  }

  return (
    <React.Fragment>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline
                <a className="text-white" href="tel:+233 244109010">
                  +233 244109010
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <h3>
                <Link className="text-white">Online Store</Link>
              </h3>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                  onBlur={handleBlur}
                  className="form-control"
                  placeholder="Search Products Here"
                  aria-label="Search Products Here"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch onClick={handleQuery} />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "assets/images/compare.svg"}
                      alt="..."
                    />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL + "assets/images/wishlist.svg"
                      }
                      alt="..."
                    />
                    <p className="mb-0">
                      Favorite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={user ? "/profile" : "/login"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "assets/images/user.svg"}
                      alt="..."
                    />
                    <p className="mb-0">
                      {user ? user.firstname : "Login"} <br /> My Account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "assets/images/cart.svg"}
                      alt="..."
                    />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cart &&
                          cart.product &&
                          cart.product.length > 0 &&
                          cart.product.reduce((acc, val) => {
                            return acc + val.quantity;
                          }, 0)}
                      </span>
                      <p className="mb-0">&#36;{cart?.cartTotal}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div>
                  <div className="btn-group">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle bg-transparent border-0 d-flex gap-10 align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="icon"
                        src="/assets/images/menu.svg"
                        alt="..."
                      />
                      <span className="me-5 d-inline-block">
                        Shop Cartegories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      style={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <Link
                        role="listitem"
                        className="dropdown-item text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            getProducts({
                              token: user.refreshToken,
                            })
                          );
                        }}
                      >
                        All Items
                      </Link>
                      {categories &&
                        categories.length > 0 &&
                        categories
                          .slice()
                          .sort((a, b) =>
                            a.description.toLowerCase() >
                            b.description.toLowerCase()
                              ? 1
                              : -1
                          )
                          .map((category, index) => (
                            <Link
                              role="listitem"
                              className="dropdown-item text-white"
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(
                                  fetchItemsCartegory({
                                    token: user.refreshToken,
                                    str: category.description,
                                  })
                                );
                              }}
                            >
                              {category.description}
                            </Link>
                          ))}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/order-history">Orders</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
