import React from "react";
import { string, object, date, number } from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../Components/CustomInput";
import {
  clearState,
  findCoupon,
  makeCoupon,
  reviseCoupon,
} from "../feature/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

const CreateCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const { isError, coupons } = useSelector((state) => state.coupon);
  React.useEffect(() => {
    if (extractId) {
      dispatch(findCoupon({ token: user.refreshToken, id: extractId }));
    }
  }, [extractId]);
  const formatDate = (date) => {
    date = new Date(date);
    const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate() + 1}`;
    const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }`;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  let couponSchema = object({
    name: string().required(),
    expiry: date().required(),
    discount: number().required(),
    code: string().required(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: coupons.name || "",
      expiry: formatDate(coupons.expiry) || Date.now(),
      discount: coupons.discount || 0.0,
      code: coupons.code || "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      values = {
        data: values,
        id: extractId || undefined,
        token: user.refreshToken,
      };
      if (!extractId) {
        dispatch(makeCoupon(values));
        !isError && formik.resetForm();
      } else {
        dispatch(reviseCoupon(values));
        !isError && formik.resetForm();
        dispatch(clearState());
        navigate("/admin/coupon-list");
      }
    },
  });
  return (
    <div>
      <h3>{extractId ? "Edit" : "Add"} Coupon</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            placeholder="Enter coupon name"
            label="Coupon Name"
            id="coup-name"
            type="text"
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
            label="Expiry Date"
            id="exp-date"
            type="date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            value={formik.values.expiry}
            onBlur={formik.handleChange("expiry")}
          />
          {formik.touched.expiry && formik.errors.expiry ? (
            <div className="mb-2 mt-0">{formik.errors.expiry}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            placeholder="Discount"
            label="Discount"
            id="discount"
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            value={formik.values.discount}
            onBlur={formik.handleChange("discount")}
          />
          {formik.touched.discount && formik.errors.discount ? (
            <div className="mb-2 mt-0">{formik.errors.discount}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            placeholder="Discount Code"
            label="Discount Code"
            id="dist-code"
            type="text"
            name="code"
            maxLength={8}
            onChange={formik.handleChange("code")}
            value={formik.values.code}
            onBlur={formik.handleChange("code")}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="mb-2 mt-0">{formik.errors.code}</div>
          ) : (
            <span></span>
          )}
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            {extractId ? "Save Edit" : "Add Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCoupon;
