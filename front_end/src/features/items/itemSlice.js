import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  configurePagination,
  fetchCartegories,
  fetchItemsByCartegories,
  fetchProduct,
  fetchProductPaginated,
  fetchProductReviews,
  fetchProducts,
  queryProduct,
  queryProductColor,
  sendReview,
} from "./itemService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "products/get_products",
  async (value, thunkAPI) => {
    try {
      return await fetchProducts(value);
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
export const getProduct = createAsyncThunk(
  "products/get_product",
  async (value, thunkAPI) => {
    try {
      return await fetchProduct(value);
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
export const searchProductByColor = createAsyncThunk(
  "products/search_products_color",
  async (value, thunkAPI) => {
    try {
      return await queryProductColor(value);
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
export const getCartegories = createAsyncThunk(
  "products/get_cartegories",
  async (value, thunkAPI) => {
    try {
      return await fetchCartegories(value);
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
export const fetchItemsCartegory = createAsyncThunk(
  "products/get_item_cartegories",
  async (value, thunkAPI) => {
    try {
      return await fetchItemsByCartegories(value);
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
export const getproductReviews = createAsyncThunk(
  "products/item_reviews",
  async (value, thunkAPI) => {
    try {
      return await fetchProductReviews(value);
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
export const postReview = createAsyncThunk(
  "products/send_reviews",
  async (value, thunkAPI) => {
    try {
      return await sendReview(value);
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
export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    categories: [],
    pagination: {},
    reviews: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
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
        state.product = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(searchProductByColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProductByColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(searchProductByColor.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getCartegories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartegories.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCartegories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(fetchItemsCartegory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItemsCartegory.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchItemsCartegory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
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
        state.product = action.payload;
      })
      .addCase(getproductsPaginated.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getproductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproductReviews.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getproductReviews.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(postReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.reviews = action.payload;
        toast.success("Review posted successfully");
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Unable to post review, please try again");
      });
  },
});

export default productSlice.reducer;
