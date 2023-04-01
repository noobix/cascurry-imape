import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteBlog, getBlogs } from "../feature/blog/blogSlice";
import { Modal } from "antd";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();
  const [show, setshow] = React.useState(false);
  const [name, setname] = React.useState("");
  const [blogId, setblogId] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getBlogs(user?.refreshToken));
  }, [dispatch]);
  const { blogs = [] } = useSelector((state) => state.blog) ?? {};
  const handleModalShow = (id, name) => {
    setshow(true);
    setblogId(id);
    setname(name);
  };
  const CustomModal = ({ title, open, setShow }) => {
    function hideModal() {
      setShow(false);
    }
    function action() {
      dispatch(deleteBlog({ id: blogId, token: user.refreshToken }));
      setShow(false);
      dispatch(getBlogs(user?.refreshToken));
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
                <th scope="col">Description</th>
                <th scope="col">Cartegory</th>
                <th scope="col">Views</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {blogs &&
                blogs.length > 0 &&
                blogs?.map((blog, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{blog.title}</td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: blog.description.substring(0, 40) + "....",
                      }}
                    ></td>
                    <td>{blog.category.name}</td>
                    <td>{blog.numberOfViews}</td>
                    <td>
                      <Link to={`/admin/add-blog/${blog._id}`}>
                        <EditOutlined className="fs-5 me-3 text-primary" />
                      </Link>
                      <DeleteOutlined
                        onClick={() => handleModalShow(blog._id, blog.title)}
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

export default BlogList;
