import { Rating } from "@smastrom/react-rating";
import Magnifier from "react-magnifier";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useFormik } from "formik";
import { string, object } from "yup";
import { toWords } from "number-to-words";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { useLocation, useNavigate } from "react-router-dom";
import { BsShare } from "react-icons/bs";
import { SiMaterialdesignicons } from "react-icons/si";
import { TbAward, TbGitCompare, TbDimensions, TbPackage } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import {
  getProduct,
  getproductReviews,
  postReview,
} from "../features/items/itemSlice";
import { addProductToCart, getCart } from "../features/auth/authSlice";

const ProductView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart, orders } = useSelector((state) => state.auth);
  const { product, reviews, isError } =
    useSelector((state) => state.item) ?? {};
  const extractId = location.pathname.split("/")[3];
  const [rating, setrating] = React.useState(0);
  const [quantity, setquantity] = React.useState(1);
  const [isCart, setisCart] = React.useState(false);
  const [orderedProduct, setorderedProduct] = React.useState(false);
  React.useEffect(() => {
    dispatch(getProduct({ token: user?.refreshToken, id: extractId }));
    dispatch(getCart({ token: user?.refreshToken }));
    dispatch(
      getproductReviews({ token: user?.refreshToken, product: extractId })
    );
    isInCart();
  }, [extractId]);
  React.useEffect(() => {
    const isOrdered = orders.filter((order) =>
      order.product.find((item) => item.product._id === extractId)
    );
    if (isOrdered.length) setorderedProduct(true);
  }, [orders]);
  const isInCart = () => {
    const product =
      cart &&
      cart.product &&
      cart.product.length > 0 &&
      cart.product.filter((item) => item.product._id === extractId);
    if (product?.length) {
      setisCart(true);
      setquantity(cart.product.quantity);
    }
  };
  let reviewSchema = object({
    name: string().required(),
    email: string().required(),
    star: string().required(),
    comment: string(),
  });
  const formik = useFormik({
    initialValues: {
      name: user?.firstname + " " + user?.lastname,
      email: user?.email,
      star: rating,
      comment: "",
    },
    validationSchema: reviewSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      values = {
        data: { ...values, item: extractId },
        token: user?.refreshToken,
      };
      dispatch(postReview(values));
      !isError && formik.resetForm();
    },
  });
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <React.Fragment>
      <MetaData title="Product Page" />
      <BreadCrumb title="Product-view" />
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
                  src={product.images && product?.images[0]?.image}
                />
              </div>
              <div className="other-product-images d-flex flex-wrap mt-2 gap-15">
                {product.images &&
                  product.images
                    .slice(1)
                    .map((image, index) => (
                      <img
                        key={index}
                        className="img-fluid w-25 ms-3"
                        src={image.image}
                        alt="..."
                      />
                    ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details mb-2">
              <div className="border-bottom">
                <h3 className="title">{product?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">&#36;&nbsp;{product.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <Rating
                    style={{ maxWidth: 65 }}
                    value={product.totalRatings}
                  />
                  <p className="mb-0">
                    ({reviews.ratings && reviews.ratings.length} Review
                    {reviews.ratings && reviews.ratings.length > 1 && "s"})
                  </p>
                </div>
                <a href="#review">Write a review</a>
              </div>
              <div className="border-bottom">
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Type:</h4>
                  <p className="product-data">{product?.slug}</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Brand:</h4>
                  <p className="product-data">{product?.brand?.name}</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Cartegory:</h4>
                  <p className="product-data">{product?.category?.name}</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Tags:</h4>
                  <p className="product-data">
                    {product.tags?.map((tag) => tag.tag)}
                  </p>
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
                  <Color color={product?.color?.color} />
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">SKU:</h4>
                  <p className="product-data">VVR093SW</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Avialability:</h4>
                  <p className="product-data">
                    {product.quantity > 0 ? "In-stock" : "Sold-out"}
                  </p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Origin:</h4>
                  <p className="product-data">{product?.brand?.madeIn}</p>
                </div>
                <div className="d-flex align-items-center my-3 gap-10">
                  <h4 className="product-head">Quantity:</h4>
                  <div>
                    <input
                      type="number"
                      name="count"
                      onChange={(e) => setquantity(e.target.value)}
                      value={quantity}
                      min={1}
                      max={11}
                      disabled={isCart}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center gap-10">
                    <button
                      className="button-sm border-0 form-control text-nowrap"
                      type="button"
                      onClick={
                        isCart
                          ? () => navigate("/cart")
                          : () =>
                              dispatch(
                                addProductToCart({
                                  token: user.refreshToken,
                                  data: {
                                    _id: product?._id,
                                    quantity: quantity,
                                    color: product?.color?.name,
                                  },
                                })
                              )
                      }
                    >
                      {isCart ? "View In Cart" : "Add to Cart"}
                    </button>
                    {!isCart && (
                      <button
                        className="button-sm border-0 form-control"
                        role="a"
                        onClick={() => {
                          dispatch(
                            addProductToCart({
                              token: user.refreshToken,
                              data: {
                                _id: product?._id,
                                quantity: quantity,
                                color: product?.color?.name,
                              },
                            })
                          );
                          navigate("/cart");
                        }}
                      >
                        But it Now
                      </button>
                    )}
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
                  <a
                    href="javascript:void(0);"
                    onClick={() => copyToClipboard(window.location.href)}
                  >
                    <BsShare className="fs-5 ma-2 text-dark" />
                    &nbsp;&nbsp;Share
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </Container>
      <Container classProp="description-wrapper home-wrapper-2 py-1">
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
      <Container classProp="reviews-wrapper py-1 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="review-inner-wrapper">
              <h3 id="review">Reviews</h3>
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex gap-10 align-items-center">
                    <Rating
                      style={{ maxWidth: 90 }}
                      value={reviews.totalRatings}
                    />
                    <p className="mb-0">
                      Based on{" "}
                      {reviews.ratings && toWords(reviews.ratings.length)}{" "}
                      review
                      {reviews.ratings && reviews.ratings.length > 1 && "s"}
                    </p>
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
                    <form
                      onSubmit={formik.handleSubmit}
                      className="d-flex flex-column gap-15"
                      style={{
                        visibility: `${!orderedProduct ? "hidden" : "visible"}`,
                      }}
                    >
                      <h6>Write a review</h6>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          name="name"
                          placeholder="Full name"
                          onChange={formik.handleChange("name")}
                          value={formik.values.name}
                          onBlur={formik.handleChange("name")}
                        />
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="email"
                          disabled
                          name="email"
                          placeholder="Email address"
                          onChange={formik.handleChange("email")}
                          value={formik.values.email}
                          onBlur={formik.handleChange("email")}
                        />
                      </div>
                      <div>
                        <Rating
                          style={{ maxWidth: 120 }}
                          value={rating}
                          onChange={setrating}
                        />
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Write you comments here"
                        id=""
                        cols="30"
                        rows="5"
                        name="comment"
                        onChange={formik.handleChange("comment")}
                        value={formik.values.comment}
                        onBlur={formik.handleChange("comment")}
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
                    {reviews.ratings &&
                      reviews.ratings.length > 0 &&
                      reviews.ratings.map((review, index) => (
                        <div key={index} className="review">
                          <div className="d-flex gap-10 align-items-center">
                            <h6 className="mb-0">
                              {review.postedBy.firstname}{" "}
                              {review.postedBy.lastname}
                            </h6>
                            <Rating
                              style={{ maxWidth: 90 }}
                              value={review.star}
                            />
                          </div>
                          <p className="mt-2">{review.comment}</p>
                        </div>
                      ))}
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
