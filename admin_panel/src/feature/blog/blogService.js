import axios from "axios";

export const listBlogs = async (token) => {
  const response = await axios.get(`/api/users/blog/fetch_blog_all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const addBlog = async ({ token, data }) => {
  const response = await axios.post(`/api/users/blog/new_blog_post`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const removeBlog = async ({ token, id }) => {
  const response = await axios.delete(`/api/users/blog/remove_blog/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const findBlog = async ({ token, id }) => {
  const response = await axios.get(`/api/users/blog/fetch_blog/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const updateBlog = async ({ token, id, data }) => {
  const response = await axios.put(`/api/users/blog/update_blog/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
