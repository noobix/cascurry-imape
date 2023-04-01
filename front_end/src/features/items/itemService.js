import axios from "axios";

export const fetchProducts = async (token) => {
  const response = await axios.get(`/api/products/stock/items`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const productWishlist = async ({ token, data }) => {
  const response = await axios.put(`/api/products/stock/item/wishlist`, data, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
