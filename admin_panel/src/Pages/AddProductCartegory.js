import React from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../Components/CustomInput";
import {
  clearState,
  createCartegory,
  findCartegory,
  reviseCartegory,
} from "../feature/cartegory/cartegorySlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddProductCartegory = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const extractId = location.pathname.split("/")[3];
  const { cartegories, isError } = useSelector((state) => state.cartegory);
  React.useEffect(() => {
    if (extractId)
      dispatch(findCartegory({ token: user.refreshToken, id: extractId }));
  }, [extractId]);
  React.useEffect(() => {
    if (!extractId)
      formik.setValues({
        name: "",
        department: "",
        description: "",
        officerInCharge: "",
      });
  }, [location]);
  let cartegorySchema = object({
    name: string().required(),
    department: string().required(),
    description: string().required(),
    officerInCharge: string().required(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: cartegories?.name || "",
      department: cartegories?.department || "",
      description: cartegories?.description || "",
      officerInCharge: cartegories?.officerInCharge || "",
    },
    validationSchema: cartegorySchema,
    onSubmit: (values) => {
      values = {
        data: values,
        id: extractId || undefined,
        token: user.refreshToken,
      };
      if (!extractId) {
        dispatch(createCartegory(values));
        setTimeout(() => !isError && formik.resetForm(), 200);
      } else {
        dispatch(reviseCartegory(values));
        setTimeout(() => !isError && formik.resetForm(), 200);
        dispatch(clearState());
        navigate("/admin/section-list");
      }
    },
  });
  return (
    <div>
      <h3 className="mb-3">{extractId ? "Edit" : "Add"} Product Cartegory</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Cartegory Name"
            label="Product Cartegory"
            id="prod-cart"
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
            placeholder="Enter Department"
            label="Department"
            id="dept"
            name="department"
            onChange={formik.handleChange("department")}
            value={formik.values.department}
            onBlur={formik.handleChange("department")}
          />
          {formik.touched.department && formik.errors.department ? (
            <div className="mb-2 mt-0">{formik.errors.department}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="text"
            placeholder="Enter Product Description"
            label="Product Description"
            id="prod-desc"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
            onBlur={formik.handleChange("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="mb-2 mt-0">{formik.errors.description}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="text"
            placeholder="Officer In Charge"
            label="Officer In Charge"
            id="in-charge"
            name="officerInCharge"
            onChange={formik.handleChange("officerInCharge")}
            value={formik.values.officerInCharge}
            onBlur={formik.handleChange("officerInCharge")}
          />
          {formik.touched.officerInCharge && formik.errors.officerInCharge ? (
            <div className="mb-2 mt-0">{formik.errors.officerInCharge}</div>
          ) : (
            <span></span>
          )}
          <button type="submit" className="btn btn-success border-0 rounded-3">
            {extractId ? "Save Edit" : "Add Cartegory"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCartegory;
