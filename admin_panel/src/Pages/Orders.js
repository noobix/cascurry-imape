import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../feature/auth/authSlice";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getOrders(user?.refreshToken));
  }, [dispatch]);
  const { orders = [] } = useSelector((state) => state.auth) ?? {};
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">No. items</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link to={`/admin/orders/${order._id}`}>
                        {order.id.slice(19)}
                      </Link>
                    </td>
                    <td>
                      {order.orderBy.firstname} {order.orderBy.lastname}
                    </td>
                    <td>{order.orderBy.email}</td>
                    <td>{order.product.length}</td>
                    <td>
                      {order.product.reduce(
                        (grim, current) => grim + current.quantity,
                        0
                      )}
                    </td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
