import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const ReadBlog = () => {
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
                <h3 className="title">
                  Cheaper gadgets for the the price of nothing
                </h3>
                <img
                  className="img-fluid w-100 my-4"
                  src={process.env.PUBLIC_URL + "/assets/images/blog-1.jpg"}
                  alt=""
                />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Recusandae doloremque voluptas non quia ducimus harum natus
                  maiores velit, tenetur eveniet nisi asperiores distinctio
                  aperiam? Exercitationem laudantium vero dolorum esse porro!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadBlog;
