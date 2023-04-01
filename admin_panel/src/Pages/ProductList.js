import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../feature/item/itemSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const ProductList = () => {
  const dispatch = useDispatch();
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [productId, setproductId] = React.useState(null);
  const productTags = [
    { label: "Thrending", value: "Thrending" },
    { label: "Specials", value: "Specials" },
    { label: "Featured", value: "Featured" },
  ];
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getProducts(user?.refreshToken));
  }, [dispatch]);
  const { products = [] } = useSelector((state) => state.items) ?? {};
  const handleModalShow = (id, name) => {
    setshow(true);
    setproductId(id);
    setname(name);
  };
  const CustomModal = ({ title, open, setShow }) => {
    function hideModal() {
      setShow(false);
    }
    function action() {
      dispatch(deleteProduct({ id: productId, token: user.refreshToken }));
      setShow(false);
      dispatch(getProducts(user?.refreshToken));
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
                <th scope="col">Title</th>
                <th scope="col">Brand</th>
                <th scope="col">Cartegory</th>
                <th scope="col">Made In</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products?.map((product, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.title}</td>
                    <td>{product.brand.name}</td>
                    <td>{product.category.name}</td>
                    <td>{product.brand.madeIn}</td>
                    <td>{product.quantity}</td>
                    <td>&#36;{product.price}</td>
                    <td>
                      <Link to={`/admin/add-item/${product._id}`}>
                        <EditOutlined className="fs-5 me-3 text-primary" />
                      </Link>
                      <DeleteOutlined
                        onClick={() =>
                          handleModalShow(product._id, product.title)
                        }
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
      <CustomModal open={show} title="Delete Product" setShow={setshow} />
    </div>
  );
};

export default ProductList;
