import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import { userWishlist } from "../features/auth/authSlice";
import { addWishlist } from "../features/auth/authSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wishlist = [] } = useSelector((state) => state.auth) ?? {};
  React.useEffect(() => {
    dispatch(userWishlist());
  }, [dispatch]);
  const removeWishlistItem = (item) => {
    dispatch(
      addWishlist({
        token: user.refreshToken,
        data: { item: item },
      })
    );
    setTimeout(() => dispatch(userWishlist()), 200);
  };
  return (
    <React.Fragment>
      <MetaData title="Wishlist" />
      <BreadCrumb title="wishlist" />
      <Container className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlist &&
            wishlist.length > 0 &&
            wishlist.map((item, index) => (
              <div key={index} className="col-3">
                <div className="wishlist-card position-relative">
                  <img
                    className="position-absolute cross img-fluid"
                    src="assets/images/cross.svg"
                    alt="..."
                    onClick={() => removeWishlistItem(item._id)}
                  />
                  <div className="wishlist-card-image">
                    {item.images.slice(0, 1).map((image, index) => (
                      <img
                        key={index}
                        className="img-fluid"
                        src={image.image}
                        alt="..."
                      />
                    ))}
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">{item.title}</h5>
                    <h6 className="price mb-3 mt-2">&#36;&nbsp;{item.price}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Wishlist;
