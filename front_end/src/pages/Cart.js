import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartItemQuan,
  getCart,
  increaseCartItemQuan,
  removeCartItem,
} from "../features/auth/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state.auth) ?? {};
  React.useEffect(() => {
    dispatch(getCart(user?.refreshToken));
  }, [dispatch]);
  const handleCartRemoval = (token, id) => {
    dispatch(removeCartItem({ token, id }));
    setTimeout(() => dispatch(getCart(user.refreshToken)), 150);
  };
  const handleQuantityChange = (e, productId, currentQuantity) => {
    const newInput = parseInt(e.target.value, 10);
    const action =
      currentQuantity > newInput
        ? "decrease"
        : currentQuantity < newInput
        ? "increase"
        : undefined;
    if (action === "decrease") {
      const diff = currentQuantity - newInput;
      dispatch(
        decreaseCartItemQuan({
          token: user.refreshToken,
          data: { value: diff, product: productId },
        })
      );
    } else if (action === "increase") {
      const diff = newInput - currentQuantity;
      dispatch(
        increaseCartItemQuan({
          token: user.refreshToken,
          data: { value: diff, product: productId },
        })
      );
    }
    setTimeout(() => dispatch(getCart(user.refreshToken)), 150);
  };
  return (
    <React.Fragment>
      <MetaData title="Cart" />
      <BreadCrumb title="cart" />
      <Container classProp="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex align-items-center justify-content-between py-3">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Sub Total</h4>
            </div>
            {cart &&
              cart.product &&
              cart.product.length > 0 &&
              cart.product.map((item, index) => (
                <div
                  key={index}
                  className="cart-data d-flex align-items-center justify-content-between py-3"
                >
                  <div className="cart-col-1 d-flex align-items-center gap-15">
                    <div className="w-25">
                      {item?.product?.images?.[0] && (
                        <img
                          src={item?.product?.images[0].image}
                          alt="..."
                          className="img-fluid"
                        />
                      )}
                    </div>
                    <div className="w-75">
                      <h5 className="title mb-1">{item?.product?.title}</h5>
                      <p className="color mb-0">{item?.color}</p>
                      <p className="size">{item?.product?.slug}</p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">&#36;&nbsp;{item?.product?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        type="number"
                        className="form-control w-10"
                        min={1}
                        max={11}
                        value={item.quantity}
                        onInput={(e) =>
                          handleQuantityChange(
                            e,
                            item.product._id,
                            item.quantity
                          )
                        }
                      />
                    </div>
                    <div>
                      <RiDeleteBinLine
                        onClick={() =>
                          dispatch(
                            handleCartRemoval(
                              user.refreshToken,
                              item.product._id
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="total">
                      &#36;&nbsp;{item?.product?.price * item?.quantity}
                    </h5>
                  </div>
                </div>
              ))}
            <div className="col-12 py-2 mt-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/store" className="button">
                  Continue Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4 className="total">
                    Total:&nbsp;&#36;&nbsp;{cart?.cartTotal}
                  </h4>
                  <p>Taxes and shipping are calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Cart;
