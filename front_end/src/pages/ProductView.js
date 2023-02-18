import { Rating } from "@smastrom/react-rating";
import Magnifier from "react-magnifier";
import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { BsShare } from "react-icons/bs";
import { SiMaterialdesignicons } from "react-icons/si";
import { TbAward, TbGitCompare, TbDimensions, TbPackage } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";

const ProductView = () => {
  const [orderedProduct, setorderedProduct] = React.useState(false);
  return (
    <React.Fragment>
      <MetaData title="Product Page" />
      <BreadCrumb title="product-view" />
      <Container classProp="main-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <Magnifier
                  className="img_fluid"
                  zoomFactor={1}
                  width="100%"
                  height="100%"
                  src={
                    "https://www.freshnessmag.com/.image/c_fit%2Ccs_" +
                    "srgb%2Cq_auto:good%2Cw_620/MTM1OTc1NzE5MDUxMzY4OT" +
                    "I2/beats-by-dr-dre---studio-headphones---limited-" +
                    "edition-holiday-2011-colors---2.png"
                  }
                />
              </div>
              <div className="other-product-images d-flex flex-wrap mt-2 gap-15">
                <div>
                  <img
                    className="img-fluid w-30"
                    src="assets/images/headphone3.jpg"
                    alt="..."
                  />
                </div>
                <div>
                  <img
                    className="img-fluid w-30"
                    src="assets/images/headphone4.jpg"
                    alt="..."
                  />
                </div>
                <div>
                  <img
                    className="img-fluid w-30"
                    src="assets/images/wirelesspod-01.jpg"
                    alt="..."
                  />
                </div>
                <div>
                  <img
                    className="img-fluid w-30"
                    src="assets/images/wirelesspod-02.jpg"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details mb-2">
              <div className="border-bottom">
                <h3 className="title">Beats by Dre Pro wireless headset</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">&#36;200</p>
                <div className="d-flex align-items-center gap-10">
                  <Rating style={{ maxWidth: 65 }} value={3} />
                  <p className="mb-0">(2 Reviews)</p>
                </div>
                <a href="#review">Write a review</a>
              </div>
              <div className="border-bottom">
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Type:</h4>
                  <p className="product-data">Headphones</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Brand:</h4>
                  <p className="product-data">Beats by Dre</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Cartegory:</h4>
                  <p className="product-data">Accessory gagdet</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Tags:</h4>
                  <p className="product-data">Entertainment</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Size:</h4>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge text-bg-dark">S</span>
                    <span className="badge text-bg-dark">M</span>
                    <span className="badge text-bg-dark">L</span>
                    <span className="badge text-bg-dark">XL</span>
                  </div>
                </div>
                <div className="d-flex my-2 gap-10 align-items-center my-3">
                  <h4 className="product-head">Color:</h4>
                  <Color />
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">SKU:</h4>
                  <p className="product-data">VVR093SW</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Avialability:</h4>
                  <p className="product-data">In-stock</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Origin:</h4>
                  <p className="product-data">USA</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-15">
                  <h4 className="product-head">Quantity:</h4>
                  <div>
                    <input
                      type="number"
                      name="count"
                      min={1}
                      max={11}
                      className="form-control w-10"
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center gap-10">
                    <button
                      className="button-sm border-0 form-control text-nowrap"
                      type="button"
                    >
                      Add to Cart
                    </button>
                    <button
                      className="button-sm border-0 form-control"
                      type="button"
                    >
                      But it Now
                    </button>
                  </div>
                </div>
                <div className="d-flex align-content-center gap-15 mt-4">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 ma-2" />
                      Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <TbAward className="fs-5 ma-2" />
                      Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="my-4">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button collapsed py-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <MdOutlineLocalShipping className="fs-5 ma-2" />
                          &nbsp;&nbsp;Shipping and Returns
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Earum consectetur maiores vitae dolorum saepe
                          facere unde?
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed py-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <SiMaterialdesignicons className="fs-5 ma-2" />
                          &nbsp;&nbsp;Material
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Porro, quae commodi. Provident aut maxime illo
                          ab?
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed py-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <TbDimensions className="fs-5 ma-2" />
                          &nbsp;&nbsp;Dimensions
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Repellendus necessitatibus id quos aliquid minus
                          commodi dicta?
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingfour">
                        <button
                          className="accordion-button collapsed py-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <TbPackage className="fs-5 ma-2" />
                          &nbsp;&nbsp;Care instructions
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Nulla praesentium, quos enim eos quo reiciendis!
                          Incidunt?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-3 bg-body-secondary d-inline-block">
                  <a href="#">
                    <BsShare className="fs-5 ma-2 text-dark" />
                    &nbsp;&nbsp;Share
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </Container>
      <Container classProp="description-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="bg-white p-3">
            <div className="col-12">
              <h4>Description</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis sint eum ratione mollitia quod, distinctio ut
                deserunt error quia iste animi, itaque molestias fuga corrupti
                commodi ab quo excepturi saepe et odit quas. Est vero autem
                suscipit necessitatibus culpa aliquid maiores eos assumenda
                reprehenderit veritatis. Deserunt molestiae animi rem nostrum
                illum! Fuga aut quaerat voluptas ea sequi perspiciatis omnis
                excepturi esse nihil eveniet, porro nulla, ipsa, veniam fugiat
                aliquid nobis libero adipisci mollitia ipsam tenetur. Officiis
                tempore deserunt cumque nam ipsum, dolore fuga unde possimus
                molestias optio aperiam voluptatem. Cumque amet sit vitae. Sed
                totam a nisi. Blanditiis, repudiandae neque.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container classProp="reviews-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="review-inner-wrapper">
              <h3 id="review">Reviews</h3>
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex gap-10 align-items-center">
                    <Rating style={{ maxWidth: 90 }} value={3} />
                    <p className="mb-0">Based on two reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline">
                      Write a review
                    </a>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="review-form py-4">
                    <h6>Write a review</h6>
                    <form className="d-flex flex-column gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          placeholder="Review title"
                        />
                      </div>
                      <div>
                        <Rating style={{ maxWidth: 90 }} value={3} />
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Write you comments here"
                        id=""
                        cols="30"
                        rows="5"
                      ></textarea>
                      <div className="d-flex justify-content-end">
                        <button className="button border-0" type="submit">
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-9">
                  <div className="reviews py-4">
                    <div className="review">
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="mb-0">Nana Yaw</h6>
                        <Rating style={{ maxWidth: 90 }} value={3} />
                      </div>
                      <p className="mt-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Quam quidem impedit ab inventore, numquam
                        asperiores.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container classProp="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">You may also like</h4>
            </div>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ProductView;
