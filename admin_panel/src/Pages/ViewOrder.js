import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrder } from "../feature/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const { orders = [] } = useSelector((state) => state.auth) ?? {};
  React.useEffect(() => {
    dispatch(getOrder({ token: user.refreshToken, id: extractId }));
  }, [dispatch]);
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.product &&
                orders.product.length > 0 &&
                orders?.product?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.product.title}</td>
                      <td>{item.product.brand.name}</td>
                      <td>{item.color}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product.price}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        {orders.product &&
                          orders.product.reduce(
                            (total, product) =>
                              total + product.product.price * product.quantity,
                            0
                          )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
