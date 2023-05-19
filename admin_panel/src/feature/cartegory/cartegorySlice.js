import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  addCartegory,
  configurePagination,
  fetchCartegory,
  fetchCategoryPaginated,
  listCartegory,
  removeCartegory,
  updateCartegory,
} from "./cartegoryService";
import { toast } from "react-toastify";

export const getCartegory = createAsyncThunk(
  "products/getCartegory",
  async (value, thunkAPI) => {
    try {
      return await listCartegory(value);
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
export const createCartegory = createAsyncThunk(
  "products/createCartegory",
  async (value, thunkAPI) => {
    try {
      return await addCartegory(value);
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
export const clearState = createAction("reset_data");
export const findCartegory = createAsyncThunk(
  "products/getCartegory",
  async (value, thunkAPI) => {
    try {
      return await fetchCartegory(value);
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
export const reviseCartegory = createAsyncThunk(
  "products/updateCartegory",
  async (value, thunkAPI) => {
    try {
      return await updateCartegory(value);
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
export const deleteCartegory = createAsyncThunk(
  "products/deleteCartegory",
  async (value, thunkAPI) => {
    try {
      return await removeCartegory(value);
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
export const cartegoryPagination = createAsyncThunk(
  "products/category_pagination",
  async (value, thunkAPI) => {
    try {
      return await configurePagination(value);
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
export const getCategoryPaginated = createAsyncThunk(
  "products/categories_paginated",
  async (value, thunkAPI) => {
    try {
      return await fetchCategoryPaginated(value);
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
export const cartegorySlice = createSlice({
  name: "cartegory",
  initialState: {
    cartegories: [],
    cartegory: {},
    pagination: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartegory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartegory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartegories = action.payload;
      })
      .addCase(getCartegory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createCartegory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCartegory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartegory = action.payload;
        toast.success("Category created successfully");
      })
      .addCase(createCartegory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to creat category, please try again");
      })
      .addCase(reviseCartegory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviseCartegory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartegory = action.payload;
        toast.success("Category updated successfully");
      })
      .addCase(reviseCartegory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to update category");
      })
      .addCase(cartegoryPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartegoryPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pagination = action.payload;
      })
      .addCase(cartegoryPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getCategoryPaginated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryPaginated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartegories = action.payload;
      })
      .addCase(getCategoryPaginated.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(clearState, (state) => {
        state.brands = [];
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default cartegorySlice.reducer;
