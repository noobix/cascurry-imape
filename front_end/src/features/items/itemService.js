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
export const fetchProduct = async ({ token, id }) => {
  const response = await axios.get(`/api/products/stock/item/${id}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const queryProduct = async ({ token, search }) => {
  const response = await axios.get(
    `/api/products/stock/items/search?query=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const queryProductColor = async ({ token, search }) => {
  const response = await axios.get(
    `/api/products/stock/items?color=${encodeURIComponent(search)}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchCartegories = async (token) => {
  const response = await axios.get(`/api/products/category/list_categories`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const fetchItemsByCartegories = async ({ token, str }) => {
  const response = await axios.get(
    `/api/products/stock/items?category=${str}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const configurePagination = async ({ token, page }) => {
  const response = await axios.get(
    `/api/products/stock/items/pagination?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchProductPaginated = async ({ token, page, limit, skip }) => {
  const response = await axios.get(
    `/api/products/stock/items?page=${page}&limit=${limit}&skip=${skip}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchProductReviews = async ({ token, product }) => {
  const response = await axios.get(
    `/api/products/stock/item/get_reviews/${product}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const sendReview = async ({ token, data }) => {
  const response = await axios.put(`/api/products/stock/item/rating`, data, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
