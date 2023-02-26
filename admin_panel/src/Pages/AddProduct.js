import React from "react";
import CustomInput from "../Components/CustomInput";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddProduct = () => {
  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <div>
        <form>
          <CustomInput
            type="text"
            placeholder="Title"
            id="prod-name"
            label="Product Name"
          />
          <CustomInput
            type="text"
            placeholder="Slug eg: stove or laptop"
            id="prod-slug"
            label="Slug"
          />
          <CustomInput
            type="number"
            placeholder="Price"
            id="prod-price"
            label="Price"
          />
          <select
            className="form-select mb-3"
            aria-label="Default select example"
          >
            <option defaultValue>Select Product Cartegory</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
          >
            <option defaultValue>Select Product Brand</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <CustomInput
            type="number"
            placeholder="Quantity"
            id="prod-quantity"
            label="Quantity"
          />
          <select
            className="form-select mb-3"
            aria-label="Default select example"
          >
            <option defaultValue>Select Product Color</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
