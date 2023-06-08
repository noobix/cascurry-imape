import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegisteration,
  userLogout,
  getWishlist,
  addToCart,
  fetchCart,
  removeFromCart,
  reduceItemQuantityInCart,
  increaseduceItemQuantityInCart,
  fetchUserData,
  makeOrderfromCart,
  fetchCountries,
  fetchCheckout,
  fetchUserOrders,
  updateProfile,
  fetchUser,
  misrememberedPassword,
  resetPassword,
  productWishlist,
  fetchCompareList,
  removeCompareItem,
  addCompareItem,
  fetchCities,
} from "./authService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (value, thunkAPI) => {
    try {
      return await userRegisteration(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (value, thunkAPI) => {
    try {
      return await userLogin(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const userDefaultState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const logoutUser = createAsyncThunk(
  "auth/user_logout",
  async (value, thunkAPI) => {
    try {
      return await userLogout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const userWishlist = createAsyncThunk(
  "auth/user_wishlist",
  async (value, thunkAPI) => {
    try {
      return await getWishlist();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const addWishlist = createAsyncThunk(
  "products/wishlist_products",
  async (value, thunkAPI) => {
    try {
      return await productWishlist(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const addProductToCart = createAsyncThunk(
  "auth/cart_add",
  async (value, thunkAPI) => {
    try {
      return await addToCart(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCart = createAsyncThunk(
  "auth/cart_get",
  async (value, thunkAPI) => {
    try {
      return await fetchCart(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "auth/cart_item_remove",
  async (value, thunkAPI) => {
    try {
      return await removeFromCart(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const decreaseCartItemQuan = createAsyncThunk(
  "auth/cart_item_quantity_reduce",
  async (value, thunkAPI) => {
    try {
      return await reduceItemQuantityInCart(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const increaseCartItemQuan = createAsyncThunk(
  "auth/cart_item_quantity_increase",
  async (value, thunkAPI) => {
    try {
      return await increaseduceItemQuantityInCart(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (value, thunkAPI) => {
    try {
      return await fetchUserData(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCountryList = createAsyncThunk(
  "auth/get_country_list",
  async (value, thunkAPI) => {
    try {
      return await fetchCountries();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const makeCartOrder = createAsyncThunk(
  "auth/order_products",
  async (value, thunkAPI) => {
    try {
      return await makeOrderfromCart(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getUserOrders = createAsyncThunk(
  "auth/user_orders",
  async (value, thunkAPI) => {
    try {
      return await fetchUserOrders(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchOrderCheckout = createAsyncThunk(
  "auth/fetch_checkout",
  async (value, thunkAPI) => {
    try {
      return await fetchCheckout(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/profile_update",
  async (value, thunkAPI) => {
    try {
      return await updateProfile(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/fetch_user",
  async (value, thunkAPI) => {
    try {
      return await fetchUser(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgot_password",
  async (value, thunkAPI) => {
    try {
      return await misrememberedPassword(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/reset_password",
  async (value, thunkAPI) => {
    try {
      return await resetPassword(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCompareProducts = createAsyncThunk(
  "auth/get_compare_list",
  async (value, thunkAPI) => {
    try {
      return await fetchCompareList(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteCompareItem = createAsyncThunk(
  "auth/delete_compare_item",
  async (value, thunkAPI) => {
    try {
      return await removeCompareItem(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const compareItem = createAsyncThunk(
  "auth/add_compare_item",
  async (value, thunkAPI) => {
    try {
      return await addCompareItem(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCitiesList = createAsyncThunk(
  "auth/get_cities_list",
  async (value, thunkAPI) => {
    try {
      return await fetchCities(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userDefaultState,
    countryList: null,
    cityList: null,
    wishlist: [],
    cart: {},
    order: {},
    orders: [],
    compareProducts: [],
    savedAddresses: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        toast.success("User sucessfully registered");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error(
          action.payload || "Unable to register user, please try again"
        );
      })
      .addCase(loginUser.pending, (state) => {
        state.isError = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        toast.success("User sucessfully logged in");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error(action.payload || "Unable to login user, please try again");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isError = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = null;
        toast.success("User sucessfully logged out");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Unable to logout user, please try again");
      })
      .addCase(userWishlist.pending, (state) => {
        state.isError = true;
      })
      .addCase(userWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(userWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isError = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.cart = action.payload;
        toast.success("Item sucessfully added to cart");
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error(state.message || "Unable to add to cart, please try again");
      })
      .addCase(getCart.pending, (state) => {
        state.isError = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(addWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.wishlist = action.payload;
        toast.success("Item sucessfully added to wishlist");
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error(
          state.message || "Unable to add to wishlist, please try again"
        );
      })
      .addCase(decreaseCartItemQuan.pending, (state) => {
        state.isError = true;
      })
      .addCase(decreaseCartItemQuan.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(decreaseCartItemQuan.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(increaseCartItemQuan.pending, (state) => {
        state.isError = true;
      })
      .addCase(increaseCartItemQuan.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(increaseCartItemQuan.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isError = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isError = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.savedAddresses = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getCountryList.pending, (state) => {
        state.isError = true;
      })
      .addCase(getCountryList.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.countryList = action.payload;
      })
      .addCase(getCountryList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(makeCartOrder.pending, (state) => {
        state.isError = true;
      })
      .addCase(makeCartOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(makeCartOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(fetchOrderCheckout.pending, (state) => {
        state.isError = true;
      })
      .addCase(fetchOrderCheckout.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.order = action.payload;
        toast.success("Order Sucessfully placed");
      })
      .addCase(fetchOrderCheckout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Order process failed, please try again");
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isError = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isError = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        toast.success("User details updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("User update failed, please try again");
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isError = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload;
        toast.success("Password reset email sent sucessfully");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error(state.message || action.payload);
      })
      .addCase(changePassword.pending, (state) => {
        state.isError = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Passward successfully changed");
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Unable to save new password");
      })
      .addCase(getCompareProducts.pending, (state) => {
        state.isError = true;
      })
      .addCase(getCompareProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.compareProducts = action.payload;
      })
      .addCase(getCompareProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(deleteCompareItem.pending, (state) => {
        state.isError = true;
      })
      .addCase(deleteCompareItem.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.compareProducts = action.payload;
        toast.success("Item removed from compare products");
      })
      .addCase(deleteCompareItem.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Unable to remove compare item, please try again");
      })
      .addCase(compareItem.pending, (state) => {
        state.isError = true;
      })
      .addCase(compareItem.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.compareProducts = action.payload;
        toast.success("Item added from compare products");
      })
      .addCase(compareItem.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Unable to add compare item, please try again");
      })
      .addCase(getCitiesList.pending, (state) => {
        state.isError = true;
      })
      .addCase(getCitiesList.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.cityList = action.payload;
      })
      .addCase(getCitiesList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
