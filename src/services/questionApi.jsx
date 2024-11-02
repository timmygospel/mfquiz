import React from "react";
import API from "./api";

// const getQuestions = async (data) => {
//   const response = await API.get("/api/v1/questions", data);
//   return response;
// };

// Accept categoryId as an optional parameter
const getQuestions = async (categoryId = null) => {
  // Construct the URL with query parameters if categoryId is provided
  const url = categoryId ? `/api/v1/questions?categoryId=${categoryId}` : "/api/v1/questions";
  
  const response = await API.get(url);
  return response.data; // Return only the data portion of the response
};

const createQuestion = async (data) => {
  console.log('createQuestion -data', data);
  const response = await API.post("/api/v1/questions", data);
  return response;
};

const updateQuestion = async (id, data) => {
  const response = await API.post(`/api/v1/questions/${id}`, data);
  return response;
};

const deleteQuestion = async (id) => {
  const response = await API.post(`/api/v1/questions/${id}`, data);
  return response;
};

const getQuestionsByCategory = async (categoryId) => {
  const response = await API.post(`/api/v1/questions/${categoryId}`, data);
  return response.data;
};

export default {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByCategory,
};
