import axios from "axios";

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
