import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../feature/enquiry/enquirySlice";
import { Modal } from "antd";

const Enquiries = () => {
  const dispatch = useDispatch();
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [customerId, setcustomerId] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getEnquiries(user?.refreshToken));
  }, [dispatch]);
  const { enquiries = [] } = useSelector((state) => state.enquiry) ?? {};
  const handleModalShow = (id, name) => {
    setshow(true);
    setcustomerId(id);
    setname(name);
  };
  const CustomModal = ({ title, open, setShow }) => {
    function hideModal() {
      setShow(false);
    }
    function action() {
      dispatch(deleteEnquiry({ id: customerId, token: user.refreshToken }));
      setShow(false);
      dispatch(getEnquiries(user?.refreshToken));
    }
    return (
      <Modal
        title={title}
        open={open}
        onOk={action}
        onCancel={hideModal}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete <u>{name}</u>
        </p>
      </Modal>
    );
  };
  const updateStatus = (e, id) => {
    e.preventDefault();
    dispatch(
      updateEnquiry({
        id: id,
        token: user.refreshToken,
        data: { status: e.target.value },
      })
    );
  };
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
                <th scope="col">Comment</th>
                <th scope="col">Status</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {enquiries &&
                enquiries.length > 0 &&
                enquiries?.map((customer, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{customer.name}</td>
                    <td>{customer.mobile}</td>
                    <td>{customer.email}</td>
                    <td>
                      {customer.comment.length > 40
                        ? customer.comment.substring(0, 40) + "...."
                        : customer.comment}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm mb-0"
                        aria-label="Default select example"
                        value={customer.status}
                        onChange={(e) => updateStatus(e, customer._id)}
                      >
                        <option defaultValue>Status options</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      <Link to={`/admin/enquiry-view/${customer._id}`}>
                        <EyeOutlined className="fs-5 me-3 text-primary" />
                      </Link>
                      <DeleteOutlined
                        className="fs-5 ms-3 text-danger"
                        onClick={() =>
                          handleModalShow(customer._id, customer.name)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal open={show} title="Delete Cartegory" setShow={setshow} />
    </div>
  );
};

export default Enquiries;
