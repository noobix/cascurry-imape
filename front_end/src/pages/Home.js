import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";

const Home = () => {
  return (
    <React.Fragment>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="/assets/images/main-banner-1.jpg"
                  alt="..."
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PRO'S</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From &#36;999.00 OR &#36;41.62/month</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="/assets/images/catbanner-01.jpg"
                    alt="..."
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PRO'S</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>
                      From &#36;999.00 <br />
                      OR &#36;41.62/month
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="/assets/images/catbanner-02.jpg"
                    alt="..."
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sale</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>
                      From &#36;999.00 <br />
                      OR &#36;41.62/month
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="/assets/images/catbanner-03.jpg"
                    alt="..."
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>By iPad Air</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>
                      From &#36;999.00 <br />
                      OR &#36;41.62/month
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="/assets/images/catbanner-04.jpg"
                    alt="..."
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PRO'S</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>
                      From &#36;999.00 <br />
                      OR &#36;41.62/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <img src="assets/images/service.png" alt="..." />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">For all orders above &#36;20</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <img src="assets/images/service-02.png" alt="..." />
                  <div>
                    <h6>Daily Suprise Offers</h6>
                    <p className="mb-0">Save up to 25&#37;</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <img src="assets/images/service-03.png" alt="..." />
                  <div>
                    <h6>24/7 Custmer Support</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <img src="assets/images/service-04.png" alt="..." />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Shop at wholesale price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <img src="assets/images/service-05.png" alt="..." />
                  <div>
                    <h6>Secure Payment</h6>
                    <p className="mb-0">Verified protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cartegories d-flex flex-wrap align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/camera.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/tv.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Music</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/headphone.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/camera.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/camera.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/tv.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Music</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/headphone.jpg" alt="..." />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src="/assets/images/camera.jpg" alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">Featured Collection</h4>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
      <section className="famous-wrapper pb-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading py-3">Famous Products</h4>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  className="img-fluid"
                  src="assets/images/laptop-01.jpg"
                  alt="..."
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart watch series 7</h6>
                  <p>&#36;399 or &#36;16.62/mon for 12mons</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="row">
                  <div className="famous-content-0">
                    <h6>62 megapixel camera</h6>
                    <p>&#36;399 or &#36;16.62/mon for 12mons</p>
                  </div>
                </div>
                <img
                  className="img-fluid"
                  src="assets/images/camera-02.png"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="row">
                  <div className="famous-content-0">
                    <h6>Perfect sound, impressive</h6>
                    <p>&#36;399 or &#36;16.62/mon for 12mons</p>
                  </div>
                </div>
                <img
                  className="img-fluid"
                  src="assets/images/speaker-02.png"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="row">
                  <div className="famous-content-0">
                    <h6>Improved battery life</h6>
                    <p>&#36;399 or &#36;16.62/mon for 12mons</p>
                  </div>
                </div>
                <img
                  className="img-fluid"
                  src="assets/images/drone-01.png"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">Special Products</h4>
            </div>
          </div>
          <div className="row">
            <SpecialProducts />
            <SpecialProducts />
            <SpecialProducts />
            <SpecialProducts />
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">Trending Products</h4>
            </div>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
      <section className="marquee-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-01.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-02.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-03.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-04.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-05.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-06.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-07.png" alt="..." />
                  </div>
                  <div className="mx-5 w-25">
                    <img src="assets/images/brand-08.png" alt="..." />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">Our Latest Blogs</h4>
            </div>
            <div className="row">
              <div className="col-3">
                <BlogCard />
              </div>
              <div className="col-3">
                <BlogCard />
              </div>
              <div className="col-3">
                <BlogCard />
              </div>
              <div className="col-3">
                <BlogCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
