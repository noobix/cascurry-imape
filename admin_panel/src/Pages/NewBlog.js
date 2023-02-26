import React from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

const NewBlog = () => {
  const [contain, setContain] = React.useState("");
  const handleEntry = function (entry) {
    setContain(entry);
  };
  return (
    <div>
      <h3>Add Blog</h3>
      <div>
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
        <form className=" mt-5">
          <CustomInput
            type="text"
            placeholder="Enter Title"
            id="blog-title"
            label="Blog Title"
          />
          <select className="form-select" aria-label="Default select example">
            <option defaultValue>Select blog cartegory</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <ReactQuill
            className="my-3 form-control"
            theme="snow"
            value={contain}
            onChange={(evt) => handleEntry(evt)}
          />
          <button type="submit" className="btn btn-success border-0 rounded-3">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
