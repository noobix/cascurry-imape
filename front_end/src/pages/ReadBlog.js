import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { getBlog } from "../features/blogs/blogslice";

const ReadBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { blog = {} } = useSelector((state) => state.blog) ?? {};
  const extractId = location.pathname.split("/")[2];
  React.useEffect(() => {
    dispatch(getBlog({ id: extractId }));
  }, [dispatch]);
  return (
    <React.Fragment>
      <MetaData title="Read Blog" />
      <BreadCrumb title="read-blog" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-0"></div>
            <div className="col-12">
              <div className="read-blog-card">
                <Link to="/blog">
                  Go back&nbsp;
                  <HiOutlineArrowNarrowLeft size={30} />
                </Link>
                <h3 className="title">{blog.title}</h3>
                {blog.images.length &&
                  blog.images
                    .slice(0, 1)
                    .map((image, index) => (
                      <img
                        className="img-fluid w-50 my-4"
                        src={image.image}
                        alt=""
                      />
                    ))}
                <p
                  dangerouslySetInnerHTML={{
                    __html: blog.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadBlog;
