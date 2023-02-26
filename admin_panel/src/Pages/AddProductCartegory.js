import React from "react";
import CustomInput from "../Components/CustomInput";

const AddProductCartegory = () => {
  return (
    <div>
      <h3 className="mb">Add Product Cartegory</h3>
      <div>
        <form>
          <CustomInput
            type="text"
            placeholder="Enter Cartegory Name"
            label="Product Cartegory"
            id="prod-cart"
          />
          <CustomInput
            type="text"
            placeholder="Enter Department"
            label="Department"
            id="dept"
          />
          <CustomInput
            type="text"
            placeholder="Enter Product Description"
            label="Product Description"
            id="prod-desc"
          />
          <CustomInput
            type="text"
            placeholder="Officer In Charge"
            label="Officer In Charge"
            id="in-charge"
          />
          <button type="submit" className="btn btn-success border-0 rounded-3">
            Add Product Cartegory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCartegory;
