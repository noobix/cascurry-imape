import React from "react";
import CustomInput from "../Components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb">Add Brand</h3>
      <div>
        <form>
          <CustomInput
            type="text"
            placeholder="Enter Brand"
            label="Brand"
            id="brand"
          />
          <CustomInput
            type="text"
            placeholder="Enter Brand Origin"
            label="Made in"
            id="brand-origion"
          />
          <select className="form-select" aria-label="Default select example">
            <option defaultValue>Select Cartegory</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="mt-3">
            <h6>Supplier Information</h6>
            <input
              className="form-control form-control-sm w-50"
              type="text"
              placeholder="Company Name"
              aria-label=".form-control-sm example"
            />
            <input
              className="form-control form-control-sm w-50 mt-1"
              type="tel"
              placeholder="Mobile Number"
              aria-label=".form-control-sm example"
            />
            <input
              className="form-control form-control-sm w-50 mt-1"
              type="email"
              placeholder="Email"
              aria-label=".form-control-sm example"
            />
            <input
              className="form-control form-control-sm w-50 mt-1"
              type="text"
              placeholder="Address"
              aria-label=".form-control-sm example"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-5"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
