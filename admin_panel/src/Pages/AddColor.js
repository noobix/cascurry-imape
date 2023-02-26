import React from "react";
import CustomInput from "../Components/CustomInput";

const AddColor = () => {
  const [colorCode, setcolorCode] = React.useState();
  return (
    <div>
      <h3 className="mb">Add Color</h3>
      <div>
        <form>
          <CustomInput
            type="color"
            label="Color"
            id="color"
            onChange={(e) => setcolorCode(e.target.value)}
          />
          <CustomInput
            type="text"
            placeholder="Enter Color Description"
            label="Color Description"
            id="color-des"
          />
          <CustomInput
            type="text"
            placeholder="Enter Color Code"
            label="Color Code"
            id="color-code"
            value={colorCode}
          />
          <button type="submit" className="btn btn-success border-0 rounded-3">
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
