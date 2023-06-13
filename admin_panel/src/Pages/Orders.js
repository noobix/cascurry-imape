import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersPaginated,
  ordersPagination,
} from "../feature/auth/authSlice";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { user, pagination } = useSelector((state) => state.auth);
  const [query, setquery] = React.useState("");
  const [filter, setfilter] = React.useState("");
  const [hidePaginate, sethidePaginate] = React.useState(false);
  React.useEffect(() => {
    dispatch(ordersPagination({ token: user.refreshToken, page: 1 }));
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(
      getOrdersPaginated({
        token: user.refreshToken,
        page: pagination.currentPage,
        limit: pagination.itemCount,
        skip: pagination.startIndex,
      })
    );
  }, [pagination]);
  React.useEffect(() => {
    if (
      (query.length === 0 && filter.length === 0) ||
      filter === "Select status"
    ) {
      dispatch(ordersPagination({ token: user.refreshToken, page: 1 }));
      sethidePaginate(false);
    } else sethidePaginate(true);
    dispatch(
      getOrdersPaginated({
        token: user.refreshToken,
        search: query,
        status: filter,
      })
    );
  }, [query, filter]);
  const { orders = [] } = useSelector((state) => state.auth) ?? {};
  return (
    <div className="container-xxl">
      <div className="row justify-content-end">
        <input
          className="form-control w-25 me-3"
          name="search"
          placeholder="search"
          onChange={(e) => setquery(e.target.value)}
        />
        <select
          className="form-select w-25"
          aria-label="Default select example"
          onChange={(e) => setfilter(e.target.value)}
        >
          <option selected>Select status</option>
          <option value="Not Processed">Not Processed</option>
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
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
        {!hidePaginate && (
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
                    dispatch(
                      ordersPagination({
                        token: user.refreshToken,
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
                        dispatch(
                          ordersPagination({
                            token: user.refreshToken,
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
                    dispatch(
                      ordersPagination({
                        token: user.refreshToken,
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
        )}
      </div>
    </div>
  );
};

export default Orders;
