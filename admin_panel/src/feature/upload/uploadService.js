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
export const fetchProductImages = async ({ token, id }) => {
  const response = await axios.get(
    `/api/products/stock/item/get_images/${id}`,
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
export const fetchBlogImages = async ({ token, id }) => {
  const response = await axios.get(`/api/users/blog/get_blog_images/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
