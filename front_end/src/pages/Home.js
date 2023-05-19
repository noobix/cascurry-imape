import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../features/blogs/blogslice";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import Container from "../components/Container";
import { addProductToCart, logoutUser } from "../features/auth/authSlice";
import { getProducts } from "../features/items/itemSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs = [] } = useSelector((state) => state.blog) ?? {};
  const { product = [] } = useSelector((state) => state.item) ?? {};
  const [threndingProducts, setthrendingProducts] = React.useState([]);
  const [specialProducts, setspecialProducts] = React.useState([]);
  const [featuredProducts, setfeaturedProducts] = React.useState([]);
  const [randomCategory, setrandomCategory] = React.useState([]);
  const [rightBannerMain, setrightBannerMain] = React.useState([]);
  const [leftBanner1, setleftBanner1] = React.useState([]);
  const [leftBanner2, setleftBanner2] = React.useState([]);
  const [leftBanner3, setleftBanner3] = React.useState([]);
  const [leftBanner4, setleftBanner4] = React.useState([]);
  React.useEffect(() => {
    const thrending =
      product &&
      product.length &&
      product
        .filter((item) => item.tags.some((tag) => tag.tag === "Thrending"))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    setthrendingProducts(thrending);
  }, [product]);
  React.useEffect(() => {
    const special =
      product &&
      product.length &&
      product
        .filter((item) => item.tags.some((tag) => tag.tag === "Specials"))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    setspecialProducts(special);
  }, [product]);
  React.useEffect(() => {
    const featured =
      product &&
      product.length &&
      product
        .filter((item) => item.tags.some((tag) => tag.tag === "Featured"))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    setfeaturedProducts(featured);
  }, [product]);
  React.useEffect(() => {
    const categoryCounts = {};
    product &&
      product.length &&
      product.forEach((item) => {
        const category = item.category.description;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    const productCategories = Object.keys(categoryCounts)
      .map((category) => ({
        title: category,
        category: category,
        image: product.find((item) => item.category.description === category)
          .images[0].image,
        itemCount: categoryCounts[category],
      }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setrandomCategory(productCategories);
  }, [product]);
  React.useEffect(() => {
    const rightMain =
      product &&
      product.length > 0 &&
      product
        .filter(
          (item) =>
            item.category.description === "Wearable Technologies" &&
            item.slug.includes("ear")
        )
        .slice(0, 1);
    setrightBannerMain(rightMain);
  }, [product]);
  React.useEffect(() => {
    const firstleft =
      product &&
      product.length > 0 &&
      product
        .filter(
          (item) =>
            item.category.description === "Laptop PC" &&
            item.slug.includes("computer")
        )
        .slice(0, 1);
    setleftBanner1(firstleft);
  }, [product]);
  React.useEffect(() => {
    const secondleft =
      product &&
      product.length > 0 &&
      product
        .filter(
          (item) =>
            item.category.description === "Wearable Technologies" &&
            item.slug.includes("watch")
        )
        .slice(0, 1);
    setleftBanner2(secondleft);
  }, [product]);
  React.useEffect(() => {
    const thirdleft =
      product &&
      product.length > 0 &&
      product
        .filter(
          (item) =>
            item.category.description === "Communication and GPS" &&
            item.slug.includes("tablet")
        )
        .slice(0, 1);
    setleftBanner3(thirdleft);
  }, [product]);
  React.useEffect(() => {
    const fouthleft =
      product &&
      product.length > 0 &&
      product
        .filter(
          (item) =>
            item.category.description === "Wearable Technologies" &&
            item.slug.includes("head")
        )
        .slice(0, 1);
    setleftBanner4(fouthleft);
  }, [product]);
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getBlogs());
    dispatch(getProducts(user?.refreshToken));
  }, [dispatch]);
  async function verify() {
    if (user && user.refreshToken) {
      const { refreshToken } = user;
      const { exp } = await jwt_decode(refreshToken);
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        localStorage.removeItem("user");
        dispatch(logoutUser());
        return false;
      } else return true;
    } else return false;
  }
  React.useEffect(() => {
    if (!user || verify() === false) {
      navigate("/login");
    }
  }, []);
  return (
    <React.Fragment>
      <Container classProp="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                className="img-fluid rounded-3"
                src={
                  process.env.PUBLIC_URL + "/assets/images/main-banner-1.jpg"
                }
                alt="..."
              />
              <div className="main-banner-content position-absolute">
                {rightBannerMain &&
                  rightBannerMain.map((unit, index) => (
                    <React.Fragment key={index}>
                      <h4>RECOMMENDED FOR EAZE</h4>
                      <h5>{unit.title.replace(" WF-1000XM4 Wireless", "")}</h5>
                      <p>From &#36;{unit.price} OR &#36;41.62/month</p>
                      <Link
                        to="/cart"
                        onClick={() =>
                          dispatch(
                            addProductToCart({
                              token: user.refreshToken,
                              data: {
                                _id: unit?._id,
                                quantity: 1,
                                color: unit?.color?.name,
                              },
                            })
                          )
                        }
                        className="button"
                      >
                        BUY NOW
                      </Link>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/catbanner-01.jpg"
                  }
                  alt="..."
                />
                <div className="small-banner-content position-absolute">
                  {leftBanner1 &&
                    leftBanner1.map((unit, index) => (
                      <React.Fragment key={index}>
                        <h4>NEW LAPTOP PRICED LIKE OLD</h4>
                        <h5>{unit.title.substring(0, 17)}</h5>
                        <p>
                          From &#36;{unit.price} <br />
                          OR &#36;41.62/month
                        </p>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/catbanner-02.jpg"
                  }
                  alt="..."
                />
                <div className="small-banner-content position-absolute">
                  {leftBanner2 &&
                    leftBanner2.map((unit, index) => (
                      <React.Fragment key={index}>
                        <h4>Best Sale</h4>
                        <h5>{unit.title}</h5>
                        <p>
                          From &#36;{unit.price} <br />
                          OR &#36;41.62/month
                        </p>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/catbanner-03.jpg"
                  }
                  alt="..."
                />
                <div className="small-banner-content position-absolute">
                  {leftBanner3 &&
                    leftBanner3.map((unit, index) => (
                      <React.Fragment key={index}>
                        <h4>By iPad Air</h4>
                        <h5>{unit.title.substring(0, 21)}</h5>
                        <p>
                          From &#36;{unit.price} <br />
                          OR &#36;41.62/month
                        </p>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/catbanner-04.jpg"
                  }
                  alt="..."
                />
                <div className="small-banner-content position-absolute">
                  {leftBanner4 &&
                    leftBanner4.map((unit, index) => (
                      <React.Fragment key={index}>
                        <h4>EXTREME SOUND NO LIMITS</h4>
                        <h5>{unit.title}</h5>
                        <p>
                          From &#36;{unit.price} <br />
                          OR &#36;41.62/month
                        </p>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container classProp="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-10">
                <img
                  src={process.env.PUBLIC_URL + "assets/images/service.png"}
                  alt="..."
                />
                <div>
                  <h6>Free Shipping</h6>
                  <p className="mb-0">For all orders above &#36;20</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10">
                <img
                  src={process.env.PUBLIC_URL + "assets/images/service-02.png"}
                  alt="..."
                />
                <div>
                  <h6>Daily Suprise Offers</h6>
                  <p className="mb-0">Save up to 25&#37;</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10">
                <img
                  src={process.env.PUBLIC_URL + "assets/images/service-03.png"}
                  alt="..."
                />
                <div>
                  <h6>24/7 Custmer Support</h6>
                  <p className="mb-0">Shop with an expert</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10">
                <img
                  src={process.env.PUBLIC_URL + "assets/images/service-04.png"}
                  alt="..."
                />
                <div>
                  <h6>Affordable Prices</h6>
                  <p className="mb-0">Shop at wholesale price</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10">
                <img
                  src={process.env.PUBLIC_URL + "assets/images/service-05.png"}
                  alt="..."
                />
                <div>
                  <h6>Secure Payment</h6>
                  <p className="mb-0">Verified protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container classProp="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cartegories d-flex flex-wrap align-items-center justify-content-between">
              {randomCategory &&
                randomCategory.map((item, index) => (
                  <div key={index} className="d-flex align-items-center gap-30">
                    <div>
                      <h6>{item.category}</h6>
                      <p>{item.itemCount}&nbsp;items</p>
                    </div>
                    <img
                      className="img-fluid"
                      style={{ width: "85px" }}
                      src={item.image}
                      alt="..."
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
      <Container classProp="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 className="section-heading">Featured Collection</h4>
          </div>
          <ProductCard data={featuredProducts} />
        </div>
      </Container>
      <Container classProp="famous-wrapper pb-5 home-wrapper-2">
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
      </Container>
      <Container classProp="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 className="section-heading">Special Products</h4>
          </div>
        </div>
        <div className="row">
          <SpecialProducts data={specialProducts} />
        </div>
      </Container>
      <Container classProp="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 className="section-heading">Trending Products</h4>
          </div>
        </div>
        <div className="row">
          <ProductCard data={threndingProducts} />
        </div>
      </Container>
      <Container classProp="marquee-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-01.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-02.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-03.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-04.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-05.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-06.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-07.png"}
                    alt="..."
                  />
                </div>
                <div className="mx-5 w-25">
                  <img
                    src={process.env.PUBLIC_URL + "assets/images/brand-08.png"}
                    alt="..."
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container classProp="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 className="section-heading">Our Latest Blogs</h4>
          </div>
          <div className="row">
            <div className="col-3">
              {blogs &&
                blogs.length > 0 &&
                blogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    id={blog._id}
                    title={blog.title}
                    category={blog.category.name}
                    images={blog.images}
                    author={blog.author}
                    date={blog.createdAt}
                    description={blog.description}
                  />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Home;
