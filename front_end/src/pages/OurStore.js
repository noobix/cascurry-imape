import { Rating } from "@smastrom/react-rating";
import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import ProductCard from "../components/ProductCard";

const OurStore = () => {
  const [grid, setGrid] = React.useState(4);
  return (
    <React.Fragment>
      <MetaData title="Our Store" />
      <BreadCrumb title="our-store" />
      <Container classProp="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Cartegories</h3>
              <div>
                <ul className="ps-0">
                  <li>Mobile Phones</li>
                  <li>Laptops</li>
                  <li>Televisions</li>
                  <li>Camera</li>
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name=""
                        id=""
                        value="checkedValue"
                      />
                      In-stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name=""
                        id=""
                        value="checkedValue"
                      />
                      Out of stock (0)
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="from"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="to"
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <div>
                    <Color />
                  </div>
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name=""
                        id=""
                        value="checkedValue"
                      />
                      S(2)
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name=""
                        id=""
                        value="checkedValue"
                      />
                      M(2)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex align-align-items-center flex-wrap gap-10">
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Headphone
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Television
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Mobile Phone
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Wire
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Products</h3>
              <div className="random-products d-flex mb-3">
                <div className="w-35">
                  <img
                    src="assets/images/watch.jpg"
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="w-65">
                  <h5>Kids watchs variety of colors suitable for students</h5>
                  <Rating style={{ maxWidth: 60 }} value={3} />
                  <p>&#36;400</p>
                </div>
              </div>
              <div className="random-products d-flex">
                <div className="w-35">
                  <img
                    src="assets/images/watch.jpg"
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="w-65">
                  <h5>Kids watchs variety of colors suitable for students</h5>
                  <Rating style={{ maxWidth: 90 }} value={3} />
                  <p>&#36;400</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 w-100">Sort By</p>
                  <select className="form-control form-select" name="" id="">
                    <option value="manual">Featured</option>
                    <option value="best-selling" default>
                      Best Selling
                    </option>
                    <option value="title-ascending">Alphabetically A-Z</option>
                    <option value="title-desending">Alphabetically Z-A</option>
                    <option value="price-ascending">Price from Low-High</option>
                    <option value="price-descending">
                      Price from Low-High
                    </option>
                    <option value="created ascending">Date from Old-New</option>
                    <option value="created descending">
                      Date from New-Old
                    </option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">22 Products</p>
                  <div className="d-flex align-items-center gap-10 grid">
                    <img
                      src="assets/images/gr4.svg"
                      onClick={() => setGrid(3)}
                      className="d-block img-fluid"
                      alt="..."
                    />
                    <img
                      src="assets/images/gr3.svg"
                      onClick={() => setGrid(4)}
                      className="d-block img-fluid"
                      alt="..."
                    />
                    <img
                      src="assets/images/gr2.svg"
                      onClick={() => setGrid(6)}
                      className="d-block img-fluid"
                      alt="..."
                    />
                    <img
                      src="assets/images/gr.svg"
                      onClick={() => setGrid(12)}
                      className="d-block img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-list pb-5">
              <div className="d-flex flex-wrap gap-10">
                <ProductCard grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default OurStore;
