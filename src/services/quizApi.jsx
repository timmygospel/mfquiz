import React from "react";
import API from "./api";

const addQuiz = async (quizRequest) => {
  console.log("--- quizRequest ---", quizRequest);
  let response = await API.post("/api/v1/createquiz", quizRequest);
  return response.data;
};

const updateQuiz = async (id, quizRequest) => {
  try {
    const response = await API.put(`/api/v1/quizzes/${id}`, quizRequest);
    return response.data;
  } catch (error) {
    throw new Error("Error updating quiz: " + error.message);
  }
};

const getAllQuizzes = async () => {
  const response = await API.get("/api/v1/quizzes");
  console.log("all quiz data", response);
  return response.data;
};

const getQuizById = async (id) => {
  console.log("enteringgetQuizById", id);
  const response = await API.get(`/api/v1/quizzes/${id}`);
  return response.data;
};

const Quiz = {
  addQuiz: addQuiz,
  updateQuiz: updateQuiz,
  getAllQuizzes: getAllQuizzes,
  getQuizById: getQuizById,
};

export default Quiz;
