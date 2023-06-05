import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { array, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../Components/CustomInput";
import {
  clearUploadData,
  uploadImages,
  getBlogImages,
} from "../feature/upload/uploadSlice";
import { getCartegory } from "../feature/cartegory/cartegorySlice";
import { createBlog, fetchBlog, reviseBlog } from "../feature/blog/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";

const NewBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const { images } = useSelector((state) => state.upload);
  const { blogs } = useSelector((state) => state.blog);
  const { isError } = useSelector((state) => state.blog);
  const { cartegories } = useSelector((state) => state.cartegory);
  React.useEffect(() => {
    dispatch(getCartegory(user?.refreshToken));
  }, [dispatch]);
  React.useEffect(() => {
    formik.values.images = images.length ? images : [];
  }, [images]);
  React.useEffect(() => {
    if (extractId) {
      dispatch(fetchBlog({ token: user.refreshToken, id: extractId }));
      dispatch(getBlogImages({ token: user.refreshToken, id: extractId }));
    }
  }, [extractId]);
  React.useEffect(() => {
    formik.values.images = images.length ? images : undefined;
  }, [images]);
  let blogSchema = object({
    title: string().required(),
    description: string().required(),
    category: string().required(),
    images: array().required(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogs?.title || "",
      description: blogs?.description || "",
      category: blogs?.category?.name || "",
      images: [],
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      values = {
        data: values,
        id: extractId || undefined,
        token: user.refreshToken,
      };
      if (!extractId) {
        dispatch(createBlog(values));
        !isError && formik.resetForm();
        dispatch(clearUploadData());
      } else {
        dispatch(reviseBlog(values));
        !isError && formik.resetForm();
        dispatch(clearUploadData());
        navigate("/admin/all-blogs");
      }
    },
  });
  return (
    <div>
      <h3>Add Blog</h3>
      <div>
        <div className="bg-white border-1 p-5 text-center">
          <Dropzone
            onDrop={(acceptedFiles) =>
              dispatch(
                uploadImages({
                  images: acceptedFiles,
                  token: user.refreshToken,
                })
              )
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="show-image d-flex gap-10 flex-wrap my-3">
          {images.map((image, index) => (
            <div key={index} className="position-relative">
              <button
                className="btn-close position-absolute"
                style={{ top: "0", right: "0" }}
                type="button"
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
        <form className=" mt-5" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Title"
            id="blog-title"
            label="Blog Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleChange("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="mb-2 mt-0">{formik.errors.title}</div>
          ) : (
            <span></span>
          )}
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleChange("category")}
          >
            <option defaultValue>Select blog cartegory</option>
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
          <ReactQuill
            className="my-3 form-control"
            theme="snow"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleChange("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="mb-2 mt-0">{formik.errors.description}</div>
          ) : (
            <span></span>
          )}
          <button type="submit" className="btn btn-success border-0 rounded-3">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
