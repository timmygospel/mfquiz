import React, { useEffect, useState } from "react";
import categoryApi from "../services/categoryApi";
import questionApi from "../services/questionApi";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectectCategory] = useState("");

  useEffect(() => {
    getQuestions();
    getAllCategories();
  }, [selectedCategory]);

  const getQuestions = async () => {
    const fetchedQuestions = await questionApi.getQuestions(selectedCategory);
    console.log('fetchedQuestions',fetchedQuestions);
    setQuestions(fetchedQuestions);
  };

  const getAllCategories = async () => {
    const fetchedCategories = await categoryApi.getCategories();
    setCategories(fetchedCategories);
  };

  const handleCategoryChange = (e) => {
    setSelectectCategory(e.target.value);
  };

  return (
    <div>
      <h2>Questions</h2>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h3>{question.question}</h3>
            <p>Category: {question.category.name || "No Category"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;
