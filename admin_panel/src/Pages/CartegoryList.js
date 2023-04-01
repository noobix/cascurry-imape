import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteCartegory,
  getCartegory,
} from "../feature/cartegory/cartegorySlice";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const CartegoryList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [cartegoryId, setcartegoryId] = React.useState(null);
  React.useEffect(() => {
    dispatch(getCartegory(user?.refreshToken));
  }, [dispatch]);
  const { cartegories = [] } = useSelector((state) => state.cartegory) ?? {};
  const handleModalShow = (id, name) => {
    setshow(true);
    setcartegoryId(id);
    setname(name);
  };
  const CustomModal = ({ title, open, setShow }) => {
    function hideModal() {
      setShow(false);
    }
    function action() {
      dispatch(deleteCartegory({ id: cartegoryId, token: user.refreshToken }));
      setShow(false);
      dispatch(getCartegory(user?.refreshToken));
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
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Description</th>
                <th scope="col">Office-In-Charge</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {cartegories &&
                cartegories.length > 0 &&
                cartegories?.map((cartegory, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{cartegory.name}</td>
                    <td>{cartegory.department}</td>
                    <td>{cartegory.description}</td>
                    <td>{cartegory.officerInCharge}</td>
                    <td>
                      <Link to={`/admin/cartegory/${cartegory._id}`}>
                        <EditOutlined className="fs-5 me-3 text-primary" />
                      </Link>
                      <DeleteOutlined
                        className="fs-5 ms-3 text-danger"
                        onClick={() =>
                          handleModalShow(cartegory._id, cartegory.name)
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

export default CartegoryList;
