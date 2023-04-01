import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../feature/customer/customerSlice";

const Customers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getCustomers(user?.refreshToken));
  }, [dispatch]);
  const { customers } = useSelector((state) => state.customers);
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {customers
                .filter((priv) => priv.privileges !== "admin")
                .map((customer, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {customer.firstname} {customer.lastname}
                    </td>
                    <td>{customer.mobile}</td>
                    <td>{customer.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
