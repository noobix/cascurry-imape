import React from "react";
import CustomInput from "../Components/CustomInput";

const CreateCoupon = () => {
  return (
    <div>
      <h3>Create Coupon</h3>
      <div>
        <form>
          <CustomInput
            placeholder="Enter coupon name"
            label="Coupon Name"
            id="coup-name"
            type="text"
          />
          <CustomInput label="Expiry Date" id="exp-date" type="date" />
          <CustomInput
            placeholder="Discount"
            label="Discount"
            id="discount"
            type="number"
          />
          <CustomInput
            placeholder="Discount Code"
            label="Discount Code"
            id="dist-code"
            type="text"
          />
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            Create Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCoupon;
