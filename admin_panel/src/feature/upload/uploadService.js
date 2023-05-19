import axios from "axios";

export const uploadFiles = async ({ token, formdata }) => {
  const response = await axios.post(
    `/api/products/stock/item/images`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const updateProductImages = async ({ token, formdata, id }) => {
  const response = await axios.put(
    `/api/products/stock/item/upload_image/${id}`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchProductImages = async ({ token, id }) => {
  const response = await axios.get(
    `/api/products/stock/item/get_images/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchBlogImages = async ({ token, id }) => {
  const response = await axios.get(`/api/users/blog/get_blog_images/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const removeImage = async ({ token, img_pub_id }) => {
  const response = await axios.delete(
    `/api/products/stock/item/remove_image/${img_pub_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
