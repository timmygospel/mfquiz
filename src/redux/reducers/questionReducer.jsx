import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionApi from "../../services/questionApi";

// Async actions
export const fetchQuestions = createAsyncThunk("questions/fetchAll", async () => {
  return await questionApi.getQuestions();
});

export const createQuestion = createAsyncThunk("questions/create", async (data) => {
  return await questionApi.createQuestion(data);
});

export const updateQuestion = createAsyncThunk("questions/update", async ({ id, data }) => {
  return await questionApi.updateQuestion(id, data);
});

export const deleteQuestion = createAsyncThunk("questions/delete", async (id) => {
  return await questionApi.deleteQuestion(id);
});

// Slice
const questionSlice = createSlice({
  name: "questions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle create, update, delete similarly...
  },
});

export default questionSlice.reducer;
