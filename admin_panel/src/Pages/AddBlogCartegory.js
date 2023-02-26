import React from "react";
import CustomInput from "../Components/CustomInput";

const AddBlogCartegory = () => {
  return (
    <div>
      <h3 className="mb">Add Blog Cartegory</h3>
      <div>
        <form>
          <CustomInput
            type="text"
            placeholder="Enter Blog Cartegory"
            label="Blog Cartegory"
            id="blog-cart"
          />
          <button type="submit" className="btn btn-success border-0 rounded-3">
            Add Blog Cartegory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCartegory;
