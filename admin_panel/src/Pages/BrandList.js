import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { deleteBrand, getBrands } from "../feature/brand/brandSlice";
import { Modal } from "antd";

const BrandList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [brandId, setbrandId] = React.useState(null);
  React.useEffect(() => {
    dispatch(getBrands(user?.refreshToken));
  }, [dispatch]);
  const { brands = [] } = useSelector((state) => state.brands) ?? {};
  const handleModalShow = (id, name) => {
    setshow(true);
    setbrandId(id);
    setname(name);
  };
  const CustomModal = ({ title, open, setShow }) => {
    function hideModal() {
      setShow(false);
    }
    function action() {
      dispatch(deleteBrand({ id: brandId, token: user.refreshToken }));
      setShow(false);
      dispatch(getBrands(user?.refreshToken));
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
                <th scope="col">Cartegory</th>
                <th scope="col">Manufacturer</th>
                <th scope="col">Origin</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {brands &&
                brands.length > 0 &&
                brands?.map((brand, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{brand?.name}</td>
                    <td>{brand?.category?.name}</td>
                    <td>{brand?.manufacturer}</td>
                    <td>{brand?.madeIn}</td>
                    <td>
                      <Link to={`/admin/make/${brand._id}`}>
                        <EditOutlined className="fs-5 me-3 text-primary" />
                      </Link>
                      <DeleteOutlined
                        onClick={() => handleModalShow(brand._id, brand.name)}
                        style={{ cursor: "pointer" }}
                        className="fs-5 ms-3 text-danger"
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

export default BrandList;
