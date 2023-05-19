import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getproductsPaginated,
  productPagination,
  searchProduct,
} from "../feature/item/itemSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const ProductList = () => {
  const dispatch = useDispatch();
  const [show, setshow] = React.useState(false);
  const [hidePaginate, sethidePaginate] = React.useState(false);
  const [name, setname] = React.useState("");
  const [query, setquery] = React.useState("");
  const [productId, setproductId] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const { products = [], pagination } =
    useSelector((state) => state.items) ?? {};
  React.useEffect(() => {
    dispatch(productPagination({ token: user.refreshToken, page: 1 }));
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(
      getproductsPaginated({
        token: user.refreshToken,
        page: pagination.currentPage,
        limit: pagination.itemCount,
        skip: pagination.startIndex,
      })
    );
  }, [pagination]);
  React.useEffect(() => {
    if (query.length === 0) {
      dispatch(productPagination({ token: user.refreshToken, page: 1 }));
      sethidePaginate(false);
    } else sethidePaginate(true);
    dispatch(searchProduct({ token: user?.refreshToken, search: query }));
  }, [query]);
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
      dispatch(
        productPagination({
          token: user.refreshToken,
          page: pagination.currentPage,
        })
      );
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
      <div className="row justify-content-end">
        <input
          className="form-control w-25 me-3"
          name="search"
          placeholder="search"
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
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
                    <td>
                      {product.title.length > 25
                        ? product.title.substring(0, 30) + "..."
                        : product.title}
                    </td>
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
                    productPagination({
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
                        productPagination({
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
                    productPagination({
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

      <CustomModal open={show} title="Delete Product" setShow={setshow} />
    </div>
  );
};

export default ProductList;
