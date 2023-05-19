import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  addBrands,
  configurePagination,
  fetchBrandPaginated,
  getBrand,
  listBrands,
  removeBrand,
  updateBrands,
} from "./brandService";
import { toast } from "react-toastify";

export const getBrands = createAsyncThunk(
  "products/getBrands",
  async (value, thunkAPI) => {
    try {
      return await listBrands(value);
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
export const createBrands = createAsyncThunk(
  "products/createBrands",
  async (value, thunkAPI) => {
    try {
      return await addBrands(value);
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
export const fetchBrand = createAsyncThunk(
  "products/fetchBrand",
  async (value, thunkAPI) => {
    try {
      return await getBrand(value);
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
export const reviseBrand = createAsyncThunk(
  "products/updateBrand",
  async (value, thunkAPI) => {
    try {
      return await updateBrands(value);
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
export const deleteBrand = createAsyncThunk(
  "products/deleteBrand",
  async (value, thunkAPI) => {
    try {
      return await removeBrand(value);
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
export const brandPagination = createAsyncThunk(
  "products/brand_pagination",
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
export const getBrandsPaginated = createAsyncThunk(
  "products/brands_paginated",
  async (value, thunkAPI) => {
    try {
      return await fetchBrandPaginated(value);
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
export const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    brand: {},
    pagination: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brand = action.payload;
        toast.success("Brand created successfully");
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to create brand, please try again");
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brand = action.payload;
        toast.success("Brand successfully removed");
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to remove brand, please try again");
      })
      .addCase(fetchBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brand = action.payload;
      })
      .addCase(fetchBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(reviseBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviseBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brand = action.payload;
        toast.success("Brand updated successfully");
      })
      .addCase(reviseBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Unable to update brand, please try again");
      })
      .addCase(brandPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(brandPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pagination = action.payload;
      })
      .addCase(brandPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBrandsPaginated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandsPaginated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrandsPaginated.rejected, (state, action) => {
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

export default brandSlice.reducer;
