import axios from "axios";

export const listColors = async (token) => {
  const response = await axios.get(`/api/products/color/color_list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const addColor = async ({ token, data }) => {
  const response = await axios.post(`/api/products/color/add_color`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
