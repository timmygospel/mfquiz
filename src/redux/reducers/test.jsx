// src/redux/reducers/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../../services/categoryApi";

// Async actions
export const fetchCategories = createAsyncThunk("categories/fetchAll", async () => {
  return await categoryApi.getCategories();
});

export const createCategory = createAsyncThunk("categories/create", async (name) => {
  return await categoryApi.createCategory(name);
});

export const updateCategory = createAsyncThunk("categories/update", async ({ id, name }) => {
  return await categoryApi.updateCategory(id, name);
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
  return await categoryApi.deleteCategory(id);
});

// Slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Create a category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add new category to items
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create category';
      })
      
      // Update a category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Replace the updated category
        }
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update category';
      })

      // Delete a category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category._id !== action.meta.arg);
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete category';
      });
  },
});

export default categorySlice.reducer;
