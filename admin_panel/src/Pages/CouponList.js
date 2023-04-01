import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteCoupon, getCoupons } from "../feature/coupon/couponSlice";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const CouponList = () => {
  const dispatch = useDispatch();
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [couponId, setcouponId] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getCoupons(user?.refreshToken));
  }, [dispatch]);
  const { coupons = [] } = useSelector((state) => state.coupon) ?? {};
  const handleModalShow = (id, name) => {
    setshow(true);
    setcouponId(id);
    setname(name);
  };
  const CustomModal = ({ title, open, setShow }) => {
    function hideModal() {
      setShow(false);
    }
    function action() {
      dispatch(deleteCoupon({ id: couponId, token: user.refreshToken }));
      setShow(false);
      dispatch(getCoupons(user?.refreshToken));
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
                <th scope="col">Code</th>
                <th scope="col">Discount</th>
                <th scope="col">Expiry</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {coupons &&
                coupons.length > 0 &&
                coupons?.map((coupon, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{coupon.name}</td>
                    <td>{coupon.code}</td>
                    <td>{coupon.discount}</td>
                    <td>{coupon.expiry}</td>
                    <td>
                      <Link to={`/admin/add-coupon/${coupon._id}`}>
                        <EditOutlined className="fs-5 me-3 text-primary" />
                      </Link>
                      <DeleteOutlined
                        className="fs-5 ms-3 text-danger"
                        onClick={() => handleModalShow(coupon._id, coupon.name)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal open={show} title="Delete Brand" setShow={setshow} />
    </div>
  );
};

export default CouponList;
