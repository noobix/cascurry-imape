import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrder, updateOrderStatus } from "../feature/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.auth) ?? {};
  React.useEffect(() => {
    dispatch(getOrder({ token: user.refreshToken, id: extractId }));
  }, [dispatch]);
  const updateStatus = (e, id) => {
    dispatch(
      updateOrderStatus({
        token: user.refreshToken,
        id: id,
        data: { status: e.target.value },
      })
    );
  };
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-6">
          <div className="border border-3 rounded-3 border-secondary bg-secondary py-2 my-3">
            <div className="ms-3">
              <div className="d-flex gap-2">
                <div className="text-white mb-1">Account Name:</div>
                <div className="text-info">
                  {order?.orderBy?.firstname}&nbsp;{order?.orderBy?.lastname}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-white mb-1">Account Email:</div>
                <div className="text-info">{order?.orderBy?.email}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient Name:</div>
                <div className="text-info">
                  {order?.shippingInfo?.firstname}&nbsp;
                  {order?.shippingInfo?.lastname}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient Address 1:</div>
                <div className="text-info">
                  {order?.shippingInfo?.addressLine1}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient Address 2:</div>
                <div className="text-info">
                  {order?.shippingInfo?.addressLine2}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient City:</div>
                <div className="text-info">{order?.shippingInfo?.city}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient State:</div>
                <div className="text-info">{order?.shippingInfo?.state}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient Country:</div>
                <div className="text-info">{order?.shippingInfo?.country}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Recipient Zip:</div>
                <div className="text-info">{order?.shippingInfo?.zip}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="border border-3 rounded-3 border-secondary bg-secondary py-1 my-3">
            <div className="ms-3">
              <div className="d-flex gap-2">
                <div className="text-white mb-1">Transaction Date</div>
                <div className="text-info">
                  {new Date(order?.paymentIntent?.date).toLocaleDateString()}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-white mb-1">Finger Print</div>
                <div className="text-info">{order?.paymentIntent?.id}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Payment Intent:</div>
                <div className="text-info">{order?.paymentIntent?.method}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Payment Status:</div>
                <div className="text-info">
                  {order?.paymentIntent?.paymentStatus}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Feedback:</div>
                <div className="text-info">
                  {order?.paymentIntent?.statusInformation}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Total Bill:</div>
                <div className="text-info">
                  &#36;{order?.paymentIntent?.amount}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Shipping:</div>
                <div className="text-info">&#36;{order?.shippingFee}</div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1">Amount Paid:</div>
                <div className="text-info">
                  &#36;{(order?.paymentIntent?.amountPaid / 100).toFixed(2)}
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="text-warning mb-1 p-1">
                  Update Order Status:
                </div>
                <select
                  className="form-select-sm mb-0"
                  aria-label="Default select example"
                  value={order.orderStatus}
                  onChange={(e) => updateStatus(e, order._id)}
                >
                  <option defaultValue>Status options</option>
                  <option value="Not Processed">Not Processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table-dark table-striped table-hover table">
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
              {order &&
                order.product &&
                order.product.length > 0 &&
                order?.product?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.product.title}</td>
                      <td>{item.product.brand.name}</td>
                      <td>{item.color}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product.price}</td>
                    </tr>
                  </React.Fragment>
                ))}
              <tr>
                <th colSpan={6}></th>
                <td>
                  {order.product &&
                    order.product.reduce(
                      (total, product) =>
                        total + product.product.price * product.quantity,
                      0
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
