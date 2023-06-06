import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import {
  deleteCompareItem,
  getCompareProducts,
} from "../features/auth/authSlice";

const CompareProduct = () => {
  const dispatch = useDispatch();
  const { user, compareProducts = [] } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getCompareProducts({ token: user?.refreshToken }));
  }, [dispatch]);
  return (
    <React.Fragment>
      <MetaData title="Compare Product" />
      <BreadCrumb title="Compare-product" />
      <Container classProp="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            {compareProducts &&
              compareProducts.length > 0 &&
              compareProducts.map((item, index) => (
                <div
                  key={index}
                  className="compare-product-card position-relative"
                >
                  <img
                    className="position-absolute cross img-fluid"
                    src="assets/images/cross.svg"
                    alt="..."
                    onClick={() => {
                      dispatch(
                        deleteCompareItem({
                          token: user.refreshToken,
                          id: item.id,
                        })
                      );
                      setTimeout(
                        () =>
                          dispatch(
                            getCompareProducts({ token: user.refreshToken })
                          ),
                        305
                      );
                    }}
                  />
                  <div className="product-card-image">
                    <Link to={`/store/product-view/${item.id}`}>
                      <img className="img-fluid" src={item.image} alt="..." />
                    </Link>
                  </div>
                  <div className="compare-product-details">
                    <h5 className="title">{item.title}</h5>
                    <h6 className="price mb-3 mt-2">&#36;{item.price}</h6>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>{item.brand}</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Product</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>{item.isInstock}</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color color={item.color} />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>5</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default CompareProduct;
