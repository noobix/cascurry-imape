import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  cartegoryPagination,
  deleteCartegory,
  getCategoryPaginated,
} from "../feature/cartegory/cartegorySlice";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const CartegoryList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [query, setquery] = React.useState("");
  const [hidePaginate, sethidePaginate] = React.useState(false);
  const [cartegoryId, setcartegoryId] = React.useState(null);
  const { cartegories = [], pagination } =
    useSelector((state) => state.cartegory) ?? {};
  React.useEffect(() => {
    dispatch(cartegoryPagination({ token: user?.refreshToken, page: 1 }));
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(
      getCategoryPaginated({
        token: user.refreshToken,
        page: pagination.currentPage,
        limit: pagination.itemCount,
        skip: pagination.startIndex,
      })
    );
  }, [pagination]);
  React.useEffect(() => {
    if (query.length === 0) {
      dispatch(cartegoryPagination({ token: user.refreshToken, page: 1 }));
      sethidePaginate(false);
    } else sethidePaginate(true);
    dispatch(getCategoryPaginated({ token: user.refreshToken, search: query }));
  }, [query]);
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
      setTimeout(
        () =>
          dispatch(
            getCategoryPaginated({
              token: user?.refreshToken,
              page: pagination.currentPage,
            })
          ),
        200
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
                    cartegoryPagination({
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
                        cartegoryPagination({
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
                    cartegoryPagination({
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
      <CustomModal open={show} title="Delete Cartegory" setShow={setshow} />
    </div>
  );
};

export default CartegoryList;
