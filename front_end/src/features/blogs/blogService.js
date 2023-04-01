import axios from "axios";

export const fetchBlogs = async (token) => {
  const response = await axios.get(`/api/users/blog/fetch_blog_all`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const fetchBlog = async ({ token, id }) => {
  const response = await axios.get(`/api/users/blog/fetch_blog/${id}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
