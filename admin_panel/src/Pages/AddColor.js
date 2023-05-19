import React from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createColor } from "../feature/color/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const [colorCode, setcolorCode] = React.useState();
  const { user } = useSelector((state) => state.auth);
  const { isError } = useSelector((state) => state.color);
  let colorSchema = object({
    name: string().required(),
    color: string(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      formik.values.color = colorCode;
      values = { data: values, token: user.refreshToken };
      dispatch(createColor(values));
      !isError && formik.resetForm();
    },
  });
  return (
    <div>
      <h3 className="mb">Add Color</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
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
            name="name"
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            onBlur={formik.handleChange("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="mb-2 mt-0">{formik.errors.name}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="text"
            placeholder="Enter Color Code"
            label="Color Code"
            id="color-code"
            value={colorCode}
            name="color"
            onChange={formik.handleChange("color")}
            onBlur={formik.handleChange("color")}
          />
          {formik.touched.color && formik.errors.color ? (
            <div className="mb-2 mt-0">{formik.errors.color}</div>
          ) : (
            <span></span>
          )}
          <button type="submit" className="btn btn-success border-0 rounded-3">
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
