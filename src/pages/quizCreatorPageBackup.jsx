import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuizTitle,
  addQuestion,
  updateQuestionText,
  addOption,
  updateOptionText,
  removeOption,
  setCorrectOption,
  loadQuizForEdit,
} from "../redux/reducers/quizReducer";
import { text } from "express";

const QuizCreatorPage = () => {
  const dispatch = useDispatch();
  const [currentQuestionindex, setCurentQuestionIndex] = useState(
    questions.length - 1
  );
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddQuizTitle = (e) => {
    dispatch(addQuizTitle(e.target.value));
  };

  const handleAddQuestion = (e) => {
    dispatch();
  };
  const handleQuestionChange = (index, value) => {
    dispatch(updateQuestionText({ index, text: value }));
  };
  // add a blank option
  const handleAddOption = (index) => {
    dispatch(addOption({ questionIndex: index }));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    dispatch(
      updateOptionText({
        questionIndex: qIndex,
        optionIndex: oIndex,
        text: value,
      })
    );
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    dispatch(removeOption({ questionIndex: qIndex, optionIndex: oIndex }));
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    dispatch(setCorrectOption({ questionIndex: qIndex, optionIndex: oIndex }));
  };

  const handleSaveQuiz = async () => {
    setSaving(true);
    const data = {
      title: title,
      questions: questions,
    };

    try {
      const response = await quizService.addQuiz(data);
      alert("Quiz saved successfully!");
      console.log("Saved quiz:", response.data);
    } catch (error) {
      alert("Error saving quiz: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return <div></div>;
};

export default QuizCreatorPage;
