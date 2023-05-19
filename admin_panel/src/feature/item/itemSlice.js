import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  listProducts,
  addProduct,
  findProduct,
  updateProduct,
  removeProduct,
  fetchProductPaginated,
  configurePagination,
  queryProduct,
} from "./itemService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (value, thunkAPI) => {
    try {
      return await listProducts(value);
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
export const createProduct = createAsyncThunk(
  "products/addProducts",
  async (value, thunkAPI) => {
    try {
      return await addProduct(value);
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
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (value, thunkAPI) => {
    try {
      return await findProduct(value);
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
export const reviseProduct = createAsyncThunk(
  "products/updateProduct",
  async (value, thunkAPI) => {
    try {
      return await updateProduct(value);
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
export const deleteProduct = createAsyncThunk(
  "products/removeProduct",
  async (value, thunkAPI) => {
    try {
      return await removeProduct(value);
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
export const productPagination = createAsyncThunk(
  "products/item_pagination",
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
export const getproductsPaginated = createAsyncThunk(
  "products/item_paginated",
  async (value, thunkAPI) => {
    try {
      return await fetchProductPaginated(value);
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
export const searchProduct = createAsyncThunk(
  "products/search_products",
  async (value, thunkAPI) => {
    try {
      return await queryProduct(value);
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
export const itemSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pagination: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product add successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to create product, please try again");
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(reviseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviseProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        toast.success("Product updated successfully");
      })
      .addCase(reviseProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to update product");
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to delete product, please try again");
      })
      .addCase(clearState, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.products = [];
      })
      .addCase(productPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productPagination.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.pagination = action.payload;
      })
      .addCase(productPagination.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getproductsPaginated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproductsPaginated.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getproductsPaginated.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default itemSlice.reducer;
