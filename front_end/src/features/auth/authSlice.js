import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegisteration,
  userLogout,
  getWishlist,
} from "./authService";

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
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userDefaultState,
    wishlist: [],
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isError = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isError = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
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
      });
  },
});

export default authSlice.reducer;
