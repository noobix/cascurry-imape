import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  category,
  images,
  author,
  date,
  description,
}) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        {images.length > 0 &&
          images
            .slice(0, 1)
            .map((image, index) => (
              <img
                key={index}
                className="img-fluid w-100"
                src={image.image}
                alt="..."
              />
            ))}
      </div>
      <div className="blog-content">
        <p className="date">{new Date(date).toLocaleDateString()}</p>
        <h5 className="title">{title}</h5>
        <p
          className="description"
          dangerouslySetInnerHTML={{
            __html: description.substring(0, 100) + "....",
          }}
        />
        <Link to={`/read-blog/${id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
