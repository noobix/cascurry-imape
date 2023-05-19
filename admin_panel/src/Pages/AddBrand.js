import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { string, object } from "yup";
import { useFormik } from "formik";
import CustomInput from "../Components/CustomInput";
import {
  clearState,
  createBrands,
  fetchBrand,
  reviseBrand,
} from "../feature/brand/brandSlice";
import { getCartegory } from "../feature/cartegory/cartegorySlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [supplier, setsupplier] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const { brand, isError } = useSelector((state) => state.brands);
  const { cartegories } = useSelector((state) => state.cartegory);
  const {
    brand: { supplier: dealer },
  } = useSelector((state) => state.brands);
  React.useEffect(() => {
    if (extractId) {
      dispatch(fetchBrand({ token: user.refreshToken, id: extractId }));
    }
  }, [extractId]);
  React.useEffect(() => {
    if (!extractId)
      formik.setValues({
        name: "",
        manufacturer: "",
        madeIn: "",
        category: "",
      });
  }, [location]);
  React.useEffect(() => {
    dispatch(getCartegory(user?.refreshToken));
  }, [dispatch]);
  let brandSchema = object({
    name: string().required(),
    manufacturer: string().required(),
    madeIn: string().required(),
    category: string().required(),
    supllier: object(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: brand?.name || "",
      manufacturer: brand?.manufacturer || "",
      madeIn: brand?.madeIn || "",
      category: brand?.category?.name || "",
      supplier: {},
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      const isEmpty = !Object.values(supplier).some(
        (x) => x !== null && x !== ""
      );
      formik.values.supplier = !isEmpty && supplier;
      values = {
        data: values,
        id: extractId || undefined,
        token: user.refreshToken,
      };
      if (!extractId) {
        dispatch(createBrands(values));
        setTimeout(() => !isError && formik.resetForm(), 200);
        setsupplier({
          name: "",
          phone: "",
          email: "",
          address: "",
        });
      } else {
        dispatch(reviseBrand(values));
        setTimeout(() => !isError && formik.resetForm(), 200);
        dispatch(clearState());
        setsupplier({
          name: "",
          phone: "",
          email: "",
          address: "",
        });
        navigate("/admin/make-list");
      }
    },
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setsupplier({ ...supplier, [name]: value });
  }
  return (
    <div>
      <h3 className="mb">{extractId ? "Edit" : "Add"} Brand</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Brand"
            label="Brand"
            id="brand"
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
            placeholder="Enter Brand Origin"
            label="Manufacturer"
            id="brand-manufacturer"
            name="manufacturer"
            onChange={formik.handleChange("manufacturer")}
            value={formik.values.manufacturer}
            onBlur={formik.handleChange("manufacturer")}
          />
          {formik.touched.manufacturer && formik.errors.manufacturer ? (
            <div className="mb-2 mt-0">{formik.errors.manufacturer}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="text"
            placeholder="Enter Brand Origin"
            label="Made in"
            id="brand-origion"
            name="madeIn"
            onChange={formik.handleChange("madeIn")}
            value={formik.values.madeIn}
            onBlur={formik.handleChange("madeIn")}
          />
          {formik.touched.madeIn && formik.errors.madeIn ? (
            <div className="mb-2 mt-0">{formik.errors.madeIn}</div>
          ) : (
            <span></span>
          )}
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            onChange={formik.handleChange("category")}
            value={formik.values.category}
            onBlur={formik.handleChange("category")}
          >
            <option defaultValue>Select Cartegory</option>
            {cartegories &&
              cartegories.map((cartegory, index) => (
                <option key={index} value={cartegory.name}>
                  {cartegory.name}
                </option>
              ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="mb-2 mt-0">{formik.errors.category}</div>
          ) : (
            <span></span>
          )}
          <div className="row">
            <div className="col-6">
              <div className="mt-3">
                <h6>Supplier Information</h6>
                <input
                  className="form-control form-control-sm w-100"
                  type="text"
                  placeholder="Company Name"
                  aria-label=".form-control-sm example"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value={supplier["name"]}
                />
                <input
                  className="form-control form-control-sm w-100 mt-1"
                  type="tel"
                  placeholder="Mobile Number"
                  aria-label=".form-control-sm example"
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  value={supplier["phone"]}
                />
                <input
                  className="form-control form-control-sm w-100 mt-1"
                  type="email"
                  placeholder="Email"
                  aria-label=".form-control-sm example"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={supplier["email"]}
                />
                <input
                  className="form-control form-control-sm w-100 mt-1"
                  type="text"
                  placeholder="Address"
                  aria-label=".form-control-sm example"
                  name="address"
                  onChange={(e) => handleChange(e)}
                  value={supplier["address"]}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mt-3 d-flex gap-10 flex-wrap">
                <div className="mx-3 my-1">
                  <h6> Current Suppliers</h6>
                  {dealer &&
                    extractId &&
                    dealer.map(({ name, phone, email, address }, index) => (
                      <div key={index}>
                        <p>Name: {name}</p>
                        <p>Number: {phone}</p>
                        <p>Email: {email}</p>
                        <p>Address: {address}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-5"
          >
            {extractId ? "Save Edit" : "Add Brand"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
