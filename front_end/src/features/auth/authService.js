import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";
export const userRegisteration = async (regdata) => {
  const response = await axios.post(`/api/users/register`, regdata, {
    headers: { "Content-Type": "application/json" },
  });
  response.data && localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
export const userLogin = async (userinfo) => {
  const response = await axios.post(`/api/users/login`, userinfo, {
    headers: { "Content-Type": "application/json" },
  });
  response.data && localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
export const userLogout = async () => {
  const response = await axios.get(`/api/users/person/logout`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const getWishlist = async () => {
  const response = await axios.get(`/api/users/person/wishlist`, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data.wishlist;
};
export const addToCart = async ({ token, data }) => {
  const response = await axios.post(
    `/api/users/person/shopping_cart`,
    { cart: [data] },
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data.cart;
};
export const fetchCart = async (token) => {
  const response = await axios.get(`/api/users/person/fetch_cart`, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const removeFromCart = async ({ token, id }) => {
  const response = await axios.delete(
    `/api/users/person/remove_from_cart/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
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
export const reduceItemQuantityInCart = async ({ token, data }) => {
  const response = await axios.post(
    `/api/users/person/shopping_cart/decrease_quantity`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const increaseduceItemQuantityInCart = async ({ token, data }) => {
  const response = await axios.post(
    `/api/users/person/shopping_cart/increase_quantity`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchUserData = async (token) => {
  const response = await axios.get(`/api/users/person/saved_addresses`, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const makeOrderfromCart = async ({ token, data }) => {
  const response = await axios.post(
    `/api/users/person/shopping_new_order`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchCountries = async () => {
  const config = {
    method: "get",
    url: "https://api.countrystatecity.in/v1/countries",
    headers: {
      "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRIESAPI_KEY,
    },
  };
  const response = await axios(config);
  return response.data;
};
export const fetchCities = async (iso2) => {
  const config = {
    method: "get",
    url: "https://api.countrystatecity.in/v1/countries/" + iso2 + "/cities",
    headers: {
      "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRIESAPI_KEY,
    },
  };
  const response = await axios(config);
  return response.data;
};
export const fetchCheckout = async ({ token, id }) => {
  const response = await axios.get(
    `/api/users/person/get_user_order/cheackedout/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchUserOrders = async (token) => {
  const response = await axios.get(`/api/users/person/fetch_order`, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const fetchUser = async (token) => {
  const response = await axios.get(`/api/users/person/`, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const updateProfile = async ({ token, data }) => {
  const response = await axios.put(`/api/users/person/`, data, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const misrememberedPassword = async ({ token, data }) => {
  const response = await axios.post(
    `/api/users/person/forgot_password_token`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const resetPassword = async ({ data, token }) => {
  const response = await axios.put(
    `/api/users/person/reset_password/${token}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchCompareList = async (token) => {
  const response = await axios.get(`/api/users/person/compare_products/list`, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data.compareList;
};
export const removeCompareItem = async ({ token, id }) => {
  const response = await axios.delete(
    `/api/users/person/compare_products/remove/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data.compareList;
};
export const addCompareItem = async ({ token, id }) => {
  const response = await axios.post(
    `/api/users/person/compare_products/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data.compareList;
};
