import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          className="img-fluid w-100"
          src={process.env.PUBLIC_URL + "/assets/images/blog-1.jpg"}
          alt="..."
        />
      </div>
      <div className="blog-content">
        <p className="date">22 Dec,2023</p>
        <h5 className="title">Cheaper gadgets for the the price of nothing</h5>
        <p className="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
          necessitatibus eos .
        </p>
        <Link to="/read-blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
