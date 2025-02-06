import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizApi from "../../services/quizApi";

export const updateQuiz = createAsyncThunk("quiz/update", async ({ quizId, updatedData }) => {
  console.log('thunk updateQuiz --- ', updatedData);  // Log the data being sent

  try {
    const response = await quizApi.updateQuiz(quizId, updatedData);

    // Log the full response to inspect the data
    console.log("Received updateQuiz response:", response);

    // // Check if response contains the data and handle accordingly
    // if (!response || !response.data) {
    //   throw new Error("No data returned from the server.");
    // }

    // Return the data from the response
    return response;
  } catch (error) {
    console.error("Error during updateQuiz API call:", error.message);
    throw new Error("Failed to update quiz: " + error.message);
  }
});


export const createQuiz = createAsyncThunk("quiz/create", async (quizData) => {
  const response = await quizApi.addQuiz(quizData);
  return response.data;
});

// Thunk for fetching quiz by ID
export const fetchQuizById = createAsyncThunk("quiz/fetchById", async (quizId) => {
  console.log('--- thunk id  ---',quizId)
  const response = await quizApi.getQuizById(quizId);
  console.log('--- fetchQuizById ---',response)
  return response;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    title: "",
    questions: [],
    selectedQuestionIndex: null, // Null indicates no question is selected initially
  },
  reducers: {
    addQuizTitle: (state, action) => {
      state.title = action.payload;
    },
    addQuestion: (state) => {
      state.questions.push({
        question: "",
        options: [
          { text: "", correct: false },
          { text: "", correct: false },
        ],
      });
      state.selectedQuestionIndex = state.questions.length - 1;
    },
    updateQuestionText: (state, action) => {
      const { index, text } = action.payload;
      console.log('action.payload index',index);
      // if (state.questions[index]) {
         state.questions[index].question = text;
      // }
    },
    selectQuestion: (state, action) => {
      state.selectedQuestionIndex = action.payload;
    },
    addOption: (state, action) => {
      const { questionIndex } = action.payload;
      state.questions[questionIndex].options.push({ text: "", correct: false });
    },
    updateOptionText: (state, action) => {
      console.log("action payload --", action.payload);
      const { questionIndex, optionIndex, text } = action.payload;
      state.questions[questionIndex].options[optionIndex].text = text;
    },
    removeOption: (state, action) => {
      const { questionIndex, optionIndex } = action.payload;
      state.questions[questionIndex].options.splice(optionIndex, 1);
    },
    setCorrectOption: (state, action) => {

      const { questionIndex, optionIndex } = action.payload;
      state.questions[questionIndex].options.forEach((option, i) => {
        console.log('--- i ---', i);
        console.log('--- option --', optionIndex);
        option.correct = i === optionIndex;
      });
    },
    deleteQuestion: (state, action) => {
      const { index } = action.payload;
      state.questions.splice(index, 1);
    },
    loadQuizForEdit: (state, action) => {
      const { title, questions, quizId } = action.payload;
      state.title = title;
      state.questions = questions;
      state.editingQuizId = quizId;
      state.selectedQuestionIndex = questions.length > 0 ? 0 : null;
    },
    addExistingQuestion: (state, action) => {
      const question = action.payload;
      state.questions.push(question);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.title = action.payload.title;
        state.questions = action.payload.questions;
      })
      .addCase(fetchQuizById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createQuiz.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        console.log("updateQuiz.fulfilled payload:", action.payload);
        const { title, questions } = action.payload;
        state.title = title;
        state.questions = questions;
      })
      .addCase(updateQuiz.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addQuizTitle,
  addQuestion,
  selectQuestion,
  updateQuestionText,
  addOption,
  updateOptionText,
  removeOption,
  setCorrectOption,
  deleteQuestion,
  loadQuizForEdit,
  addExistingQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
