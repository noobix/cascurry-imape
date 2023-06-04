import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogCard from "../components/BlogCard";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import { getBlogs } from "../features/blogs/blogslice";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs = [] } = useSelector((state) => state.blog) ?? {};
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  return (
    <React.Fragment>
      <MetaData title="Blogs" />
      <BreadCrumb title="Blog" />
      <Container classProp="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title mb-3">Find By Categories</h3>
              <div>
                <ul>
                  <li>Television</li>
                  <li>Mobile Phone</li>
                  <li>Laptop</li>
                  <li>Camera</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="d-flex gap-10">
              <div className="row">
                <div className="col-6 mb-3">
                  {blogs &&
                    blogs.length > 0 &&
                    blogs.map((blog, index) => (
                      <BlogCard
                        key={index}
                        id={blog._id}
                        title={blog.title}
                        category={blog.category.name}
                        images={blog.images}
                        author={blog.author}
                        date={blog.createdAt}
                        description={blog.description}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Blog;
