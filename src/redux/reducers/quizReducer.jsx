import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  quiz: "",
  questions: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuizTitle: (state, action) => {
      state.quiz = action.payload;
      console.log("--- state after setting question text ---", current(state));
    },
    addQuestion: (state) => {
      state.questions.push({
        question: '',
        options: [
            { text: '', correct: false },
            { text: '', correct: false },
        ],
    });
    state.selectedQuestionIndex = state.questions.length - 1;
    },
    updateQuestionText: (state, action) => {
      const { index, text } = action.payload;
      state.questions[index].question = text;
    },
    addOption: (state, action) => {
      const { questionIndex } = action.payload;
      state.questions[questionIndex].options.push({ text: "", correct: false });
    },
    updateOptionText: (state, action) => {
      const { questionIndex, optionIndex, text } = action.payload;
      state.questions[questionIndex].options[optionIndex].text = text;
    },
    removeOption: (state, action) => {
      const { questionIndex, optionIndex } = action.payload;
      state.questions[questionIndex].options = state.questions[
        questionIndex
      ].options.filter((_, i) => i !== optionIndex);
    },
    setCorrectOption: (state, action) => {
      const { questionIndex, optionIndex } = action.payload;
      state.questions[questionIndex].options = state.questions[
        questionIndex
      ].options.map((option, i) => ({
        ...option,
        correct: i === optionIndex,
      }));
    },

    selectQuestion: (state, action) => {
        state.selectedQuestionIndex = action.payload;
    },
    loadQuizForEdit: (state, action) => {
        
      const { title, questions, quizId } = action.payload;
      console.log('loadQuizForEdit title', title);
      console.log('loadQuizForEdit questions', questions);
      console.log('loadQuizForEdit quizId', quizId);
      state.title = title;
      state.questions = questions;
      state.editingQuizId = quizId;
      state.selectedQuestionIndex = 0; // Start editing from the first question
  },
  },
});

export const {
  addQuizTitle,
  addQuestion,
  updateQuestionText,
  addOption,
  updateOptionText,
  removeOption,
  setCorrectOption,
  selectQuestion,
  loadQuizForEdit,
} = quizSlice.actions;

export default quizSlice.reducer;
