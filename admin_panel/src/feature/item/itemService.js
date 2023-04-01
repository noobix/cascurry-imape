import axios from "axios";

export const listProducts = async (token) => {
  const response = await axios.get(`/api/products/stock/items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const addProduct = async ({ token, data }) => {
  const response = await axios.post(`/api/products/stock/item`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const findProduct = async ({ token, id }) => {
  const response = await axios.get(`/api/products/stock/item/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const updateProduct = async ({ token, data, id }) => {
  const response = await axios.put(`/api/products/stock/item/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const removeProduct = async ({ token, id }) => {
  const response = await axios.delete(`/api/products/stock/item/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
