import React from "react";
import CustomInput from "../Components/CustomInput";
import { Select } from "antd";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { getCartegory } from "../feature/cartegory/cartegorySlice";
import { getColors } from "../feature/color/colorSlice";
import { getBrands } from "../feature/brand/brandSlice";
import {
  clearUploadData,
  getProductImages,
  uploadImages,
  deleteImage,
  updateCatlogue,
} from "../feature/upload/uploadSlice";
import {
  clearState,
  createProduct,
  fetchProduct,
  reviseProduct,
} from "../feature/item/itemSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [tags, settags] = React.useState([]);
  const productTags = [
    { label: "Thrending", value: "Thrending" },
    { label: "Specials", value: "Specials" },
    { label: "Featured", value: "Featured" },
  ];
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const { cartegories } = useSelector((state) => state.cartegory);
  const { brands } = useSelector((state) => state.brands);
  const { colors } = useSelector((state) => state.color);
  const { images = [] } = useSelector((state) => state.upload) ?? {};
  const { products, isError } = useSelector((state) => state.items);
  React.useEffect(() => {
    dispatch(getCartegory(user?.refreshToken));
    dispatch(getColors(user?.refreshToken));
    dispatch(getBrands(user?.refreshToken));
  }, [dispatch]);
  React.useEffect(() => {
    formik.setFieldValue(
      "images",
      images.length && !extractId
        ? images
        : extractId
        ? images.map((image) => image.image)
        : undefined
    );
  }, [images]);
  React.useEffect(() => {
    if (extractId) {
      dispatch(fetchProduct({ token: user.refreshToken, id: extractId }));
      dispatch(getProductImages({ token: user.refreshToken, id: extractId }));
    }
  }, [extractId]);
  React.useEffect(() => {
    if (!extractId) {
      formik.setValues({
        title: "",
        slug: "",
        price: 0,
        category: "",
        brand: "",
        quantity: 0,
        color: "",
        images: [],
        tags: [],
      });
      dispatch(clearUploadData());
    }
  }, [location]);
  function handleDelete(url) {
    const parts =
      typeof url === "object" ? url.image.split("/") : url.split("/");
    const filename = parts[parts.length - 1].split(".")[0];
    dispatch(
      deleteImage({
        img_pub_id: filename,
        token: user.refreshToken,
      })
    );
  }
  function handleUpload(acceptedFiles) {
    if (extractId) {
      dispatch(
        updateCatlogue({
          images: acceptedFiles,
          token: user.refreshToken,
          id: extractId,
        })
      );
    } else {
      dispatch(
        uploadImages({
          images: acceptedFiles,
          token: user.refreshToken,
        })
      );
    }
  }
  let productSchema = object({
    title: string().required(),
    slug: string().required(),
    price: number().required(),
    category: string().required(),
    brand: string().required(),
    quantity: number().required(),
    color: string().required(),
    images: array(),
    tags: array(),
  });
  function handleOption(values) {
    formik.setFieldValue("tags", values);
    settags(values);
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: products?.title || "",
      slug: products?.slug || "",
      price: products?.price || 0,
      category: products?.category?.name || "",
      brand: products?.brand?.name || "",
      quantity: products?.quantity || 0,
      color: products?.color?.name || "",
      images: products?.images?.map((image) => image.image) || [],
      tags: products?.tags?.map((tag) => tag.tag) || [],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      values = {
        data: values,
        id: extractId || undefined,
        token: user.refreshToken,
      };
      if (!extractId) {
        dispatch(createProduct(values));
        setTimeout(() => !isError && formik.resetForm(), 200);
        settags([]);
        dispatch(clearUploadData());
      } else {
        dispatch(reviseProduct(values));
        setTimeout(() => !isError && formik.resetForm(), 200);
        dispatch(clearState());
        settags([]);
        dispatch(clearUploadData());
        navigate("/admin/product-list");
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">{extractId ? "Edit" : "Add"} Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Title"
            id="prod-name"
            label="Product Name"
            name="title"
            onChange={formik.handleChange("title")}
            value={formik.values.title}
            onBlur={formik.handleChange("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="mb-2 mt-0">{formik.errors.title}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="text"
            placeholder="Slug eg: stove or laptop"
            id="prod-slug"
            label="Slug"
            name="slug"
            onChange={formik.handleChange("slug")}
            value={formik.values.slug}
            onBlur={formik.handleChange("slug")}
          />
          {formik.touched.slug && formik.errors.slug ? (
            <div className="mb-2 mt-0">{formik.errors.slug}</div>
          ) : (
            <span></span>
          )}
          <Select
            mode="multiple"
            allowClear
            className="w-100 mb-3"
            onChange={(value) => handleOption(value)}
            value={formik.values.tags}
            options={productTags}
            defaultValue={tags}
            placeholder="Select product tags..."
          />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="mb-2 mt-0">{formik.errors.tags}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="number"
            placeholder="Price"
            id="prod-price"
            label="Price"
            name="price"
            onChange={formik.handleChange("price")}
            value={formik.values.price}
            onBlur={formik.handleChange("price")}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="mb-2 mt-0">{formik.errors.price}</div>
          ) : (
            <span></span>
          )}
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleChange("category")}
          >
            <option defaultValue>Select Product Cartegory</option>
            {cartegories.map((cartegory, index) => (
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
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleChange("brand")}
          >
            <option defaultValue>Select Product Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          {formik.touched.brand && formik.errors.brand ? (
            <div className="mb-2 mt-0">{formik.errors.brand}</div>
          ) : (
            <span></span>
          )}
          <CustomInput
            type="number"
            placeholder="Quantity"
            id="prod-quantity"
            label="Quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            value={formik.values.quantity}
            onBlur={formik.handleChange("quantity")}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="mb-2 mt-0">{formik.errors.quantity}</div>
          ) : (
            <span></span>
          )}
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange("color")}
            onBlur={formik.handleChange("color")}
          >
            <option defaultValue>Select Product Color</option>
            {colors.map((color, index) => (
              <option key={index} value={color.name}>
                {color.name}
              </option>
            ))}
          </select>
          {formik.touched.color && formik.errors.color ? (
            <div className="mb-2 mt-0">{formik.errors.color}</div>
          ) : (
            <span></span>
          )}
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="cursor-pointer">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-image d-flex gap-10 flex-wrap my-3">
            {images &&
              images.length > 0 &&
              images?.map((image, index) => (
                <div key={index} className="position-relative">
                  <button
                    className="btn-close position-absolute"
                    style={{ top: "0", right: "0" }}
                    type="button"
                    onClick={() => handleDelete(image)}
                  />
                  <img
                    className="mx-2 my-2"
                    width="200px"
                    src={typeof image === "object" ? image.image : image}
                    alt="..."
                  />
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            {extractId ? "Save Edit" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
