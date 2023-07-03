import { Rating } from "@smastrom/react-rating";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import ProductCard from "../components/ProductCard";
import {
  fetchItemsCartegory,
  getproductsPaginated,
  productPagination,
  searchProductByColor,
} from "../features/items/itemSlice";

const OurStore = () => {
  const [grid, setGrid] = React.useState(4);
  const [showOutOfStock, setshowOutOfStock] = React.useState(true);
  const [showInStock, setshowInStock] = React.useState(true);
  const [inStockCount, setinStockCount] = React.useState([]);
  const [outOfstockCount, setoutOfStockCount] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState([]);
  const [price, setPrice] = React.useState({ from: "", to: "" });
  const [filteredbyPrice, setfilteredByPrice] = React.useState([]);
  const [productcolors, setproductcolors] = React.useState([]);
  const [productTags, setproductTags] = React.useState([]);
  const [randomProduct, setrandomProduct] = React.useState([]);
  const [sortProductBy, setsortProductBy] = React.useState([]);
  const [currentSort, setcurrentSort] = React.useState("Not-Sorted");
  const dispatch = useDispatch();
  const { product = [], pagination } = useSelector((state) => state.item) ?? {};
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(productPagination({ token: user?.refreshToken, page: 1 }));
  }, [dispatch]);
  React.useEffect(() => {
    const data =
      product &&
      product.length > 0 &&
      product.map((item) => item.category.description);
    if (data) setCurrentCategory([...new Set(data)]);
  }, [product]);
  React.useEffect(() => {
    const outOfStock = showOutOfStock
      ? product &&
        product.length > 0 &&
        product.filter((item) => item.quantity === 0)
      : [];
    setoutOfStockCount(outOfStock);
  }, [showOutOfStock]);
  React.useEffect(() => {
    const inStock = showInStock
      ? product &&
        product.length > 0 &&
        product.filter((item) => item.quantity >= 1)
      : [];
    setinStockCount(inStock);
  }, [showInStock]);
  React.useEffect(() => {
    const priceFilter =
      product &&
      product.length > 0 &&
      product.filter(
        (item) => item.price >= price.from && item.price <= price.to
      );
    setfilteredByPrice(priceFilter);
  }, [price]);
  React.useEffect(() => {
    const colors =
      product && product.length > 0 && product.map((item) => item.color.color);
    if (colors) setproductcolors([...new Set(colors)]);
  }, [product]);
  React.useEffect(() => {
    const tags =
      product &&
      product.length > 0 &&
      product.map((item) => item.tags.map((tag) => tag.tag));
    if (tags) setproductTags([...new Set(tags.flat())]);
  }, [product]);
  React.useEffect(() => {
    const random =
      product &&
      product.length > 0 &&
      product
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(({ title, price, totalRatings, images }) => {
          return { title, price, totalRatings, images };
        });
    setrandomProduct(random);
  }, [product]);
  React.useEffect(() => {
    dispatch(
      getproductsPaginated({
        token: user?.refreshToken,
        page: pagination.currentPage,
        limit: pagination.itemCount,
        skip: pagination.startIndex,
      })
    );
  }, [pagination]);
  const handleSelect = (e) => {
    switch (e.target.value) {
      case "not-sorted":
        setsortProductBy(product);
        setcurrentSort("Not-Sorted");
        break;
      case "best-selling":
        const bestSales = product.slice().sort((a, b) => b.sold - a.sold);
        setsortProductBy(bestSales);
        setcurrentSort("best-selling");
        break;
      case "title-ascending":
        const titleAsc = product
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));
        setcurrentSort("title-ascending");
        setsortProductBy(titleAsc);
        break;
      case "title-desending":
        const titleDesc = product
          .slice()
          .sort((a, b) => b.title.localeCompare(a.title));
        setcurrentSort("title-desending");
        setsortProductBy(titleDesc);
        break;
      case "price-ascending":
        const priceAsc = product
          .slice()
          .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setsortProductBy(priceAsc);
        setcurrentSort("price-ascending");
        break;
      case "price-descending":
        const priceDesc = product
          .slice()
          .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setsortProductBy(priceDesc);
        setcurrentSort("price-descending");
        break;
      case "created ascending":
        const productNewOld = product
          .slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setsortProductBy(productNewOld);
        setcurrentSort("created ascending");
        break;
      case "created descending":
        const productOldNew = product
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setsortProductBy(productOldNew);
        setcurrentSort("created descending");
        break;
      default:
        console.log("Unknown choice");
    }
  };
  return (
    <React.Fragment>
      <MetaData title="Our Store" />
      <BreadCrumb title="Our-store" />
      <Container classProp="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Current Items Categories</h3>
              <div>
                <ul className="ps-0">
                  <li
                    onClick={() =>
                      dispatch(
                        getproductsPaginated({
                          token: user?.refreshToken,
                          page: pagination.currentPage,
                          limit: pagination.itemCount,
                          skip: pagination.startIndex,
                        })
                      )
                    }
                  >
                    All Current Page Categories
                    <span style={{ color: "#200f0a" }}>
                      ({currentCategory.length})
                    </span>
                  </li>
                  {currentCategory &&
                    currentCategory.length > 0 &&
                    currentCategory.map((category, index) => (
                      <li
                        onClick={() =>
                          dispatch(
                            fetchItemsCartegory({
                              token: user?.refreshToken,
                              str: category,
                            })
                          )
                        }
                        key={index}
                      >
                        {category}
                      </li>
                    ))}
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
                        checked={showInStock}
                        name="showInStock"
                        id="inStock"
                        value="checkedValue"
                        onChange={(e) => setshowInStock(e.target.checked)}
                      />
                      In-stock ({inStockCount.length})
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={showOutOfStock}
                        name="showOutOfStock"
                        id="outOfstock"
                        value="checkedValue"
                        onChange={(e) => setshowOutOfStock(e.target.checked)}
                      />
                      Out of stock ({outOfstockCount.length})
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
                      value={price.from}
                      onChange={(e) =>
                        setPrice({ ...price, from: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="to"
                      value={price.to}
                      onChange={(e) =>
                        setPrice({ ...price, to: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <div className="d-flex flex-wrap gap-1">
                    {productcolors &&
                      productcolors.length > 0 &&
                      productcolors.map((item, index) => (
                        <Color
                          onClick={() =>
                            dispatch(
                              searchProductByColor({
                                token: user?.refreshToken,
                                search: item,
                              })
                            )
                          }
                          key={index}
                          color={item}
                        />
                      ))}
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
              <div className="product-tags d-flex align-align-items-center flex-wrap gap-10">
                {productTags &&
                  productTags.length > 0 &&
                  productTags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Products</h3>
              {randomProduct &&
                randomProduct.length > 0 &&
                randomProduct.map((item, index) => (
                  <div key={index} className="random-products d-flex mb-3">
                    <div className="w-35">
                      {item.images &&
                        item.images
                          .slice(0, 1)
                          .map((image, index) => (
                            <img
                              key={index}
                              src={image.image}
                              className="img-fluid"
                              alt="..."
                              width={80}
                            />
                          ))}
                    </div>
                    <div className="w-65">
                      <h5>{item.title}</h5>
                      <Rating
                        style={{ maxWidth: 60 }}
                        value={item.totalRatings}
                      />
                      <p>&#36;{item.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 text-nowrap">Sort By</p>
                  <select
                    className="form-control form-select w-100"
                    name="sort"
                    value={currentSort}
                    onClick={handleSelect}
                  >
                    <option defaultValue value="not-sorted">
                      Not Sorted
                    </option>
                    <option value="best-selling" default>
                      Best Selling
                    </option>
                    <option value="title-ascending">Alphabetically A-Z</option>
                    <option value="title-desending">Alphabetically Z-A</option>
                    <option value="price-ascending">Price from Low-High</option>
                    <option value="price-descending">
                      Price from High-Low
                    </option>
                    <option value="created ascending">
                      Items from Old-New
                    </option>
                    <option value="created descending">
                      Items from New-Old
                    </option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">
                    {product &&
                      product.length > 0 &&
                      product.reduce((acc) => acc + 1, 0)}
                    &nbsp; items
                  </p>
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
                <ProductCard
                  grid={grid}
                  data={
                    filteredbyPrice.length
                      ? filteredbyPrice
                      : currentSort === "Not-Sorted"
                      ? product
                      : sortProductBy.length
                      ? sortProductBy
                      : inStockCount.length
                      ? inStockCount
                      : outOfstockCount.length
                      ? outOfstockCount
                      : outOfstockCount.length === 0
                      ? []
                      : product
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="..." className="row justify-content-end">
          <ul className="pagination">
            <li
              className={`page-item ${
                parseInt(pagination.currentPage) === 1 && "disabled"
              }`}
            >
              <a
                role="button"
                className="page-link"
                onClick={() => {
                  setsortProductBy([]);
                  setcurrentSort("not-sorted");
                  dispatch(
                    productPagination({
                      token: user?.refreshToken,
                      page: parseInt(pagination.currentPage) - 1,
                    })
                  );
                  window.scrollTo(0, 0);
                }}
              >
                Previous
              </a>
            </li>
            {pagination.pages &&
              pagination.pages.length > 0 &&
              pagination.pages.map((page, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    parseInt(pagination.currentPage) === page && "active"
                  }`}
                  aria-current="page"
                >
                  <a
                    role="button"
                    className="page-link"
                    onClick={() => {
                      setsortProductBy([]);
                      setcurrentSort("not-sorted");
                      dispatch(
                        productPagination({
                          token: user?.refreshToken,
                          page: page,
                        })
                      );
                      window.scrollTo(0, 0);
                    }}
                  >
                    {page}
                  </a>
                </li>
              ))}
            <li className="page-item">
              <a
                role="button"
                className="page-link"
                onClick={() => {
                  setsortProductBy([]);
                  setcurrentSort("not-sorted");
                  dispatch(
                    productPagination({
                      token: user?.refreshToken,
                      page: parseInt(pagination.currentPage) + 1,
                    })
                  );
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </React.Fragment>
  );
};

export default OurStore;
