import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import Container from "../components/Container";
import { getUserOrders } from "../features/auth/authSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders = [], user } = useSelector((state) => state.auth) ?? {};
  React.useEffect(() => {
    dispatch(getUserOrders(user?.refreshToken));
  }, [dispatch]);
  return (
    <React.Fragment>
      <MetaData title="Orders" />
      <BreadCrumb title="order-history" />
      <Container classProp="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Finger Print</h5>
              </div>
              <div className="col-3">
                <h5>Date</h5>
              </div>
              <div className="col-3">
                <h5>Amount Paid</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {orders &&
                orders.length > 0 &&
                orders.map((order, index) => (
                  <div className="row bg-warning" key={index}>
                    <div className="col-3">
                      <p>{order.paymentIntent.id}</p>
                    </div>
                    <div className="col-3">
                      <p>
                        {new Date(
                          order.paymentIntent.date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-3">
                      <p>{(order.paymentIntent.amountPaid / 100).toFixed(2)}</p>
                    </div>
                    <div className="col-3">
                      <p>{order.orderStatus}</p>
                    </div>
                    {order.product &&
                      order.product.length > 0 &&
                      order.product.map((item, index) => (
                        <div className="col-12" key={index}>
                          <div className="row bg-secondary p-3">
                            <div className="col-3">
                              <p className="text-white">{item.product.title}</p>
                            </div>
                            <div className="col-3">
                              <p className="text-white">
                                Quantity:{item.quantity}
                              </p>
                            </div>
                            <div className="col-3">
                              <p className="text-white">
                                price:{item.product.price}
                              </p>
                            </div>
                            <div className="col-3">
                              <p className="text-white">color:{item.color}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Orders;
