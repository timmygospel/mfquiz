import React from "react";
import API from "./api";

// Get all categories
const  getCategories = async () => {
  const response = await API.get("/api/v1/category");
  return response.data;
};

const creatCategory = async (data) => {
  const response = await API.post("/api/v1/category", data);
  return response.data;
};

const updateCategory = async (id, name) => {
  const response = await API.put(`/api/v1/category/${id}`, { name });
  return response.data;
};

const deleteCategory = async (id) => {
  console.log("delete id", id);
  const response = await API.remove(`/api/v1/category/${id}`);
  return response.data;
};

export default {
  getCategories,
  creatCategory,
  updateCategory,
  deleteCategory,
};
